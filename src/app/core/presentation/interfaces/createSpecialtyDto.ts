export interface CreateSpecialtyDto {
    nombre:               string;
    descripcion:          string;
    costo:                number;
    disponibilidad_dias:  string[];
    disponibilidad_horas: string[];
}
