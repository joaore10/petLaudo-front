import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamado';
import { ChamadoService } from 'src/app/services/chamado.service';
import * as moment from 'moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';


export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-chamado-create',
  templateUrl: './chamado-create.component.html',
  styleUrls: ['./chamado-create.component.scss'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-br'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class ChamadoCreateComponent implements OnInit {

  chamado: Chamado = {
    id: '',
    dataAbertura: '',
    dataFechamento: '',
    prioridade: '',
    status: '',
    observacoes: '',
    tecnico: '',
    clinica: '',
    nomeTecnico: '',
    nomeClinica: '',
    dataNascimento: '',
    dataEstudo: '',
    idade: '',
    sexo: '',
    raca: '',
    especie: '',
    responsavelPaciente: '',
    medicoRequerente: '',
    nomePaciente: '',
    crmv: '',
    regiaoExame: '',
    laudo: '',
    imagens: []
  }

  imagens: File[] = [];

  nomePaciente: FormControl = new FormControl(null, [Validators.required]);
  dataNascimento: FormControl = new FormControl(moment(), [Validators.required]);
  dataEstudo: FormControl = new FormControl(moment(), [Validators.required]);
  idade: FormControl = new FormControl(null, [Validators.required]);
  sexo: FormControl = new FormControl(null, [Validators.required]);
  raca: FormControl = new FormControl(null, [Validators.required]);
  especie: FormControl = new FormControl(null, [Validators.required]);
  responsavelPaciente: FormControl = new FormControl(null, [Validators.required]);
  medicoRequerente: FormControl = new FormControl(null, [Validators.required]);
  crmv: FormControl = new FormControl(null, [Validators.required]);
  regiaoExame: FormControl = new FormControl(null, [Validators.required]);
  prioridade: FormControl = new FormControl(null, [Validators.required]);
  observacoes: FormControl = new FormControl(null, [Validators.required]);
  
  
  constructor( private chamadoService: ChamadoService, private toastService: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    // this.findAllClientes();
    // this.findAllTecnicos();
  }

  create(): void{
    this.chamado.clinica = 5;
    this.chamado.tecnico = 2;
    this.chamado.status = 0;

    this.chamado.dataNascimento = this.toBrDateString(new Date(this.chamado.dataNascimento));
    this.chamado.dataEstudo = this.toBrDateString(new Date(this.chamado.dataEstudo));


    const formData = new FormData();
    formData.append('obj', new Blob([JSON.stringify(this.chamado)], { type: 'application/json' })); // Converte o objeto para JSON

    for (let i = 0; i < this.imagens.length; i++) {
      formData.append('files', this.imagens[i]);
    }

    this.chamadoService.create(formData).subscribe(res =>{
      this.toastService.success('Criado chamado com sucesso', 'Novo Chamado');
      this.router.navigate(['chamados']);
    }, ex => {
      this.toastService.error(ex.error.error);
    })
  }

  onFileChange(event: any) {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.imagens.push(files.item(i));
    }
  }


  toBrDateString(date: Date){
    const dateString = date.toLocaleString('pt-BR', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }).toString();

    return dateString;
  }

  deletaImagem(nameImagem: any, listaImagens:any){
    var foundIndex = listaImagens.indexOf(nameImagem);
    if(foundIndex > -1){
      listaImagens.splice(foundIndex, 1);
    }
  }

  // findAllClientes(): void {
  //   this.clienteService.findAll().subscribe(res => {
  //     this.clientes = res;
  //   })
  // }

  // findAllTecnicos(): void {
  //   this.tecnicoService.findAll().subscribe(res => {
  //     this.tecnicos = res;
  //   })
  // }

  validaCampos(): boolean {
    return this.prioridade.valid &&  this.observacoes.valid;
  }

}
