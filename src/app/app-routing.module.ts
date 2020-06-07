import { LoginGuardGuard } from './services/guards/login-guard.guard';
import { PagesComponent } from './pages/pages.component';
import { Routes, RouterModule } from '@angular/router';
// import { NgModule } from '@angular/core';

import { RegisterComponent } from './login/register.component';
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';


const routes: Routes = [

  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: '',
    component: PagesComponent,
    canActivate: [LoginGuardGuard],
    loadChildren: './pages/pages.module#PagesModule'
  },
  {path: '**', component:  NopagefoundComponent},
];

// @NgModule({
//   imports: [RouterModule.forRoot(routes, { useHash: true })],
//   exports: [RouterModule]
// })
export const APP_ROUTES = RouterModule.forRoot( routes, { useHash: true });

