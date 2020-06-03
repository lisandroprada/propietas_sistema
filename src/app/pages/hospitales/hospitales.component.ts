import { ModaluploadService } from './../../components/modal-upload/modalupload.service';
import { HospitalService } from './../../services/service.index';
import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  cargando: boolean = true;
  desde: number = 0;
  totalRegistros: number;

  hospitales: Hospital[] = [];

  constructor( public _hospitalService: HospitalService,
               public _modalUploadService: ModaluploadService) { }

  ngOnInit(): void {
    this.cargarHospitales();
    this._modalUploadService.notificacion
    .subscribe( () => {
      this.cargarHospitales();
    });
  }

  buscarHospital(termino: string) {
    if ( termino.length <= 0 ) {
      this.cargarHospitales();
      return;
    }
    this._hospitalService.buscarHospital(termino).subscribe( hospitales => this.hospitales = hospitales);
  }


  cargarHospitales() {
    this.cargando = true;
    this._hospitalService.cargarHospitales(this.desde).subscribe(
      hospitales => this.hospitales = hospitales
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
    this.cargarHospitales();
  }

  guardarhospital(hospital: Hospital)  {
    this._hospitalService.actualizarHospital(hospital)
    .subscribe( () => {
      Swal.fire({
        title: 'Hospital actualizado',
        text: 'Actualizado correctamente',
        icon: 'success'
      });
    });
  }

  borrarhospital(hospital: Hospital) {
    this._hospitalService.borrarHospital(hospital._id)
    .subscribe( () => this.cargarHospitales());
  }


  async crearHospital() {
    const { value: text } = await Swal.fire({
      input: 'text',
      inputPlaceholder: 'Ingrese el nombre del hospital',
      inputAttributes: {
        'aria-label': 'Ingrese el nombre aquí'
      },
      showCancelButton: true
    });

    if (text) {
      Swal.fire(text);
      const nombre: string = String(text);
      this._hospitalService.crearHospital(nombre).subscribe();
    }
    this.cargarHospitales();
  }


  actualizarImagen( hospital: Hospital ){
    this._modalUploadService.mostrarModal('hospitales', hospital._id);
  }



}
