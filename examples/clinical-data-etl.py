"""
Clinical Data Intelligence Platform - ETL Pipeline
Data cleaning, transformation, and quality assurance for Electronic Medical Records
Author: Blessing Okutachi
Created: 2025
"""

import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import logging
from typing import Tuple, Dict, List
import json

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


class ClinicalDataETL:
    """
    ETL Pipeline for Electronic Medical Records (EMR) transformation
    Handles data cleaning, validation, and quality assurance
    """
    
    def __init__(self, config_file: str = None):
        """Initialize ETL pipeline with configuration"""
        self.config = config_file or {}
        self.quality_metrics = {
            'total_records': 0,
            'valid_records': 0,
            'invalid_records': 0,
            'duplicates_removed': 0,
            'missing_values_imputed': 0,
            'validation_errors': []
        }
        
    def extract_emr_data(self, file_path: str) -> pd.DataFrame:
        """
        Extract data from EMR systems (CSV, Excel, or database)
        
        Args:
            file_path: Path to EMR data file
            
        Returns:
            DataFrame with raw EMR data
        """
        logger.info(f"Extracting EMR data from {file_path}")
        
        try:
            if file_path.endswith('.csv'):
                df = pd.read_csv(file_path, encoding='utf-8')
            elif file_path.endswith(('.xls', '.xlsx')):
                df = pd.read_excel(file_path)
            else:
                raise ValueError("Unsupported file format. Use CSV or Excel.")
                
            self.quality_metrics['total_records'] = len(df)
            logger.info(f"Successfully extracted {len(df)} records")
            
            return df
            
        except Exception as e:
            logger.error(f"Error extracting data: {str(e)}")
            raise
    
    def clean_patient_data(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Clean and standardize patient demographic data
        
        Args:
            df: Raw EMR dataframe
            
        Returns:
            Cleaned dataframe
        """
        logger.info("Starting patient data cleaning...")
        df_clean = df.copy()
        
        # Remove complete duplicates
        duplicates_before = len(df_clean)
        df_clean = df_clean.drop_duplicates(subset=['patient_id', 'visit_date'])
        self.quality_metrics['duplicates_removed'] = duplicates_before - len(df_clean)
        
        # Standardize patient names
        if 'patient_name' in df_clean.columns:
            df_clean['patient_name'] = df_clean['patient_name'].str.upper().str.strip()
        
        # Validate and standardize phone numbers
        if 'phone_number' in df_clean.columns:
            df_clean['phone_number'] = df_clean['phone_number'].str.replace(
                r'[^\d]', '', regex=True
            )
            df_clean['phone_number'] = df_clean['phone_number'].apply(
                lambda x: x if len(x) == 10 else np.nan
            )
        
        # Standardize email addresses
        if 'email' in df_clean.columns:
            df_clean['email'] = df_clean['email'].str.lower().str.strip()
        
        logger.info(f"Patient data cleaning complete. Records after cleaning: {len(df_clean)}")
        return df_clean
    
    def clean_clinical_data(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Clean clinical measurement data and handle missing values
        
        Args:
            df: Cleaning dataframe with clinical data
            
        Returns:
            Cleaned clinical dataframe
        """
        logger.info("Starting clinical data cleaning...")
        df_clean = df.copy()
        
        # Define clinical measurement columns and valid ranges
        clinical_measurements = {
            'systolic_bp': (70, 220),      # Blood pressure systolic
            'diastolic_bp': (40, 140),     # Blood pressure diastolic
            'heart_rate': (30, 200),       # Beats per minute
            'temperature': (95.0, 106.0),  # Fahrenheit
            'glucose': (40, 500),          # mg/dL
            'hemoglobin': (5.0, 20.0),     # g/dL
        }
        
        # Remove outliers and standardize measurements
        for measurement, (min_val, max_val) in clinical_measurements.items():
            if measurement in df_clean.columns:
                # Flag outliers
                outliers = df_clean[
                    (df_clean[measurement] < min_val) | 
                    (df_clean[measurement] > max_val)
                ]
                logger.warning(f"Found {len(outliers)} outliers in {measurement}")
                
                # Replace outliers with NaN
                df_clean.loc[
                    (df_clean[measurement] < min_val) | 
                    (df_clean[measurement] > max_val), 
                    measurement
                ] = np.nan
                
                # Impute missing values with median
                median_val = df_clean[measurement].median()
                df_clean[measurement].fillna(median_val, inplace=True)
                self.quality_metrics['missing_values_imputed'] += outliers.shape[0]
        
        logger.info("Clinical data cleaning complete")
        return df_clean
    
    def validate_data_integrity(self, df: pd.DataFrame) -> Tuple[pd.DataFrame, Dict]:
        """
        Validate data integrity and referential constraints
        
        Args:
            df: DataFrame to validate
            
        Returns:
            Tuple of (valid_dataframe, validation_report)
        """
        logger.info("Starting data integrity validation...")
        
        validation_report = {
            'total_checks': 0,
            'passed_checks': 0,
            'failed_checks': 0,
            'issues': []
        }
        
        df_valid = df.copy()
        
        # 1. Check for required fields
        required_fields = ['patient_id', 'visit_date', 'diagnosis_code']
        validation_report['total_checks'] += 1
        
        missing_required = df_valid[required_fields].isnull().any(axis=1)
        if missing_required.any():
            validation_report['failed_checks'] += 1
            validation_report['issues'].append(
                f"Missing required fields: {len(missing_required)} records"
            )
            df_valid = df_valid[~missing_required]
        else:
            validation_report['passed_checks'] += 1
        
        # 2. Validate patient IDs (should be unique)
        validation_report['total_checks'] += 1
        duplicate_ids = df_valid['patient_id'].duplicated().sum()
        if duplicate_ids > 0:
            validation_report['failed_checks'] += 1
            validation_report['issues'].append(f"Duplicate patient IDs: {duplicate_ids}")
        else:
            validation_report['passed_checks'] += 1
        
        # 3. Validate date format and ranges
        validation_report['total_checks'] += 1
        try:
            df_valid['visit_date'] = pd.to_datetime(df_valid['visit_date'])
            future_dates = df_valid['visit_date'] > datetime.now()
            if future_dates.any():
                validation_report['failed_checks'] += 1
                validation_report['issues'].append(
                    f"Future dates found: {future_dates.sum()}"
                )
                df_valid = df_valid[~future_dates]
            else:
                validation_report['passed_checks'] += 1
        except Exception as e:
            validation_report['failed_checks'] += 1
            validation_report['issues'].append(f"Invalid date format: {str(e)}")
        
        # 4. Validate diagnosis codes (ICD-10 format)
        validation_report['total_checks'] += 1
        invalid_diagnosis = ~df_valid['diagnosis_code'].str.match(r'^[A-Z]\d{2}\.\d{1,2}$')
        if invalid_diagnosis.any():
            validation_report['failed_checks'] += 1
            validation_report['issues'].append(
                f"Invalid diagnosis codes: {invalid_diagnosis.sum()}"
            )
            df_valid = df_valid[~invalid_diagnosis]
        else:
            validation_report['passed_checks'] += 1
        
        # 5. Data completeness check
        validation_report['total_checks'] += 1
        null_percentage = (df_valid.isnull().sum() / len(df_valid) * 100).max()
        if null_percentage > 5:
            validation_report['failed_checks'] += 1
            validation_report['issues'].append(
                f"High null percentage: {null_percentage:.2f}%"
            )
        else:
            validation_report['passed_checks'] += 1
        
        logger.info(
            f"Validation complete: {validation_report['passed_checks']}/{validation_report['total_checks']} checks passed"
        )
        
        return df_valid, validation_report
    
    def transform_data(self, df: pd.DataFrame, sql_engine=None) -> pd.DataFrame:
        """
        Transform cleaned data for analytics and visualization
        
        Args:
            df: Cleaned dataframe
            sql_engine: SQLAlchemy engine for database operations
            
        Returns:
            Transformed dataframe ready for analytics
        """
        logger.info("Starting data transformation...")
        df_transform = df.copy()
        
        # 1. Create date dimensions
        df_transform['visit_year'] = pd.to_datetime(df_transform['visit_date']).dt.year
        df_transform['visit_month'] = pd.to_datetime(df_transform['visit_date']).dt.month
        df_transform['visit_quarter'] = pd.to_datetime(df_transform['visit_date']).dt.quarter
        df_transform['visit_day_of_week'] = pd.to_datetime(
            df_transform['visit_date']
        ).dt.day_name()
        
        # 2. Create diagnosis categories
        diagnosis_mapping = {
            'A': 'Infection',
            'B': 'Neoplasm',
            'C': 'Blood Disease',
            'D': 'Endocrine',
            'E': 'Mental Health',
        }
        df_transform['diagnosis_category'] = df_transform['diagnosis_code'].str[0].map(
            diagnosis_mapping
        )
        
        # 3. Create patient risk tiers based on clinical indicators
        def calculate_risk_tier(row):
            risk_score = 0
            if row.get('systolic_bp', 0) > 180 or row.get('diastolic_bp', 0) > 110:
                risk_score += 2
            if row.get('glucose', 0) > 200:
                risk_score += 2
            if row.get('heart_rate', 0) > 100 or row.get('heart_rate', 0) < 50:
                risk_score += 1
            
            if risk_score >= 4:
                return 'High'
            elif risk_score >= 2:
                return 'Medium'
            else:
                return 'Low'
        
        df_transform['risk_tier'] = df_transform.apply(calculate_risk_tier, axis=1)
        
        # 4. Create derived metrics
        if 'systolic_bp' in df_transform.columns and 'diastolic_bp' in df_transform.columns:
            df_transform['mean_arterial_pressure'] = (
                df_transform['systolic_bp'] + 
                2 * df_transform['diastolic_bp']
            ) / 3
        
        # 5. De-identify sensitive data for privacy compliance
        df_transform = self.deidentify_pii(df_transform)
        
        logger.info("Data transformation complete")
        self.quality_metrics['valid_records'] = len(df_transform)
        
        return df_transform
    
    def deidentify_pii(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        De-identify Personally Identifiable Information (HIPAA compliance)
        
        Args:
            df: DataFrame with PII
            
        Returns:
            De-identified DataFrame
        """
        df_deidentified = df.copy()
        
        # Remove direct identifiers
        pii_columns_to_remove = ['patient_name', 'email', 'phone_number', 'address']
        for col in pii_columns_to_remove:
            if col in df_deidentified.columns:
                df_deidentified.drop(col, axis=1, inplace=True)
        
        # Hash or mask remaining identifiers
        if 'patient_id' in df_deidentified.columns:
            df_deidentified['patient_id_hash'] = df_deidentified['patient_id'].apply(
                lambda x: hash(str(x)) if pd.notna(x) else None
            )
        
        logger.info("Data de-identified for privacy compliance")
        return df_deidentified
    
    def generate_quality_report(self) -> Dict:
        """
        Generate data quality metrics report
        
        Returns:
            Dictionary with quality metrics
        """
        if self.quality_metrics['total_records'] > 0:
            accuracy_rate = (
                self.quality_metrics['valid_records'] / 
                self.quality_metrics['total_records'] * 100
            )
        else:
            accuracy_rate = 0
        
        report = {
            ...self.quality_metrics,
            'data_accuracy_rate': round(accuracy_rate, 2),
            'timestamp': datetime.now().isoformat()
        }
        
        logger.info(f"Quality Report: {json.dumps(report, indent=2)}")
        return report


# Example usage
if __name__ == "__main__":
    # Initialize ETL pipeline
    etl = ClinicalDataETL()
    
    # Extract
    raw_df = etl.extract_emr_data('emr_data.csv')
    
    # Clean
    cleaned_df = etl.clean_patient_data(raw_df)
    cleaned_df = etl.clean_clinical_data(cleaned_df)
    
    # Validate
    validated_df, validation_report = etl.validate_data_integrity(cleaned_df)
    
    # Transform
    transformed_df = etl.transform_data(validated_df)
    
    # Generate quality report
    quality_report = etl.generate_quality_report()
    
    print("ETL Pipeline Complete!")
    print(f"Accuracy Rate: {quality_report['data_accuracy_rate']}%")
