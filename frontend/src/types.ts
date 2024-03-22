export interface User {
  id_user: string;
  user_name: string;
  user_surname: string;
  email_address: string;
  role: "admin" | "user"
}

export interface Prestazione {
  id: number;
  titolo: string;
  costo: number;
  created_at: string;
  updated_at: string;
}

export interface Doctors {
  id: number;
  id_doctor: number;
  doth_name: string;
  doth_surname: string;
  prestazione1: number;
  prestazione2: number;
  prestazione3: number;
}

export interface Booking {
  id: number;
  id_user: string;
  id_doctor: number;
  id_prestazione: number;
  data_prenotazione: string;
  ora_prenotazione: number;
}