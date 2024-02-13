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
exports.getPrestazionePerDottore = exports.cancellaDottore = exports.updateDoctors = exports.createDoctors = exports.cancellaPrestazione = exports.updatePrestazione = exports.createPrestazione = void 0;
const db_1 = require("../utils/db");
const auth_1 = require("../utils/auth");
const createPrestazione = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Verifica che l'utente abbia effettuato il login
    const user = (0, auth_1.decodeAccessToken)(req, res);
    if (!user) {
        res.status(403).send("Questa operazione richiede l'autenticazione.");
        return;
    }
    const conn = yield (0, db_1.getConnection)();
    yield conn.execute("INSERT INTO prestazione (titolo, costo) VALUES (?, ?)", [
        req.body.titolo,
        req.body.costo,
    ]);
    res.json({ success: true, message: "Prestazione effettuata con successo" });
});
exports.createPrestazione = createPrestazione;
const updatePrestazione = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Verifica che l'utente abbia effettuato il login
    const user = (0, auth_1.decodeAccessToken)(req, res);
    if (!user) {
        res.status(403).send("Questa operazione richiede l'autenticazione.");
        return;
    }
    const conn = yield (0, db_1.getConnection)();
    yield conn.execute("UPDATE prestazione SET costo=? WHERE req.body.id = prestazione.id", [
        req.body.costo,
    ]);
    res.json({ success: true, message: "Aggiornamento effettuato con successo" });
});
exports.updatePrestazione = updatePrestazione;
const cancellaPrestazione = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Verifica che l'utente abbia effettuato il login
    const user = (0, auth_1.decodeAccessToken)(req, res);
    if (!user) {
        res.status(403).send("Questa operazione richiede l'autenticazione.");
        return;
    }
    const conn = yield (0, db_1.getConnection)();
    yield conn.execute("DELETE FROM prestazione WHERE req.body.id = prestazione.id");
    res.json({ success: true, message: "La prestazione è stata cancellata con successo" });
});
exports.cancellaPrestazione = cancellaPrestazione;
const createDoctors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Verifica che l'utente abbia effettuato il login
    const user = (0, auth_1.decodeAccessToken)(req, res);
    if (!user) {
        res.status(403).send("Questa operazione richiede l'autenticazione.");
        return;
    }
    const conn = yield (0, db_1.getConnection)();
    yield conn.execute("INSERT INTO doctors (id_doctor, doth_name, doth_surname, password, prestazione1, prestazione2, prestazione3) VALUES (?, ?, ?, ?, ?, ?, ?)", [
        req.body.id_doctor,
        req.body.doth_name,
        req.body.doth_surname,
        req.body.password,
        req.body.prestazione1,
        req.body.prestazione2,
        req.body.prestazione3,
    ]);
    res.json({ success: true, message: "Dottore aggiunto con successo successo" });
});
exports.createDoctors = createDoctors;
const updateDoctors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Verifica che l'utente abbia effettuato il login
    const user = (0, auth_1.decodeAccessToken)(req, res);
    if (!user) {
        res.status(403).send("Questa operazione richiede l'autenticazione.");
        return;
    }
    const conn = yield (0, db_1.getConnection)();
    yield conn.execute("UPDATE doctors SET prestazione1=?, prestazione2=?, prestazione3=? WHERE req.body.id_doctor = doctors.id_doctor", [
        req.body.prestazione1,
        req.body.prestazione2,
        req.body.prestazione3,
    ]);
    res.json({ success: true, message: "Aggiornamento effettuato con successo" });
});
exports.updateDoctors = updateDoctors;
const cancellaDottore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Verifica che l'utente abbia effettuato il login
    const user = (0, auth_1.decodeAccessToken)(req, res);
    if (!user) {
        res.status(403).send("Questa operazione richiede l'autenticazione.");
        return;
    }
    const conn = yield (0, db_1.getConnection)();
    yield conn.execute("DELETE FROM doctors WHERE req.body.id_doctor = doctors.id_doctor");
    res.json({ success: true, message: "Il dottore è stata cancellato con successo" });
});
exports.cancellaDottore = cancellaDottore;
const getPrestazionePerDottore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const conn = yield (0, db_1.getConnection)();
    const [booking] = yield conn.execute("SELECT booking.id as id, booking.id_prestazione, doctors.doth_name, doctors.doth_surname, booking.data_prenotazione, booking.ora_prenotazione FROM booking LEFT OUTER JOIN doctors ON booking.id_doctor=doctors.id_doctor WHERE id_doctor=req.body.id_doctor ORDER BY booking.data_prenotazione, booking.ora_prenotazione DESC");
    res.json(booking);
});
exports.getPrestazionePerDottore = getPrestazionePerDottore;
