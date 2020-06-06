import { AdminGuard } from './../services/guards/admin.guard';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { MedicosComponent } from './medicos/medicos.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProfileComponent } from './profile/profile.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PromesasComponent } from './promesas/promesas.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';

import { LoginGuardGuard } from '../services/service.index';
import { MedicoComponent } from './medicos/medico.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard ],
        children: [
                    {path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'}},
                    {path: 'progress', component: ProgressComponent, data: {titulo: 'Progress'}},
                    {path: 'graficas1', component: Graficas1Component, data: {titulo: 'Graficas'}},
                    {path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}},
                    {path: 'rxjs', component: RxjsComponent, data: {titulo: 'Rxjs'}},
                    {path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Ajustes'}},
                    {path: 'profile', component: ProfileComponent, data: {titulo: 'Perfil de usuario'}},
                    {path: 'busqueda/:termino', component: BusquedaComponent, data: {titulo: 'Buscador'}},
                    // Mantenimientos
                    {path: 'usuarios',
                     component: UsuariosComponent,
                     canActivate: [ AdminGuard ],
                     data: {titulo: 'Mantenimiento de Usuarios'}},

                    {path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Mantenimiento de Hospitales'}},
                    {path: 'medicos', component: MedicosComponent, data: {titulo: 'Mantenimiento de Médicos'}},
                    {path: 'medico/:id', component: MedicoComponent, data: {titulo: 'Actualizar Médico'}},
                    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
        ]
      }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
