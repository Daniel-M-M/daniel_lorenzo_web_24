"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAccessToken = exports.decodeAccessToken = exports.setAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = "foo";
const COOKIE_NAME = "access-token";
const setAccessToken = (req, res, user) => {
    // Crea l'access token con JWT
    const accessToken = jsonwebtoken_1.default.sign(user, JWT_SECRET, { expiresIn: "1 day" });
    // Imposta l'access token come cookie
    res.cookie(COOKIE_NAME, accessToken, {
        maxAge: 86400000, // 1 giorno in millisecondi
        httpOnly: true,
        sameSite: true,
        // secure: true
    });
};
exports.setAccessToken = setAccessToken;
/**
 * Decodifica l'access token, ottenendo l'utente.
 * Usato per verificare se l'utente ha effettuato il login.
 */
const decodeAccessToken = (req, res) => {
    const accessToken = req.cookies[COOKIE_NAME];
    if (!accessToken)
        return null;
    try {
        const user = jsonwebtoken_1.default.verify(accessToken, JWT_SECRET);
        return user;
    }
    catch (_a) {
        return null;
    }
};
exports.decodeAccessToken = decodeAccessToken;
/**
 * Cancella il cookie contente l'access token.
 * Usato per effettuare il logout.
 */
const deleteAccessToken = (req, res) => {
    res.clearCookie(COOKIE_NAME);
};
exports.deleteAccessToken = deleteAccessToken;
