INSERT INTO users (id_user, user_name, user_surname, password, email_address, role)
    VALUES ('MAISNF15F15X654X', 'Ciccio', 'Bello', '123abc456', 'ciccio.bello@yahoo.com', 'user'),
           ('kajsor15r14e897t', 'Claudio', 'Bianchi', 'bianchi', 'claudio.bianchi@gmail.com', 'user'),
           ('prssra69t69v111v', 'Persona', 'Seria', 'admin', 'persona.seria@gmail.com', 'admin'),
           ('prvttt99b99p999t', 'Prova', 'Tutte', '123456', 'prova.tutte#yahoo.com.br', 'user'),
           ('jhntrv25t46t205t', 'Johnn', 'Travolta', '999', 'travolta.jhonn@yahoo.com.us', 'user');

INSERT INTO `doctors` (id_doctor, doth_name, doth_surname, password, prestazione1, prestazione2, prestazione3)
    VALUES (4456, 'Gregory', 'House', '123456', 1, NULL, NULL),
           (4922, 'James', 'Wilson', '155986', 3, 2, NULL),
           (4532, 'Lisa', 'Cudy', '199199', 1, 2, NULL),
           (5814, 'Alisson', 'Cameron', '119999', 4, 2, NULL);

INSERT INTO prestazione (titolo, costo)
    VALUES ('Cardiologia', 100),
           ('Pediatria', 80),
           ('Oncologia', 120),
           ('Radiografia', 50);

INSERT INTO booking (id_user, id_doctor, id_prestazione, data_prenotazione, ora_prenotazione)
    VALUES ('MAISNF15F15X654X', 4922, 2, '2024-02-26', 8),
           ('MAISNF15F15X654X', 4532, 1, '2024-03-02', 10),
           ('prvttt99b99p999t', 5814, 4, '2024-02-16', 18);