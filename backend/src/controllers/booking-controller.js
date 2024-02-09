"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDoctors = exports.getPrestazioni = exports.getMyBooking = exports.deleteBooking = exports.checkBooking = exports.createBooking = void 0;
const db_1 = require("../utils/db");
const auth_1 = require("../utils/auth");
const createBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Verifica che l'utente abbia effettuato il login
    const user = (0, auth_1.decodeAccessToken)(req, res);
    if (!user) {
        res.status(403).send("Questa operazione richiede l'autenticazione.");
        return;
    }
    const conn = yield (0, db_1.getConnection)();
    yield conn.execute("INSERT INTO booking (id_user, id_doctor, id_prestazione, data_prenotazione, ora_prenotazione) VALUES (?, ?, ?, ?, ?)", [
        user.id_user,
        req.body.id_doctor,
        req.body.id_prenotazione,
        req.body.data_prenotazione,
        req.body.ora_prenotazione,
    ]);
    res.json({ success: true, message: "Prenotazione effettuata con successo" });
});
exports.createBooking = createBooking;
const checkBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Verifica che l'utente abbia effettuato il login
    const user = (0, auth_1.decodeAccessToken)(req, res);
    if (!user) {
        res.status(403).send("Questa operazione richiede l'autenticazione.");
        return;
    }
    const conn = yield (0, db_1.getConnection)();
    const [verified] = yield conn.execute("SELECT id_user, data_prenotazione, ora_prenotazione FROM booking");
    if (req.body.data_prenotazione === verified.data_prenotazione && req.body.ora_prenotazione === verified.ora_prenotazione) {
        res.json({ success: false }).send("Questo periodo è già stato prenotato");
    }
    else {
        yield (0, exports.createBooking)(req, res);
        res.json({ success: true });
    }
});
exports.checkBooking = checkBooking;
const deleteBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Verifica che l'utente abbia effettuato il login
    const user = (0, auth_1.decodeAccessToken)(req, res);
    if (!user) {
        res.status(403).send("Questa operazione richiede l'autenticazione.");
        return;
    }
    const conn = yield (0, db_1.getConnection)();
    const [booking] = yield conn.execute("SELECT * FROM booking WHERE id=?", [req.params.id]);
    if (!Array.isArray(booking) || booking.length == 0) {
        res.status(404).send("Post non trovato.");
        return;
    }
    const book = booking[0];
    if (book.id_user != user.id_user && user.role != "admin") {
        res.status(403).send("Non hai i permessi per eliminare questo post.");
        return;
    }
    yield conn.execute("DELETE FROM booking WHERE id=?", [req.params.id]);
    res.json({ success: true, message: "Prenotazione cancellata con successo" });
});
exports.deleteBooking = deleteBooking;
const getMyBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const conn = yield (0, db_1.getConnection)();
    const [booking] = yield conn.execute("SELECT booking.id as id, booking.id_user, doctors.doth_name, doctors.doth_surname, booking.data_prenotazione, booking.ora_prenotazione, booking.id_prenotazione FROM booking LEFT OUTER JOIN doctors ON booking.id_user=users.id_user WHERE id_user=? OR id_doctor=? ORDER BY booking.data_prenotazione, booking.ora_prenotazione DESC");
    res.json(booking);
});
exports.getMyBooking = getMyBooking;
const getPrestazioni = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const conn = yield (0, db_1.getConnection)();
    const [prestazioni] = yield conn.execute("SELECT * FROM prestazione");
    res.json(prestazioni);
});
exports.getPrestazioni = getPrestazioni;
const getDoctors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const conn = yield (0, db_1.getConnection)();
    const [doctors] = yield conn.execute("SELECT * FROM doctors");
    res.json(doctors);
});
exports.getDoctors = getDoctors;
