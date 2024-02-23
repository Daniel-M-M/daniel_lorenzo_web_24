import bcrypt from "bcrypt"
import { Request, Response } from "express"
import { decodeAccessToken, deleteAccessToken, setAccessToken } from "../utils/auth"
import { getConnection } from "../utils/db"

export const register = async (req: Request, res: Response) => {
    const user = decodeAccessToken(req, res)
    if (user) {
        res.status(403).send("Questa operazione richiede il logout.")
        return
    }

    const { id_user, user_name, user_surname, email_address, password } = req.body

    const connection = await getConnection()
    const [users] = await connection.execute("SELECT id_user FROM users WHERE id_user=?", [
        id_user,
    ])

    if (Array.isArray(users) && users.length > 0) {
        res.status(400).send("Username già in uso.")
        return
    }

    const passwordHash = await bcrypt.hash(password, 10)

    await connection.execute("INSERT INTO users (id_user, user_name, user_surname, password, email_address) VALUES (?, ?, ?, ?, ?)", [
        id_user,
        user_name,
        user_surname,
        passwordHash,
        email_address
    ])

    const [results] = await connection.execute(
        "SELECT id_user, user_name, role FROM users WHERE id_user=?",
        [id_user]
    )
    const newUser = (results as any)[0]

    setAccessToken(req, res, newUser)

    res.json({ message: "Registrazione effettuata con successo" })
}

export const login = async (req: Request, res: Response) => {

    const user = decodeAccessToken(req, res)
    if (user) {
        res.status(403).send("Questa operazione richiede il logout.")
        return
    }

    const { id_user, password } = req.body

    const connection = await getConnection()
    const [results] = await connection.execute(
        "SELECT id_user, user_surname, password, role FROM users WHERE id_user=?",
        [id_user]
    )

    if (!Array.isArray(results) || results.length == 0) {
        res.status(400).send("Credenziali User errate.")
        return
    }

    const userData = results[0] as any

    const passwordOk = await bcrypt.compare(password, userData.password)

    if (!passwordOk) {
        res.status(400).send("Credenziali Pass errate.")
        return
    }

    //delete userData.password

    setAccessToken(req, res, userData)

    res.json({ message: "Login effettuato con successo" })
}

export const logout = async (req: Request, res: Response) => {

    const user = decodeAccessToken(req, res)
    if (!user) {
        res.status(403).send("Questa operazione richiede l'autenticazione.")
        return
    }

    deleteAccessToken(req, res)
    res.json({ message: "Logout effettuato con successo" })
}

export const getProfile = async (req: Request, res: Response) => {
    const user = decodeAccessToken(req, res)
    res.json(user)
}
