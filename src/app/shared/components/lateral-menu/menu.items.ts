import { MenuItem } from "./models/menu-item";

export const menuItems: Record<string, MenuItem[]> = {
    superadmin: [
      { label: 'Dashboard', link: '/dashboard', icon: 'bi bi-house-door'},
      { label: 'Registrar usuario', link: '/registrar-usuario', icon: 'bi bi-person-plus' },
      { label: 'Registrar especialidad', link: '/registrar-especialidad', icon: 'bi bi-person-plus' },
      { label: 'Registros', link: '/registro', icon: 'bi bi-file-earmark-text' },
      { label: 'Reportes', link: '/reporte', icon: 'bi bi-bar-chart' },
      { label: 'Permisos', link: '/permisos', icon: 'bi bi-person-fill-gear' },
      { label: 'Perfil', link: '/perfil', icon: 'bi bi-person-circle' },
      { label: 'Cerrar Sesión', link: '', icon: 'bi bi-door-open' }
    ],
    admin: [
      { label: 'Dashboard', link: '/dashboard', icon: 'bi bi-house-door' },
      { label: 'Registros', link: '/registro', icon: 'bi bi-file-earmark-text' },
      { label: 'Reportes', link: '/reporte', icon: 'bi bi-bar-chart' },
      { label: 'Perfil', link: '/perfil', icon: 'bi bi-person-circle' },
      { label: 'Cerrar Sesión', link: '', icon: 'bi bi-door-open' },
    ],
    especialista: [
      { label: 'Dashboard', link: '/dashboard', icon: 'bi bi-house-door' },
      { label: 'Ver Citas', link: '/ver-citas', icon: '' },
      { label: 'Registros', link: '/registro', icon: 'bi bi-file-earmark-text' },
      { label: 'Perfil', link: '/perfil', icon: 'bi bi-person-circle' },
      { label: 'Cerrar Sesión', link: '', icon: 'bi bi-door-open' },
    ],
    paciente: [
      { label: 'Dashboard', link: '/dashboard', icon: 'bi bi-house-door' },
      { label: 'Registrar Paciente', link: '/registrar-paciente', icon: 'bi bi-person-add' },
      { label: 'Registrar Cita', link: '/registrar-cita', icon: 'bi bi-person-add' },
      { label: 'Registros', link: '/registro', icon: 'bi bi-file-earmark-text' },
      { label: 'Perfil', link: '/perfil', icon: 'bi bi-person-circle' },
      { label: 'Cerrar Sesión', link: '', icon: 'bi bi-door-open' }
    ],
    user: []
  };
  