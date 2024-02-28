import { Request, Response } from "express"
import { getConnection } from "../utils/db"
import { decodeAccessToken } from "../utils/auth"

export const createBooking = async (req: Request, res: Response) => {

    const id_user = req.body.id_user;
    const id_doctor = req.body.id_doctor;
    const id_prestazione = req.body.id_prestazione;
    const data_prenotazione = req.body.data_prenotazione;
    const ora_prenotazione = req.body.ora_prenotazione;

    // Verifica che tutti i parametri siano definiti
    if (id_user === undefined || id_doctor === undefined || id_prestazione === undefined || data_prenotazione === undefined || ora_prenotazione === undefined) {
        console.error("Uno o più parametri mancanti.", id_user, id_doctor, id_prestazione, data_prenotazione, ora_prenotazione);
        return;
    }

    // Creo una variabile con tutti i booking già fatti con lo stesso dottore data e ora
    const conn = await getConnection()
    const [bookings] = await conn.execute("SELECT * FROM booking WHERE id_doctor=? AND data_prenotazione=? AND ora_prenotazione=?", [
        id_doctor,
        data_prenotazione,
        ora_prenotazione
    ])

    // Verifico se quello slot di prenotazione esiste
    if (Array.isArray(bookings) && bookings.length > 0) {
        res.json({ success: false,  message: "Il dottore selezionato ha già un appuntamento in questa data e ora."})
        return
    }

    // Faccio l'inserimento della prenotazione caso non esista
    try {
        await conn.execute("INSERT INTO booking (id_user, id_doctor, id_prestazione, data_prenotazione, ora_prenotazione) VALUES (?, ?, ?, ?, ?)",
            [
            id_user,
            id_doctor,
            id_prestazione,
            data_prenotazione,
            ora_prenotazione
            ])
    } catch (e) {
        console.error("Provando inserire nel db", req.body)
    }
    res.json({ success: true,  message: "Prenotazione effettuata con successo"})
}

//TODO add controllo dei probabile errori nel deleteBooking.
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
        console.error("Book non trovato", req.params)
        res.status(404).send("Book non trovato.")
        return
    }

    //Questa funzione serve per verificare se l'usuario è login e se è admin
    /*const book = booking[0] as any
    if (book.id_user != user.id_user || user.role === "admin") {
        console.error("Error durante il check dei permessi per cancellare", req.body)
        res.status(403).send("Non hai i permessi per eliminare questo post.")
        return
    }*/

    try {
        await conn.execute("DELETE FROM booking WHERE id=?", [req.params.id])
        res.json({ success: false, message: "Prenotazione cancellata con successo" })
    } catch (error) {
        console.error("Errore catturato durante la cancellazione del SQL")
    }
}

export const getAllBooking = async (req: Request, res: Response) => {
    const user = decodeAccessToken(req, res)
    if (!user) {
        res.status(403).send("Questa operazione richiede l'autenticazione.")
        return
    }
    const conn = await getConnection()
    const [booking] = await conn.execute("SELECT * FROM booking ORDER BY data_prenotazione, ora_prenotazione DESC")
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

export const getUtenti = async (req: Request, res: Response) => {

    const conn = await getConnection();

    const [users] = await conn.execute(
        "SELECT id_user, user_name, user_surname, email_address, role FROM users"
    );

    res.json(users);

}