import { UsuarioService } from './../usuario/usuario.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  totalHospitales: number = 0;

  constructor( public http: HttpClient,
               public _usuarioService: UsuarioService ) { }

  cargarHospitales(desde: number) {
    let url  = URL_SERVICIOS + '/hospital?desde=' + desde;
    return this.http.get(url)
    .pipe( map( (resp: any) => {
      this.totalHospitales = resp.total;
      return resp.hospitales;
    }));
  }

  obtenerHospital( id: string){
    let url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get(url)
    .pipe(map ((resp: any) => {
      return resp.hospital;
    }));
  }

  borrarHospital( id: string) {
    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete(url)
    .pipe( map ((resp: any) => {
      Swal.fire({
        title: 'Hospital borrado',
        text: 'Eliminado correctamente',
        icon: 'success'
      });
    }));
  }

  buscarHospital( termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get(url)
    .pipe(map( ( resp: any )  => resp.hospitales
    ));

  }

  crearHospital( nombre: string) {
    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this._usuarioService.token;
    return this.http.post(url, {nombre})
    .pipe( map((resp: any) => {
      return resp.hospital;
    }));
  }

  actualizarHospital( hospital: Hospital) {
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put(url, hospital)
    .pipe( map ((resp: any) => {
      return resp.hospital;
    }));
  }
}



