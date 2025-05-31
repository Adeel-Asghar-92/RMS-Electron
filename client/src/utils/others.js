export const generateOrderToken = () => {
    const MAX_DIGITS = 8; // Desired token length
    const token = Date.now() % Math.pow(10, MAX_DIGITS); // Limit to MAX_DIGITS digits
    return token.toString().padStart(MAX_DIGITS, '0'); // Pad with leading zeros
};