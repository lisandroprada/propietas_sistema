import { ModaluploadService } from './../../components/modal-upload/modalupload.service';
import { MedicoService } from './../../services/medico/medico.service';
import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit {
  medicos: Medico[] = [];
  desde: number = 0;
  totalRegistros: number = 0;

  constructor( public _medicoService: MedicoService,
               public _modalUploadService: ModaluploadService ) { }

  ngOnInit(): void {
    this.cargarMedicos();
  }

  buscarMedicos( termino: string) {
    if ( termino.length <= 0 ) {
      this.cargarMedicos();
      return;
    }
    this._medicoService.buscarMedico(termino).subscribe( medicos => this.medicos = medicos);
  }

  cargarMedicos() {
    this._medicoService.cargarMedicos(this.desde)
    .subscribe( medicos => {
      this.medicos = medicos;
      this.totalRegistros = this._medicoService.totalMedicos;
    });
  }

  actualizarImagen( medico: Medico ){
    this._modalUploadService.mostrarModal('medicos', medico._id);
  }

  editarMedico(medico: Medico){}

  borrarMedico(medico: Medico){
    this._medicoService.borrarMedico(medico._id).subscribe( () => {
      this.cargarMedicos();
    });
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
    this.cargarMedicos();
  }

  crearMedico() {}

}
