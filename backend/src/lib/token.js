import jwt from 'jsonwebtoken';

const jwtSign = process.env.JWT_SECRET || 'supersecret';

/**
 * fungsi untuk men-generate token
 * @param {object} payload - payload id, role
 * @param {string} expiresIn - expires jwt
 * @returns me-return token jwt
 */
export const generateToken = (payload, expiresIn = '1d') => {
    return jwt.sign(payload, jwtSign, { expiresIn });
}
/**
 * untuk memverifikasi sah atau tidak nya token
 * @param {string} token - token yang akan diverifikasi
 * @returns - payload dari token yang diberikan
 */
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, jwtSign);
    } catch(err) {
        return null;
    }
}

