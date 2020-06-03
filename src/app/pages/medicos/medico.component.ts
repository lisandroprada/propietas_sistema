import { ModaluploadService } from './../../components/modal-upload/modalupload.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HospitalService } from './../../services/hospital/hospital.service';
import { MedicoService } from './../../services/medico/medico.service';
import { Hospital } from '../../models/hospital.model';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico ('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(public _medicoService: MedicoService,
              public _hospitalService: HospitalService,
              public router: Router,
              public activatedRoute: ActivatedRoute,
              public _modalUploadService: ModaluploadService) {

                activatedRoute.params.subscribe( params => {
                  let id = params['id'];
                  if ( id !== 'nuevo') {
                    this.cargarMedico(id);
                  }
                });
               }

  ngOnInit(): void {
    this._hospitalService.cargarHospitales(0)
    .subscribe( hospitales => this.hospitales = hospitales);
    this._modalUploadService.notificacion
    .subscribe( resp => {
      this.medico.img = resp.medico.img;
    } );
  }
  guardarMedico(f: NgForm) {


    if (f.invalid) {
      return;
    }
    this._medicoService.guardarMedico(this.medico)
    .subscribe( (medico: any) => {
      this.medico._id = medico._id;
      this.router.navigate(['/medico', medico._id]);
    } );
  }

  cambioHospital(id) {

    this._hospitalService.obtenerHospital(id).
    subscribe( hospital => {
      this.hospital = hospital;
    });
  }

  cargarMedico(id: string){
    this._medicoService.cargarMedico(id)
    .subscribe( medico => {
      this.medico = medico;
      this.medico.hospital = medico.hospital._id;
      this.cambioHospital(this.medico.hospital);
    });
  }

  cambiarFoto() {
    this._modalUploadService.mostrarModal('medicos', this.medico._id);
  }

}
