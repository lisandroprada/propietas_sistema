import { ModaluploadService } from './../../components/modal-upload/modalupload.service';
import { Usuario } from './../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;

  cargando: boolean = true;

  constructor( public _usuarioService: UsuarioService,
               public _modalUploadService: ModaluploadService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
    this._modalUploadService.notificacion
    .subscribe( resp => {
      this.cargarUsuarios();
    });
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('usuarios', id);
  }

  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService.cargarUsuarios(this.desde).subscribe(
      (resp: any) => {
        console.log(resp);
        this.totalRegistros = resp.total;
        this.usuarios = resp.usuarios;
        this.cargando = false;
      }
    );
  }

  cambiarDesde(valor: number) {
    let desde = this.desde + valor;
    console.log(desde);

    if (desde >= this.totalRegistros){
      return;
    }
    if (desde < 0){
      return;
    }
    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario(termino: string) {
    if ( termino.length <= 0 ) {
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
    this._usuarioService.buscarUsuarios(termino)
    .subscribe(( usuarios: Usuario[]) => {
      this.usuarios = usuarios;
      this.cargando = false;
    });

  }

  borrarUsuario(usuario: Usuario) {
    console.log(usuario);
    if ( usuario._id === this._usuarioService.usuario._id) {
      Swal.fire({
        title: 'No se puede borrar usuario',
        text: 'No se puede borrar a si mismo',
        icon: 'error'
      });
      return;
    }

    Swal.fire({
      title: 'Está seguro?',
      text: 'Está a pundo de borrar a ' + usuario.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(borrar => {
      if (borrar.value) {
        this._usuarioService.borrarUsuario(usuario._id).subscribe( borrado => {
          console.log(borrado);
          Swal.fire(
            'Borrado!',
            'El usuario ' +  ' ha sido borrado del sistema',
            'success'
          );
          this.cargarUsuarios();
        });

      }
    });
  }

  guardarUsuario(usuario: Usuario) {
    this._usuarioService.actualizarUsuario(usuario).subscribe();
  }
}
