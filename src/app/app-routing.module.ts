import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
    data: { 'routeName': 'Dashboard' },
    canActivate: [AuthGuard]
  },
  {
    path: 'create-user',
    loadChildren: () => import('./modules/create-user/create-user.module').then(m => m.CreateUserModule),
    data: { 'routeName': 'Crear usuario' },
    canActivate: [AuthGuard]
  },
  {
    path: 'registrar-usuario',
    loadChildren: () => import('./modules/register-user/register-user.module').then(m => m.RegisterUserModule),
    data: { 'routeName': 'Registrar Usuario' },
    canActivate: [AuthGuard]
  },
  { 
    path: 'registrar-cita',
    loadChildren: () => import('./modules/register-appointment/register-appointment.module').then(m => m.RegisterAppointmentModule),
    data: { 'routeName': 'Registrar Cita' },
    canActivate: [AuthGuard]
  },
  {
    path: 'registrar-paciente',
    loadChildren: () => import('./modules/register-patient/register-patient.module').then(m => m.RegisterPatientModule),
    data: { 'routeName': 'Registrar Paciente' },
    canActivate: [AuthGuard]
  },
  {
    path: 'registrar-especialidad',
    loadChildren: () => import('./modules/register-specialty/register-specialty.module').then(m => m.RegisterSpecialtyModule),
    data: { 'routeName': 'Registrar Especialidad' },
    canActivate: [AuthGuard]
  },
  {
    path: 'perfil',
    loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule),
    data: { 'routeName': 'Perfil' },
    canActivate: [AuthGuard]
  },
  {
    path: 'registro',
    loadChildren: () => import('./modules/records/records.module').then(m => m.RecordsModule),
    data: { 'routeName': 'Registro' },
    canActivate: [AuthGuard]
  },
  {
    path: 'reporte',
    loadChildren: () => import('./modules/reports/reports.module').then(m => m.ReportsModule),
    data: { 'routeName': 'Reporte' },
    canActivate: [AuthGuard]
  },
  {
    path: 'configuracion',
    loadChildren: () => import('./modules/setting/setting.module').then(m => m.SettingModule),
    data: { 'routeName': 'Configuración' },
    canActivate: [AuthGuard]
  },
  {
    path: 'permisos',
    loadChildren: () => import('./modules/permissions/permissions.module').then(m => m.PermissionsModule),
    data: { 'routeName': 'Permisos' },
    canActivate: [AuthGuard]
  },
  {
    path: 'recuperar-contraseña',
    loadChildren: () => import('./modules/recover-account/recover-account.module').then(m => m.RecoverAccountModule)
  },
  {
    path: 'update-password',
    loadChildren: () => import('./modules/update-password/update-password.module').then(m => m.UpdatePasswordModule)
  },
  {
    path: 'citas',
    loadChildren: () => import('./modules/quotes/quotes.module').then(m => m.QuotesModule),
    data: { 'routeName': 'Citas' },
    canActivate: [AuthGuard]
  },
  {
    path: 'seguridad',
    loadChildren: () => import('./modules/security/security.module').then(m => m.SecurityModule),
    data: { 'routeName': 'Seguridad' },
    canActivate: [AuthGuard]
  },
  {
    path: 'error',
    loadChildren: () => import('./modules/error/error.module').then(m => m.ErrorModule)
  },
  {
    path: '',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/error'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
