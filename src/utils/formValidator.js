/**
 * Form validation utilities
 */

const FormValidator = {
  validateContactForm: (formData) => {
    const errors = [];

    // Name validation
    if (!formData.name || formData.name.trim().length < 2) {
      errors.push('Name must be at least 2 characters long');
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      errors.push('Please provide a valid email address');
    }

    // Subject validation
    if (!formData.subject || formData.subject.trim().length < 3) {
      errors.push('Subject must be at least 3 characters long');
    }

    // Message validation
    if (!formData.message || formData.message.trim().length < 10) {
      errors.push('Message must be at least 10 characters long');
    }

    // Check for spam patterns
    const spamPatterns = [/viagra/gi, /casino/gi, /lottery/gi];
    const allText = Object.values(formData).join(' ');
    if (spamPatterns.some((pattern) => pattern.test(allText))) {
      errors.push('Your message contains blocked content');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  },

  // Additional validation methods
  validateEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  validatePassword: (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  },
};

export default FormValidator;
