export interface CreateUserWithPersonDto{
    nombres: string;
    apellidos: string;
    genero?: string;
    documento_tipo?: string;
    documento_numero?: number;
    fecha_nacimiento?: string;
    direccion_completa?: string;
    numero_telefono?: number;
    ciudad?: string;
    pais?: string;
    correo_electronico: string;
    contraseña: string;
    roles?: string[];
}