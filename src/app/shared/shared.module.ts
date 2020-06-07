import { PipesModule } from './../pipes/pipes.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';

@NgModule({
imports: [
    RouterModule,
    CommonModule,
    PipesModule
],
declarations: [
    BreadcrumbsComponent,
    HeaderComponent,
    SidebarComponent,
    NopagefoundComponent,
    ModalUploadComponent
],
exports: [
    BreadcrumbsComponent,
    HeaderComponent,
    SidebarComponent,
    NopagefoundComponent,
    ModalUploadComponent
]
})

export class SharedModule { }
