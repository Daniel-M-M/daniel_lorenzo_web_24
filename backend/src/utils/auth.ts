import { Request, Response } from "express"
import jwt from "jsonwebtoken"

// Campi da inserire nell'access token
interface User {
    id_user: number
    user_name: string
    role: "admin" | "user"
}

const JWT_SECRET = "foo"
const COOKIE_NAME = "access-token"


export const setAccessToken = (req: Request, res: Response, user: any) => {
    // Crea l'access token con JWT
    const accessToken = jwt.sign(user, JWT_SECRET, { expiresIn: "1 day" })
    // Imposta l'access token come cookie
    res.cookie(COOKIE_NAME, accessToken, {
        maxAge: 86400000, // 1 giorno in millisecondi
        httpOnly: true,
        sameSite: true,
        // secure: true
    })
}

/**
 * Decodifica l'access token, ottenendo l'utente.
 * Usato per verificare se l'utente ha effettuato il login.
 */
export const decodeAccessToken = (req: Request, res: Response) => {

    const accessToken = req.cookies[COOKIE_NAME]

    if (!accessToken) return null
    try {
        const user = jwt.verify(accessToken, JWT_SECRET) as User
        return user
    } catch {
        return null
    }
}

/**
 * Cancella il cookie contente l'access token.
 * Usato per effettuare il logout.
 */
export const deleteAccessToken = (req: Request, res: Response) => {
    res.clearCookie(COOKIE_NAME)
}
