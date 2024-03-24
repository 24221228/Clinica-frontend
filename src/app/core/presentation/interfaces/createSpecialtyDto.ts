export interface CreateSpecialtyDto {
    nombre:               string;
    descripcion:          string;
    costo:                number;
    idSede:               number;
    disponibilidad_dias:  string[];
    disponibilidad_horas: DisponibilidadHora[];
}


export interface DisponibilidadHora {
    id: number;
    dia: string;
    hora_inicio: string;
    hora_final: string;
}