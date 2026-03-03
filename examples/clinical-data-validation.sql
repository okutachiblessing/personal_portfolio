-- Clinical Data Intelligence Platform - SQL Validation Queries
-- Electronic Medical Records (EMR) Data Quality & Integrity Checks
-- Author: Blessing Okutachi
-- Created: 2025

-- ==============================================================================
-- 1. DATA COMPLETENESS CHECKS
-- ==============================================================================

-- Check completeness of critical fields
SELECT 
    'Patient Demographics' as check_name,
    COUNT(*) as total_records,
    COUNT(patient_id) as records_with_patient_id,
    COUNT(patient_name) as records_with_name,
    COUNT(date_of_birth) as records_with_dob,
    ROUND(COUNT(patient_id)::NUMERIC / COUNT(*) * 100, 2) as patient_id_completeness,
    ROUND(COUNT(patient_name)::NUMERIC / COUNT(*) * 100, 2) as name_completeness,
    ROUND(COUNT(date_of_birth)::NUMERIC / COUNT(*) * 100, 2) as dob_completeness
FROM patients
WHERE deleted_at IS NULL;

-- ==============================================================================
-- 2. DUPLICATE DETECTION
-- ==============================================================================

-- Find duplicate patient records
SELECT 
    patient_id,
    patient_name,
    date_of_birth,
    COUNT(*) as duplicate_count
FROM patients
WHERE deleted_at IS NULL
GROUP BY patient_id, patient_name, date_of_birth
HAVING COUNT(*) > 1
ORDER BY duplicate_count DESC;

-- Find duplicate medical visits
SELECT 
    patient_id,
    visit_date,
    diagnosis_code,
    COUNT(*) as duplicate_visits
FROM medical_visits
WHERE deleted_at IS NULL
GROUP BY patient_id, visit_date, diagnosis_code
HAVING COUNT(*) > 1
ORDER BY duplicate_visits DESC;

-- ==============================================================================
-- 3. REFERENTIAL INTEGRITY CHECKS
-- ==============================================================================

-- Check for orphaned medical visit records (visits without valid patient)
SELECT 
    mv.visit_id,
    mv.patient_id,
    FROM medical_visits mv
LEFT JOIN patients p ON mv.patient_id = p.patient_id
WHERE p.patient_id IS NULL
    AND mv.deleted_at IS NULL;

-- Check diagnosis codes against valid ICD-10 table
SELECT 
    mv.visit_id,
    mv.patient_id,
    mv.diagnosis_code,
    'INVALID ICD-10' as error_type
FROM medical_visits mv
LEFT JOIN icd10_codes ic ON mv.diagnosis_code = ic.code
WHERE ic.code IS NULL
    AND mv.diagnosis_code IS NOT NULL
    AND mv.deleted_at IS NULL;

-- ==============================================================================
-- 4. DATA VALIDATION - CLINICAL MEASUREMENTS
-- ==============================================================================

-- Flag invalid vital signs records
SELECT 
    visit_id,
    patient_id,
    visit_date,
    CASE 
        WHEN systolic_bp < 70 OR systolic_bp > 220 THEN 'Invalid Systolic BP'
        WHEN diastolic_bp < 40 OR diastolic_bp > 140 THEN 'Invalid Diastolic BP'
        WHEN heart_rate < 30 OR heart_rate > 200 THEN 'Invalid Heart Rate'
        WHEN temperature < 95.0 OR temperature > 106.0 THEN 'Invalid Temperature'
        WHEN glucose < 40 OR glucose > 500 THEN 'Invalid Glucose'
    END as validation_error,
    systolic_bp,
    diastolic_bp,
    heart_rate,
    temperature,
    glucose
FROM clinical_measurements
WHERE deleted_at IS NULL
    AND (
        systolic_bp < 70 OR systolic_bp > 220
        OR diastolic_bp < 40 OR diastolic_bp > 140
        OR heart_rate < 30 OR heart_rate > 200
        OR temperature < 95.0 OR temperature > 106.0
        OR glucose < 40 OR glucose > 500
    )
ORDER BY visit_date DESC;

-- ==============================================================================
-- 5. DATE VALIDATION
-- ==============================================================================

