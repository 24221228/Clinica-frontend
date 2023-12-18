import { HeaderItem } from "../models/header.item";

export const headerItems: Record<string, HeaderItem[]> = {
    citas: [
        { label: 'Id'},
        { label: 'Paciente'},
        { label: 'Servicio'},
        { label: 'Fecha'},
        { label: 'Hora'},
    ],
    pacientes: [
        { label: 'Id'},
        { label: 'Nombres'},
        { label: 'Apellidos'},
        { label: 'Servicio'}
    ],
    especialistas: [
        { label: 'Id'},
        { label: 'Nombres'},
        { label: 'Apellidos'},
        { label: 'Especialidad'},
        { label: 'Cargo'},
    ],
    usuarios: [
        { label: 'Id'},
        { label: 'Nombres'},
        { label: 'Apellidos'},
        { label: 'Documento'},
        { label: 'Dirección'},
        { label: 'Telefono'}
    ]
  };
  