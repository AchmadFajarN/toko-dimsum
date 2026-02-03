import { verifyToken } from "../lib/token.js";;

export const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(400).json({
            success: false,
            message: "Anda tidak berhak mengakses resource ini"
        });
    }

    const token = authHeader.split(" ")[1];
    const payload = verifyToken(token);
    if (!payload) {
        return res.status(400).json({
            success: false,
            message: 'sesi login telah habis'
        });
    };

    req.user = payload;
    next();
}