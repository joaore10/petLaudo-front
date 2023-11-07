import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamado';
import { ChamadoService } from 'src/app/services/chamado.service';


@Component({
  selector: 'app-chamado-read',
  templateUrl: './chamado-read.component.html',
  styleUrls: ['./chamado-read.component.scss']
})
export class ChamadoReadComponent implements OnInit {

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

  
  constructor( private chamadoService: ChamadoService, private toastService: ToastrService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.chamado.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }


  findById():void{
    this.chamadoService.findById(this.chamado.id).subscribe(res => {
      console.log(res)
      this.chamado = res;
      this.chamado.prioridade = this.chamado.prioridade.toString();
    })
  }
}
