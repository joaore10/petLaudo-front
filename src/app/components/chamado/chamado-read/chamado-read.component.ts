import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamado';
import { ChamadoService } from 'src/app/services/chamado.service';
import { DialogContentDialog } from '../../laudo/laudo-create/laudo-create.component';


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

  
  constructor( private chamadoService: ChamadoService, private toastService: ToastrService, private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.chamado.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }


  findById():void{
    this.chamadoService.findById(this.chamado.id).subscribe(res => {
      this.chamado = res;
      this.chamado.prioridade = this.chamado.prioridade.toString();
    })
  }

  ampliarImagem(imgSrc: any) {
    const dialogRef = this.dialog.open(DialogContentDialog, {
      data: {
        src: imgSrc
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog Closed`);
    });
  }


}
