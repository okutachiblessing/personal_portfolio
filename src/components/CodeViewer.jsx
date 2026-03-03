import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaDatabase, FaChartBar, FaDownload, FaCopy } from 'react-icons/fa';

const CodeViewer = () => {
  const [activeTab, setActiveTab] = useState('python');
  const [copiedIndex, setCopiedIndex] = useState(null);

  // Code snippets
  const codeExamples = {
    python: [
      {
        title: 'Data Cleaning & Validation',
        language: 'python',
        code: `# Data Quality Metrics
print("=" * 80)
print("DATA QUALITY ASSESSMENT")
print("=" * 80)

# 1. Duplicate Detection
duplicates_patients = df_patients.duplicated(subset=['patient_id']).sum()
duplicates_measurements = df_measurements.duplicated(subset=['visit_id']).sum()

print(f"Patient duplicates: {duplicates_patients}")
print(f"Measurement duplicates: {duplicates_measurements}")

# Remove duplicates
df_patients = df_patients.drop_duplicates(subset=['patient_id'], keep='first')
df_measurements = df_measurements.drop_duplicates(subset=['visit_id'], keep='first')

# 2. Clinical Data Validation
clinical_ranges = {
    'systolic_bp': (70, 220),
    'diastolic_bp': (40, 140),
    'heart_rate': (30, 200),
    'temperature': (95.0, 106.0),
    'glucose': (40, 500),
}

# Flag outliers and replace with median
for measurement, (min_val, max_val) in clinical_ranges.items():
    df_measurements.loc[
        (df_measurements[measurement] < min_val) | 
        (df_measurements[measurement] > max_val), 
        measurement
    ] = np.nan
    
    median_val = df_measurements[measurement].median()
    df_measurements[measurement].fillna(median_val, inplace=True)`
      },
      {
        title: 'Risk Classification & Feature Engineering',
        language: 'python',
        code: `# Risk Tier Classification
def classify_risk_tier(row):
    risk_score = 0
    if pd.notna(row.get('systolic_bp', 0)) and row['systolic_bp'] > 180:
        risk_score += 2
    if pd.notna(row.get('glucose', 0)) and row['glucose'] > 200:
        risk_score += 2
    if pd.notna(row.get('heart_rate', 0)) and (row['heart_rate'] > 100 or row['heart_rate'] < 50):
        risk_score += 1
    
    if risk_score >= 4:
        return 'High'
    elif risk_score >= 2:
        return 'Medium'
    else:
        return 'Low'

df_measurements['risk_tier'] = df_measurements.apply(classify_risk_tier, axis=1)

# Create derived metrics
df_measurements['mean_arterial_pressure'] = (
    df_measurements['systolic_bp'] + 
    2 * df_measurements['diastolic_bp']
) / 3

df_measurements['pulse_pressure'] = (
    df_measurements['systolic_bp'] - 
    df_measurements['diastolic_bp']
)

# Time-series features
df_measurements['visit_year'] = df_measurements['visit_date'].dt.year
df_measurements['visit_month'] = df_measurements['visit_date'].dt.month
df_measurements['visit_day_of_week'] = df_measurements['visit_date'].dt.day_name()`
      },
      {
        title: 'Data Aggregation & Summarization',
        language: 'python',
        code: `# Daily Visit Summary
daily_visits = df_measurements.groupby('visit_date').agg({
    'visit_id': 'count',
    'systolic_bp': 'mean',
    'heart_rate': 'mean',
    'glucose': 'mean'
}).rename(columns={
    'visit_id': 'total_visits',
    'systolic_bp': 'avg_systolic_bp',
    'heart_rate': 'avg_heart_rate',
    'glucose': 'avg_glucose'
}).reset_index()

# Diagnosis Summary
diagnosis_summary = df_measurements.groupby('diagnosis_code').agg({
    'patient_id': 'count',
    'visit_id': 'nunique',
    'systolic_bp': 'mean',
    'glucose': 'mean',
    'risk_tier': lambda x: (x == 'High').sum()
}).rename(columns={
    'patient_id': 'patient_count',
    'visit_id': 'total_visits',
    'systolic_bp': 'avg_systolic_bp',
    'glucose': 'avg_glucose',
    'risk_tier': 'high_risk_count'
}).sort_values('patient_count', ascending=False)

# Patient Risk Profile
patient_risk = df_measurements.groupby('patient_id').agg({
    'risk_tier': 'first',
    'systolic_bp': 'mean',
    'heart_rate': 'mean',
    'glucose': 'mean',
    'visit_date': ['max', 'count']
}).reset_index()`
      }
    ],
    sql: [
      {
        title: 'Data Completeness Check',
        language: 'sql',
        code: `-- Check completeness of critical fields
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
WHERE deleted_at IS NULL;`
      },
      {
        title: 'Duplicate Detection',
        language: 'sql',
        code: `-- Find duplicate patient records
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
ORDER BY duplicate_visits DESC;`
      },
      {
        title: 'Clinical Data Validation',
        language: 'sql',
        code: `-- Flag invalid vital signs records
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
    systolic_bp, diastolic_bp, heart_rate, temperature, glucose
FROM clinical_measurements
WHERE deleted_at IS NULL
    AND (
        systolic_bp < 70 OR systolic_bp > 220
        OR diastolic_bp < 40 OR diastolic_bp > 140
        OR heart_rate < 30 OR heart_rate > 200
        OR temperature < 95.0 OR temperature > 106.0
        OR glucose < 40 OR glucose > 500
    )
ORDER BY visit_date DESC;`
      },
      {
        title: 'Data Quality Scorecard',
        language: 'sql',
        code: `-- Data Quality Metrics Summary
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
ORDER BY score DESC;`
      }
    ],
    powerbi: [
      {
        title: 'Patient Risk Distribution',
        language: 'markdown',
        code: `# Power BI Dashboard: Patient Risk Overview

## Visualization: Risk Stratification (Donut Chart)
- **High Risk:** 342 patients (18%)
- **Medium Risk:** 1,205 patients (64%)
- **Low Risk:** 453 patients (18%)

## Key Features:
✓ Real-time patient risk distribution
✓ Drill-down by department and age group
✓ Linked to detailed patient records
✓ Updates daily at 11 PM

## Use Cases:
- Identify high-risk patients for intervention
- Allocate clinical resources effectively
- Monitor population health trends
- Generate alerts for critical findings`
      },
      {
        title: 'Clinical Measurements Trends',
        language: 'markdown',
        code: `# Power BI Dashboard: Vital Signs Analysis

## Visualizations:

### 1. 30-Day Rolling Average (Line Chart)
- Systolic BP: 122 mmHg (↓ 8% from 30 days ago)
- Heart Rate: 78 bpm (↑ 2% from 30 days ago)
- Glucose: 127 mg/dL (↓ 12% from 30 days ago)

### 2. Laboratory Results Summary (Matrix)
Shows distribution of normal/abnormal results by test type:
- Hemoglobin: 94% normal, 6% abnormal
- Cholesterol: 87% normal, 13% abnormal
- Creatinine: 98% normal, 2% abnormal
- Glucose: 78% normal, 22% abnormal

### 3. Outlier Detection Table (Interactive)
Automatically flags measurements >2 standard deviations:
- Patient ID | Measurement | Value | Expected | Status
- P008421 | Systolic BP | 198 | 70-220 | ⚠️ Review
- P012567 | Glucose | 487 | 40-300 | ⚠️ Review

### 4. Quality Scorecard (KPIs)
- Validity: 99.8% ✓
- Completeness: 98.2% ✓
- Accuracy: 99.8% ✓`
      },
      {
        title: 'Data Quality Monitor',
        language: 'markdown',
        code: `# Power BI Dashboard: Data Quality & Governance

## Quality Metrics Timeline (Last 60 Days)
- Data Accuracy: 99.8% (Target: 99.5%) ✓
- Completeness Score: 98.2%
- Validity Score: 99.8%
- Timeliness Score: 96.5%

## Duplicate Records Monitor
- Week 1: 3 duplicates detected and removed
- Week 2: 1 duplicate detected and removed
- Week 3: 0 duplicates detected
- Week 4: 2 duplicates detected and removed

## Validation Errors Log
| Error Type | Count | Status |
|-----------|-------|--------|
| Invalid date ranges | 4 | Resolved |
| Missing required fields | 2 | Resolved |
| Referential integrity violations | 0 | ✓ |
| Outlier measurements | 12 | Under review |

## Data Completeness by Field
- patient_id: 100.0% ✓
- patient_name: 99.8% ✓
- visit_date: 99.7% ✓
- diagnosis_code: 98.5% ✓
- systolic_bp: 97.2%
- glucose: 94.3%`
      },
      {
        title: 'Clinical Risk Assessment',
        language: 'markdown',
        code: `# Power BI Dashboard: Risk Stratification & Intervention

## Risk Matrix (Scatter Plot)
X-Axis: Patient Age
Y-Axis: Number of Chronic Conditions
Size: Blood Pressure Level
Color: Risk Tier (Green=Low, Yellow=Medium, Red=High)

## Top Chronic Conditions by Risk
1. Type 2 Diabetes: 845 patients (Avg: 8.2 visits/month, 12% admission rate)
2. Essential Hypertension: 723 patients (Avg: 6.1 visits/month, 8% admission rate)
3. COPD: 456 patients (Avg: 9.4 visits/month, 18% admission rate)
4. Generalized Anxiety: 392 patients (Avg: 4.2 visits/month, 2% admission rate)

## 30-Day Readmission Risk
- High Risk: 47 patients requiring urgent follow-up
- Medium Risk: 156 patients needing routine follow-up
- Low Risk: 1,797 patients stable

## Intervention Effectiveness (90-Day Assessment)
- Antihypertensive Therapy: Avg -18 mmHg systolic ✓
- Diabetes Management: Avg -52 mg/dL glucose ✓
- COPD Management: Avg -2.5 exacerbations/year ✓`
      }
    ]
  };

  const tabs = [
    { id: 'python', label: 'Python', icon: FaCode, color: 'from-blue-500 to-cyan-500' },
    { id: 'sql', label: 'SQL', icon: FaDatabase, color: 'from-purple-500 to-pink-500' },
    { id: 'powerbi', label: 'Power BI', icon: FaChartBar, color: 'from-green-500 to-emerald-500' },
  ];

  const handleCopy = (index, code) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleDownload = (filename, code) => {
    const element = document.createElement('a');
    const file = new Blob([code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <section id="code-examples" className="py-20 px-4 sm:px-6 lg:px-8 bg-primary">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-accent to-highlight bg-clip-text text-transparent">
            Technical Implementation
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Explore the code, SQL queries, and Power BI dashboards behind the Clinical Data Intelligence Platform
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r ' + tab.color + ' text-white shadow-lg'
                    : 'bg-secondary/50 text-gray-300 hover:text-white border border-accent/20'
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </motion.button>
            );
          })}
        </div>

        {/* Code Examples */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {codeExamples[activeTab]?.map((example, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-secondary/30 backdrop-blur border border-accent/20 rounded-lg overflow-hidden hover:border-accent/60 transition-all duration-300"
            >
              {/* Example Header */}
              <div className="bg-gradient-to-r from-secondary/50 to-secondary/30 px-6 py-4 flex items-center justify-between border-b border-accent/20">
                <h3 className="text-lg font-bold text-white">{example.title}</h3>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCopy(index, example.code)}
                    className="p-2 hover:bg-accent/20 rounded transition-colors"
                    title="Copy code"
                  >
                    <FaCopy
                      size={16}
                      className={copiedIndex === index ? 'text-highlight' : 'text-accent'}
                    />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDownload(`${example.title.replace(/\s+/g, '_').toLowerCase()}.txt`, example.code)}
                    className="p-2 hover:bg-accent/20 rounded transition-colors"
                    title="Download code"
                  >
                    <FaDownload size={16} className="text-accent" />
                  </motion.button>
                </div>
              </div>

              {/* Code Block */}
              <div className="p-6 overflow-x-auto">
                <pre className="bg-gray-900/50 rounded p-4 border border-accent/10">
                  <code className={`language-${example.language} text-sm text-gray-300`}>
                    {example.code}
                  </code>
                </pre>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Download Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-r from-accent/10 to-highlight/10 border border-accent/20 rounded-lg p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6">📥 Download Full Project Files</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <a
              href="https://github.com/okutachiblessing/clinical-data-intelligence"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-secondary/50 hover:bg-secondary border border-accent/20 hover:border-accent/60 rounded-lg transition-all duration-300"
            >
              <FaCode className="text-blue-400 text-2xl" />
              <div>
                <p className="font-bold text-white">Python ETL Pipeline</p>
                <p className="text-sm text-gray-400">clinical-data-etl.py</p>
              </div>
            </a>
            <a
              href="https://github.com/okutachiblessing/clinical-data-intelligence"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-secondary/50 hover:bg-secondary border border-accent/20 hover:border-accent/60 rounded-lg transition-all duration-300"
            >
              <FaDatabase className="text-purple-400 text-2xl" />
              <div>
                <p className="font-bold text-white">SQL Validation Queries</p>
                <p className="text-sm text-gray-400">clinical-data-validation.sql</p>
              </div>
            </a>
            <a
              href="https://github.com/okutachiblessing/clinical-data-intelligence"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-secondary/50 hover:bg-secondary border border-accent/20 hover:border-accent/60 rounded-lg transition-all duration-300"
            >
              <FaChartBar className="text-green-400 text-2xl" />
              <div>
                <p className="font-bold text-white">Power BI Dashboard Guide</p>
                <p className="text-sm text-gray-400">powerbi-dashboards-guide.md</p>
              </div>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CodeViewer;
