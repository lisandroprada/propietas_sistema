import { Medico } from './../../models/medico.model';
import { UsuarioService } from './../usuario/usuario.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: number = 0;

  constructor( public http: HttpClient,
               public _usuarioService: UsuarioService) { }

  cargarMedicos(desde: number = 0) {
    console.log('medico service: desde ' + desde );
    let url  = URL_SERVICIOS + '/medico?desde=' + desde;
    return this.http.get(url)
    .pipe( map( (resp: any) => {
      // console.log(resp.medicos);
      this.totalMedicos = resp.total;
      return resp.medicos;
    }));
  }


  // cargarUsuarios(desde: number = 0, ) {
  //   let url  = URL_SERVICIOS + '/usuario?desde=' + desde;
  //   return this.http.get(url);
  // }



  buscarMedico(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
    return this.http.get(url)
    .pipe(map( ( resp: any )  => resp.medicos
    ));
  }

  borrarMedico( id: string ) {
    let url = URL_SERVICIOS + '/medico/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete(url)
    .pipe( map ((resp: any) => {
      Swal.fire({
        title: 'Médico borrado',
        text: 'Eliminado correctamente',
        icon: 'success'
      });
      return resp;
    }));
  }

  guardarMedico( medico: Medico) {
    let url = URL_SERVICIOS + '/medico';

    if ( medico._id) {
      url += '/' + medico._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put(url, medico)
      .pipe(map ((resp: any) => {
        Swal.fire({
          title: 'Médico actualizado',
          text: medico.nombre,
          icon: 'success'
        });
        return resp.medico;
      }));


    } else {
      url += '?token=' + this._usuarioService.token;
      return this.http.post(url, medico)
      .pipe(map ((resp: any) => {
        Swal.fire({
          title: 'Médico creado',
          text: medico.nombre,
          icon: 'success'
        });
        return resp.medico;
      }));
    }


  }

  cargarMedico(id: string) {
    let url = URL_SERVICIOS + '/medico/' + id;
    return this.http.get( url )
    .pipe(map ((resp: any) => {
      return resp.medico;
    }));
  }

}