-- Check for impossible dates (future dates, illogical date ranges)
SELECT 
    patient_id,
    visit_date,
    CURRENT_DATE as today,
    AGE(CURRENT_DATE, visit_date) as days_ago,
    'Future Date' as error_type
FROM medical_visits
WHERE visit_date > CURRENT_DATE
    AND deleted_at IS NULL
UNION ALL
SELECT 
    p.patient_id,
    mv.visit_date,
    p.date_of_birth,
    NULL,
    'Visit Before Birth' as error_type
FROM medical_visits mv
JOIN patients p ON mv.patient_id = p.patient_id
WHERE mv.visit_date < p.date_of_birth
    AND mv.deleted_at IS NULL
    AND p.deleted_at IS NULL;

-- ==============================================================================
-- 6. OUTLIER DETECTION
-- ==============================================================================

-- Identify statistical outliers in vital signs (3+ standard deviations)
SELECT 
    visit_id,
    patient_id,
    visit_date,
    systolic_bp,
    diastolic_bp,
    (SELECT AVG(systolic_bp)::NUMERIC FROM clinical_measurements WHERE deleted_at IS NULL) as avg_systolic,
    ROUND(
        (ABS(systolic_bp - (SELECT AVG(systolic_bp) FROM clinical_measurements WHERE deleted_at IS NULL))::NUMERIC) /
        NULLIF((SELECT STDDEV_POP(systolic_bp) FROM clinical_measurements WHERE deleted_at IS NULL)::NUMERIC, 0), 
        2
    ) as systolic_std_devs,
    'OUTLIER' as flag
FROM clinical_measurements
WHERE deleted_at IS NULL
    AND (
        ABS(systolic_bp - (SELECT AVG(systolic_bp) FROM clinical_measurements WHERE deleted_at IS NULL)) > 
        3 * COALESCE((SELECT STDDEV_POP(systolic_bp) FROM clinical_measurements WHERE deleted_at IS NULL), 1)
    )
ORDER BY systolic_std_devs DESC
LIMIT 100;

-- ==============================================================================
-- 7. DATA CONSISTENCY CHECKS
-- ==============================================================================

-- Check for patient age inconsistencies
SELECT 
    p.patient_id,
    p.patient_name,
    p.date_of_birth,
    mv.visit_date,
    EXTRACT(YEAR FROM AGE(mv.visit_date::TIMESTAMP, p.date_of_birth)) as age_at_visit,
    c.age_reported,
    CASE 
        WHEN EXTRACT(YEAR FROM AGE(mv.visit_date::TIMESTAMP, p.date_of_birth)) != c.age_reported 
        THEN 'AGE MISMATCH'
        ELSE 'OK'
    END as consistency_flag
FROM patients p
JOIN medical_visits mv ON p.patient_id = mv.patient_id
JOIN clinical_measurements c ON mv.visit_id = c.visit_id
WHERE p.deleted_at IS NULL
    AND mv.deleted_at IS NULL
    AND c.deleted_at IS NULL
    AND abs(EXTRACT(YEAR FROM AGE(mv.visit_date::TIMESTAMP, p.date_of_birth)) - c.age_reported) > 2;

-- ==============================================================================
-- 8. DATA QUALITY SUMMARY REPORT
-- ==============================================================================

SELECT 
    'PATIENTS' as table_name,
    COUNT(*) as total_records,
    COUNT(DISTINCT patient_id) as unique_records,
    COUNT(patient_id) FILTER (WHERE patient_id IS NULL) as null_patient_ids,
    COUNT(patient_name) FILTER (WHERE patient_name IS NULL OR patient_name = '') as null_names,
    ROUND(COUNT(patient_id)::NUMERIC / COUNT(*) * 100, 2) as data_completeness_pct,
    COUNT(*) - COUNT(DISTINCT patient_id) as duplicate_count
FROM patients
WHERE deleted_at IS NULL

UNION ALL

