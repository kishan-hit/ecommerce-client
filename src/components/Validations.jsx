export const Validate = ({ email, password, confirmPassword, isRegister }) => {
    const errors = [];

    if (!email)
        errors.push("Email is required.");
    if (!password)
        errors.push("Password is required.");
    if (isRegister && !confirmPassword)
        errors.push("Confirm password is required.");

    if (isRegister) {
        const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if (email && !emailRegex.test(email))
            errors.push("Invalid email format.");

        if (password) {
            if (password.length < 8)
                errors.push("Password must be at least 8 characters long.");
            if (!/[A-Z]/.test(password))
                errors.push("Password must include at least one uppercase letter.");
            if (!/[a-z]/.test(password))
                errors.push("Password must include at least one lowercase letter.");
            if (!/\d/.test(password))
                errors.push("Password must include at least one number.");
            // special characters - !@#$%^&*()_+-=[]{};:'\"\\|,.<>?/~`
            if (!/[!@#$%^&*()_+\-={}:'"\\|,.<>?~`]/.test(password))
                errors.push("Password must include at least one special character.");
        }

        if (password && confirmPassword && password !== confirmPassword)
            errors.push("Passwords do not match.");

        if (errors.length > 0) {
            const error = new Error("Validation failed.");
            error.details = errors;
            throw error;
        }
    }
}