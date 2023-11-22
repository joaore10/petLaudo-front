import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamado';
import { Laudo } from 'src/app/models/laudo';
import { ChamadoService } from 'src/app/services/chamado.service';
import { LaudoService } from 'src/app/services/laudo.service';
import { DialogContentDialog } from '../laudo-create/laudo-create.component';

@Component({
  selector: 'app-laudo-read',
  templateUrl: './laudo-read.component.html',
  styleUrls: ['./laudo-read.component.scss']
})
export class LaudoReadComponent implements OnInit {

  
  laudo: Laudo = {
    id: '', 
    projecoes: '',
    achadosRadiograficos: '',
    impressoesDiagnosticas: '',
    chamadoId: '',
    dataCriacao: ''
  }

  chamados: Chamado[] = [];
  chamado: any = {};

  disableChamadoSelect = false;

  chamadoId: FormControl = new FormControl(null, [Validators.required]);

  constructor( private chamadoService: ChamadoService, private laudoService: LaudoService,
    public dialog: MatDialog, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.laudo.id = this.route.snapshot.paramMap.get('id');
    if(this.laudo.id){
      this.findLaudoById();
    }
    this.findAllChamados();
  }

  findAllChamados(): void {
    this.chamadoService.findAll().subscribe(res => {
      this.chamados = res;
    })
  }

  findLaudoById(): void{
    this.laudoService.findById(this.laudo.id).subscribe(res => {
      this.laudo = res;
      this.selectChamado(this.laudo.chamadoId);
      this.laudo.chamadoId = this.laudo.chamadoId.toString();
      this.disableChamadoSelect = true;
    })
  }

  selectChamado(chamado: number): void{
    console.log(chamado);
    this.chamadoService.findById(chamado).subscribe(res => {
      this.chamado = res;
    })
  }

  ampliarImagem(imgSrc: any) {
    const dialogRef = this.dialog.open(DialogContentDialog, {
      data: {
        src: imgSrc
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

