export interface Login{
    id: number;
    correo_electronico: string;
    contraseña: string;
    token: string;
    person: Person
}

export interface ErrorLogin{
    status: number;
    error: Error
}

export interface Error{
    statusCode: number;
    message: string;
    error: string;
}

export interface Person{
    id: number,
    nombres: string,
    apellidos: string,
    genero: string,
    documento_tipo: string,
    documento_numero: number,
    fecha_nacimiento: string,
    direccion_completa: string,
    ciudad: string,
    pais: string,
    numero_telefono: string
}