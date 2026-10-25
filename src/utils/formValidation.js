/**
 * Simple, robust Form Validation Strategies in pure JavaScript (Topic 55-60)
 */

export const validateRequired = (value, fieldName = 'This field') => {
  if (value === null || value === undefined || (typeof value === 'string' && value.trim() === '')) {
    return `${fieldName} is required`;
  }
  return null;
};

export const validateEmail = (email) => {
  if (!email || email.trim() === '') {
    return 'Email address is required';
  }
  // Standard RFC email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return 'Please enter a valid email address (e.g. name@domain.com)';
  }
  return null;
};

export const validatePhone = (phone) => {
  if (!phone || phone.trim() === '') {
    return 'Phone number is required';
  }
  // At least 10 digits/characters, allows +, -, spaces, ()
  const digitsOnly = phone.replace(/\D/g, '');
  if (digitsOnly.length < 10) {
    return 'Phone number must contain at least 10 digits';
  }
  return null;
};

export const validateMinLength = (value, min = 3, fieldName = 'This field') => {
  if (!value || value.trim().length < min) {
    return `${fieldName} must be at least ${min} characters`;
  }
  return null;
};

export const validateAge = (age) => {
  if (age === '' || age === undefined || age === null) {
    return 'Age is required';
  }
  const num = Number(age);
  if (isNaN(num) || num < 0 || num > 125) {
    return 'Please enter a valid age between 0 and 125';
  }
  return null;
};

export const validateCheckbox = (checked, message = 'You must accept the terms') => {
  if (!checked) {
    return message;
  }
  return null;
};
