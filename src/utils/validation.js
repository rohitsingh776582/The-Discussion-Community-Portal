
export const validateSignup = (values) => {
    const errors = {};
    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!nameRegex.test(values.name)) {
        errors.name = 'Name must not contain numbers or special characters';
    }
    if (!emailRegex.test(values.email)) {
        errors.email = 'Invalid email format';
    }
    if (values.password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
    }
    return errors;
};
