import { PAGES_ROUTES } from './pages.routes';
import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';

import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';

@NgModule({
 declarations: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    PagesComponent
 ],
 exports: [
     DashboardComponent,
     ProgressComponent,
     Graficas1Component,
     PagesComponent
 ],
 imports: [
     SharedModule,
     PAGES_ROUTES
 ]
})

export class PagesModule { }

