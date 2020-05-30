import { SidebarService, UsuarioService } from './../../services/service.index';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  constructor(public _sidebar: SidebarService,
              public _usuarioService: UsuarioService) { }

  ngOnInit(): void {
  }

}
