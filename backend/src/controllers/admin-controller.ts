import {Request, Response} from "express";
import {getConnection} from "../utils/db";
import { decodeAccessToken } from "../utils/auth"

export const createPrestazione = async (req: Request, res: Response) => {
    // Verifica che l'utente abbia effettuato il login
    const user = decodeAccessToken(req, res)
    if (!user) {
        res.status(403).send("Questa operazione richiede l'autenticazione.")
        return
    }

    const conn = await getConnection()
    await conn.execute("INSERT INTO prestazione (titolo, costo) VALUES (?, ?)",
        [
            req.body.titolo,
            req.body.costo,
        ])
    res.json({ success: true,  message: "Prestazione effettuata con successo"})
}

export const updatePrestazione = async (req: Request, res: Response) => {
    // Verifica che l'utente abbia effettuato il login
    const user = decodeAccessToken(req, res)
    if (!user) {
        res.status(403).send("Questa operazione richiede l'autenticazione.")
        return
    }



    const conn = await getConnection()
    await conn.execute("UPDATE prestazione SET costo=? WHERE prestazione.id = ?",
        [
            req.body.costo,
            req.body.id,
        ])
    res.json({ success: true,  message: "Aggiornamento effettuato con successo"})
}

export const cancellaPrestazione = async (req: Request, res: Response) => {
    // Verifica che l'utente abbia effettuato il login
    const user = decodeAccessToken(req, res)
    if (!user) {
        res.status(403).send("Questa operazione richiede l'autenticazione.")
        return
    }

    const conn = await getConnection()
    await conn.execute("DELETE FROM prestazione WHERE prestazione.id = ?", [req.body.id])
    res.json({ success: true,  message: "La prestazione è stata cancellata con successo"})
}

export const createDoctors = async (req: Request, res: Response) => {
    // Verifica che l'utente abbia effettuato il login
    const user = decodeAccessToken(req, res)
    if (!user) {
        res.status(403).send("Questa operazione richiede l'autenticazione.")
        return
    }

    const conn = await getConnection()
    await conn.execute("INSERT INTO doctors (id_doctor, doth_name, doth_surname, password, prestazione1, prestazione2, prestazione3) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
            req.body.id_doctor,
            req.body.doth_name,
            req.body.doth_surname,
            req.body.password,
            req.body.prestazione1,
            req.body.prestazione2,
            req.body.prestazione3,
        ])
    res.json({ success: true,  message: "Dottore aggiunto con successo successo"})
}

export const updateDoctors = async (req: Request, res: Response) => {
    // Verifica che l'utente abbia effettuato il login
    const user = decodeAccessToken(req, res)
    if (!user) {
        res.status(403).send("Questa operazione richiede l'autenticazione.")
        return
    }

    const conn = await getConnection()
    await conn.execute("UPDATE doctors SET prestazione1=?, prestazione2=?, prestazione3=? WHERE doctors.id_doctor = ?",
        [
            req.body.prestazione1,
            req.body.prestazione2,
            req.body.prestazione3,
            req.body.id_doctor,
        ])
    res.json({ success: true,  message: "Aggiornamento effettuato con successo"})
}

export const cancellaDottore = async (req: Request, res: Response) => {
    // Verifica che l'utente abbia effettuato il login
    const user = decodeAccessToken(req, res)
    if (!user) {
        res.status(403).send("Questa operazione richiede l'autenticazione.")
        return
    }

    const conn = await getConnection()
    await conn.execute("DELETE FROM doctors WHERE doctors.id_doctor = ?", [req.body.id_doctor])
    res.json({ success: true,  message: "Il dottore è stata cancellato con successo"})
}

export const getPrestazionePerDottore = async (req: Request, res: Response) => {
    const conn = await getConnection()
    const [booking] = await conn.execute("SELECT booking.id as id, booking.id_prestazione, doctors.doth_name, doctors.doth_surname, booking.data_prenotazione, booking.ora_prenotazione FROM booking LEFT OUTER JOIN doctors ON booking.id_doctor=doctors.id_doctor WHERE booking.id_doctor = ? ORDER BY booking.data_prenotazione, booking.ora_prenotazione DESC", [req.body.id_doctor])
    res.json(booking)
}