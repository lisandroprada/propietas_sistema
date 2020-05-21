import { PAGES_ROUTES } from './pages.routes';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from './../shared/shared.module';

import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { IncrementadorComponent } from './../components/incrementador/incrementador.component';
import { Graficas1Component } from './graficas1/graficas1.component';

import { ChartsModule } from 'ng2-charts';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

@NgModule({
 declarations: [
    DashboardComponent,
    ProgressComponent,
    PagesComponent,
    IncrementadorComponent,
    Graficas1Component,
    GraficoDonaComponent,
    AccountSettingsComponent
 ],
 exports: [
     DashboardComponent,
     ProgressComponent,
     Graficas1Component,
     PagesComponent
 ],
 imports: [
     SharedModule,
     PAGES_ROUTES,
     FormsModule,
     ChartsModule
 ]
})

export class PagesModule { }
