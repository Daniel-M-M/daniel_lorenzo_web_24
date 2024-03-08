import { Request, Response } from "express";
import { getConnection } from "../utils/db";
import { decodeAccessToken } from "../utils/auth"


export const createPrestazione = async (req: Request, res: Response) => {
    // Verifica che l'utente abbia effettuato il login
    const user = decodeAccessToken(req, res)
    if (!user) {
        res.status(403).send("Questa operazione richiede l'autenticazione.")
        console.error("Errore nell'autenticazione durante l'inserzione della prestazione", req)
        return
    }

    const conn = await getConnection()
    const [prestazioni] = await conn.execute("SELECT titolo FROM prestazione WHERE titolo=?", [
        req.body.titolo,
    ])

    if (Array.isArray(prestazioni) && prestazioni.length > 0) {
        res.json({ success: false,  message: "Prestazione già esiste"})
        return
    }
    try {
        await conn.execute("INSERT INTO prestazione (titolo, costo) VALUES (?, ?)",
            [
                req.body.titolo,
                req.body.costo,
            ])
        res.json({ success: true,  message: "Prestazione Creata"})
    } catch (e) {
        console.error("Errore della query nel admin controller", req.params)
    }
}

//TODO testare questa funzione
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
    try {
        await conn.execute("DELETE FROM prestazione WHERE id = ?", [req.params.id])
        res.json({ success: false,  message: "La prestazione è stata cancellata"})
    } catch (e) {
        console.error("Error nel delete del controller", req.params.id)
    }

}

export const createDoctors = async (req: Request, res: Response) => {
    // Verifica che l'utente abbia effettuato il login
    const user = decodeAccessToken(req, res)
    if (!user) {
        res.json({ success: false, message: "Questa operazione richiede l'autenticazione."})
        return
    }

    const conn = await getConnection()
    const [dottori] = await conn.execute("SELECT id_doctor FROM doctors WHERE id_doctor=?", [
        req.body.id_doctor,
    ])

    if (Array.isArray(dottori) && dottori.length > 0) {
        res.json({ success: false,  message: "Questo dottore già esiste"})
        return
    }

    try {
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
    } catch (e) {
        console.error("Error nella query di inserimento dottore", req.body)
    }
}

//TODO verificare questa funzione
export const updateDoctors = async (req: Request, res: Response) => {
    // Verifica che l'utente abbia effettuato il login
    const user = decodeAccessToken(req, res)
    if (!user) {
        res.status(403).send("Questa operazione richiede l'autenticazione.")
        return
    }

    const conn = await getConnection()
    await conn.execute("UPDATE doctors SET prestazione1=?, prestazione2=?, prestazione3=? WHERE doctors.id_doctor=?",
        [
            req.body.prestazione1,
            req.body.prestazione2,
            req.body.prestazione3,
            req.body.id_doctor,
        ])
    res.json({ success: true,  message: "Aggiornamento effettuato con successo"})
}

//TODO questa funzione da errore non lo so dove, mettere piu try/catch
export const cancellaDottore = async (req: Request, res: Response) => {
    // Verifica che l'utente abbia effettuato il login
    //const user = decodeAccessToken(req, res)
    /*if (user?.role !== "admin") {
        res.status(403).send("Questa operazione richiede l'autenticazione.")
        console.error("Error nel decode user nel delete dottore", req.params)
        return
    }*/

    const conn = await getConnection()

    const [booking] = await conn.execute("SELECT * FROM doctors WHERE id=?", [req.params.id])
    if (!Array.isArray(booking) || booking.length == 0) {
        console.error("Book non trovato", req.params)
        res.status(404).send("Book non trovato.")
        return
    }

    try {
        const result = await conn.execute("DELETE FROM doctors WHERE doctors.id=?", [req.params.id]);
        if (result.length > 0) {
            res.json({ success: true,  message: "Il dottore è stato cancellato con successo"});
        } else {
            res.status(404).json({ success: false, message: "Nessun dottore trovato con quell'ID"});
            console.error("error nel else del result.length", req.params)
        }
        console.log("Successo nella cancellazione del dottore");
    } catch (e) {
        console.error("Errore nella cancellazione del dottore:", e);
        res.status(500).json({ success: false, message: "Errore durante la cancellazione del dottore"});
    }
}

//TODO verificare anche questa funzione
export const getPrestazionePerDottore = async (req: Request, res: Response) => {
    const conn = await getConnection()
    const [booking] = await conn.execute("SELECT booking.id as id, booking.id_prestazione, doctors.doth_name, doctors.doth_surname, booking.data_prenotazione, booking.ora_prenotazione FROM booking LEFT OUTER JOIN doctors ON booking.id_doctor=doctors.id_doctor WHERE booking.id_doctor = ? ORDER BY booking.data_prenotazione, booking.ora_prenotazione DESC",
        [req.body.id_doctor])
    res.json(booking)
}