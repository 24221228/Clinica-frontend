export interface UpdateUserDto{
    id?: number;
    correo_electronico?: string;
    contraseña?: string;
    estatus?: boolean;
    roles?: string[];
}