SELECT 
    'MEDICAL_VISITS' as table_name,
    COUNT(*) as total_records,
    COUNT(DISTINCT visit_id) as unique_records,
    COUNT(patient_id) FILTER (WHERE patient_id IS NULL) as null_patient_ids,
    COUNT(visit_date) FILTER (WHERE visit_date IS NULL) as null_visit_dates,
    ROUND(COUNT(DISTINCT patient_id)::NUMERIC / COUNT(*) * 100, 2) as data_completeness_pct,
    COUNT(*) - COUNT(DISTINCT visit_id) as duplicate_count
FROM medical_visits
WHERE deleted_at IS NULL

UNION ALL

SELECT 
    'CLINICAL_MEASUREMENTS' as table_name,
    COUNT(*) as total_records,
    COUNT(DISTINCT visit_id) as unique_records,
    COUNT(systolic_bp) FILTER (WHERE systolic_bp IS NULL) as null_systolic_bp,
    COUNT(glucose) FILTER (WHERE glucose IS NULL) as null_glucose,
    ROUND(COUNT(systolic_bp)::NUMERIC / COUNT(*) * 100, 2) as data_completeness_pct,
    0 as duplicate_count
FROM clinical_measurements
WHERE deleted_at IS NULL;

-- ==============================================================================
-- 9. DATA QUALITY SCORECARD
-- ==============================================================================

WITH data_quality AS (
    SELECT 
        'Completeness' as metric,
        ROUND(
            (
                COUNT(CASE WHEN patient_id IS NOT NULL THEN 1 END)::NUMERIC / COUNT(*) +
                COUNT(CASE WHEN patient_name IS NOT NULL THEN 1 END)::NUMERIC / COUNT(*) +
                COUNT(CASE WHEN date_of_birth IS NOT NULL THEN 1 END)::NUMERIC / COUNT(*)
            ) / 3 * 100, 
            2
        ) as score
    FROM patients
    WHERE deleted_at IS NULL
    
    UNION ALL
    
    SELECT 
        'Uniqueness' as metric,
        ROUND(
            (COUNT(DISTINCT patient_id)::NUMERIC / COUNT(*)) * 100, 
            2
        ) as score
    FROM patients
    WHERE deleted_at IS NULL
    
    UNION ALL
    
    SELECT 
        'Validity' as metric,
        ROUND(
            (
                COUNT(CASE WHEN systolic_bp BETWEEN 70 AND 220 THEN 1 END)::NUMERIC / 
                COUNT(CASE WHEN systolic_bp IS NOT NULL THEN 1 END)
            ) * 100, 
            2
        ) as score
    FROM clinical_measurements
    WHERE deleted_at IS NULL AND systolic_bp IS NOT NULL
)
SELECT 
    metric,
    score,
    CASE 
        WHEN score >= 95 THEN 'EXCELLENT'
        WHEN score >= 90 THEN 'GOOD'
        WHEN score >= 80 THEN 'FAIR'
        ELSE 'POOR'
    END as quality_rating
FROM data_quality
ORDER BY score DESC;

-- ==============================================================================
-- 10. HISTORICAL QUALITY TRACKING
-- ==============================================================================

-- Log data quality metrics over time
CREATE TABLE IF NOT EXISTS data_quality_audit (
    audit_id SERIAL PRIMARY KEY,
    audit_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_records INT,
    valid_records INT,
    duplicate_records INT,
    null_records INT,
    data_accuracy_pct NUMERIC(5,2),
    validation_errors_count INT
);

-- Insert current quality snapshot
INSERT INTO data_quality_audit (total_records, valid_records, duplicate_records, null_records, data_accuracy_pct)
SELECT 
    COUNT(*) as total_records,
    SUM(CASE WHEN patient_id IS NOT NULL AND patient_name IS NOT NULL THEN 1 ELSE 0 END) as valid_records,
    COUNT(*) - COUNT(DISTINCT patient_id) as duplicate_records,
    COUNT(CASE WHEN patient_id IS NULL OR patient_name IS NULL THEN 1 END) as null_records,
    ROUND(
        (SUM(CASE WHEN patient_id IS NOT NULL AND patient_name IS NOT NULL THEN 1 ELSE 0 END)::NUMERIC / COUNT(*)) * 100,
        2
    ) as data_accuracy_pct
FROM patients
WHERE deleted_at IS NULL;
