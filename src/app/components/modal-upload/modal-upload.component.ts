import { ModaluploadService } from './modalupload.service';
import { SubirArchivoService } from './../../services/subir-archivo/subir-archivo.service';
import { UsuarioService } from './../../services/usuario/usuario.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: [
  ]
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: string;

  constructor( public _subirArchivoService: SubirArchivoService,
               public _modalUploadService: ModaluploadService) {
   }

   ngOnInit(): void {
  }

  seleccionImage( archivo: File ){
    if (!archivo){
      return;
    }

    if (archivo.type.indexOf('image') < 0) {
      Swal.fire({
        title: 'Solo imágenes',
        text: 'El archivo seleccionado no es una imagen',
        icon: 'error'
      });
      this.imagenSubir = null;
      return;
    }


    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );
    reader.onloadend = () => this.imagenTemp = reader.result.toString();

  }

  subirimagen() {
    console.log('Subiendo imagen');
    this._subirArchivoService.subirArchivo(this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)
    .then( resp => {
      this._modalUploadService.notificacion.emit(resp);
      this.cerrarModal();

    }).
    catch( err => {
      console.log('Error en la carga');
    });
  }

  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;
    this._modalUploadService.ocultarModal();
  }
}
