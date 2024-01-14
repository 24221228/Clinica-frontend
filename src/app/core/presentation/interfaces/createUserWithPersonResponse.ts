import { Person } from "./login.interface";

export interface CreateUserWithPersonResponse {
    correo_electronico: string;
    contraseña:         string;
    id:                 number;
    estatus:            boolean;
    roles:              string[];
    person?:            Person;
}
