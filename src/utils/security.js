/**
 * Security utilities and best practices
 */

const SecurityHeaders = {
  setCSP: () => {
    const csp = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';";
    document.head.insertAdjacentHTML(
      'afterbegin',
      `<meta http-equiv="Content-Security-Policy" content="${csp}">`
    );
  },

  // Prevent XSS by sanitizing user input
  sanitizeInput: (input) => {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
  },

  // Validate email format
  validateEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Secure headers middleware
  getSecurityHeaders: () => ({
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';",
  }),
};

export default SecurityHeaders;
