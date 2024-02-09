import { Request, Response } from "express"
import { getConnection } from "../utils/db"
import { decodeAccessToken } from "../utils/auth"

export const createBooking = async (req: Request, res: Response) => {
    // Verifica che l'utente abbia effettuato il login
    const user = decodeAccessToken(req, res)
    if (!user) {
        res.status(403).send("Questa operazione richiede l'autenticazione.")
        return
    }

    const conn = await getConnection()
    await conn.execute("INSERT INTO booking (id_user, id_doctor, id_prestazione, data_prenotazione, ora_prenotazione) VALUES (?, ?, ?, ?, ?)",
        [
        user.id_user,
        req.body.id_doctor,
        req.body.id_prenotazione,
        req.body.data_prenotazione,
        req.body.ora_prenotazione,
    ])
    res.json({ success: true,  message: "Prenotazione effettuata con successo"})
}

export const checkBooking = async (req: Request, res: Response) => {
    // Verifica che l'utente abbia effettuato il login
    const user = decodeAccessToken(req, res)
    if (!user) {
        res.status(403).send("Questa operazione richiede l'autenticazione.")
        return
    }

    const conn = await getConnection()
    const [verified] = await conn.execute("SELECT id_user, data_prenotazione, ora_prenotazione FROM booking")
    if (req.body.data_prenotazione === verified.data_prenotazione && req.body.ora_prenotazione === verified.ora_prenotazione) {
        res.json({ success: false }).send("Questo periodo è già stato prenotato")
    }
    else {
        await createBooking(req, res)
        res.json({ success: true })
    }
}

export const deleteBooking = async (req: Request, res: Response) => {
    // Verifica che l'utente abbia effettuato il login
    const user = decodeAccessToken(req, res)
    if (!user) {
        res.status(403).send("Questa operazione richiede l'autenticazione.")
        return
    }

    const conn = await getConnection()

    const [booking] = await conn.execute("SELECT * FROM booking WHERE id=?", [req.params.id])
    if (!Array.isArray(booking) || booking.length == 0) {
        res.status(404).send("Post non trovato.")
        return
    }

    const book = booking[0] as any
    if (book.id_user != user.id_user && user.role != "admin") {
        res.status(403).send("Non hai i permessi per eliminare questo post.")
        return
    }

    await conn.execute("DELETE FROM booking WHERE id=?", [req.params.id])
    res.json({ success: true, message: "Prenotazione cancellata con successo" })
}

export const getMyBooking = async (req: Request, res: Response) => {
    const conn = await getConnection()
    const [booking] = await conn.execute("SELECT booking.id as id, booking.id_user, doctors.doth_name, doctors.doth_surname, booking.data_prenotazione, booking.ora_prenotazione, booking.id_prenotazione FROM booking LEFT OUTER JOIN doctors ON booking.id_user=users.id_user WHERE id_user=? OR id_doctor=? ORDER BY booking.data_prenotazione, booking.ora_prenotazione DESC")
    res.json(booking)
}

export const getPrestazioni = async (req: Request, res: Response) => {

    const conn = await getConnection();

    const [prestazioni] = await conn.execute(
        "SELECT * FROM prestazione"
    );

    res.json(prestazioni);

}

export const getDoctors = async (req: Request, res: Response) => {

    const conn = await getConnection();

    const [doctors] = await conn.execute(
        "SELECT * FROM doctors"
    );

    res.json(doctors);

}