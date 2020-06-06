import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Hospital } from 'src/app/models/hospital.model';
import { Usuario } from 'src/app/models/usuario.model';
import { Medico } from 'src/app/models/medico.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  hospitales: Hospital[] = [];
  usuarios: Usuario[] = [];
  medicos: Medico[] = [];


  constructor(public activatedRoute: ActivatedRoute,
              public http: HttpClient) {
    activatedRoute.params
    .subscribe( params => {
      let termino = params.termino;
      this.buscar(termino);
    });
  }

  ngOnInit(): void {
  }

  buscar(termino) {
    let url = URL_SERVICIOS + '/busqueda/todo/' + termino;
    this.http.get(url)
    .subscribe( (resp: any) => {
      console.log(resp);
      this.hospitales = resp.hospitales;
      this.medicos = resp.medicos;
      this.usuarios = resp.usuarios;
    });
  }

}
