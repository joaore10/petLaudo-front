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
  selector: 'app-laudo-update',
  templateUrl: './laudo-update.component.html',
  styleUrls: ['./laudo-update.component.scss']
})
export class LaudoUpdateComponent implements OnInit {

 
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
  projecoes: FormControl = new FormControl(null, [Validators.required]);
  achadosRadiograficos: FormControl = new FormControl(null, [Validators.required]);
  impressoesDiagnosticas: FormControl = new FormControl(null, [Validators.required]);
  chamadoId: FormControl = new FormControl(null, [Validators.required]);

  constructor( private chamadoService: ChamadoService, private laudoService: LaudoService, private toastService: ToastrService,
    private router: Router, public dialog: MatDialog, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.laudo.id = this.route.snapshot.paramMap.get('id');
    if(this.laudo.id){
      this.findLaudoById();
    }
    this.findAllChamados();
  }

  update(): void{
    this.laudoService.update(this.laudo).subscribe(res =>{
      this.toastService.success('Laudo editado com sucesso', 'Editar Laudo');
      this.router.navigate(['laudos']);
    }, ex => {
      this.toastService.error(ex.error.error);
    })
  }

  findAllChamados(): void {
    this.chamadoService.findAll().subscribe(res => {
      this.chamados = res;
    })
  }

  findLaudoById(): void{
    this.laudoService.findById(this.laudo.id).subscribe(res => {
      this.laudo = res;
      //busca as infos do chamado
      console.log(this.laudo.chamadoId);
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

  validaCampos(): boolean {
    return this.projecoes.valid && this.achadosRadiograficos.valid && this.impressoesDiagnosticas.valid &&
            this.chamadoId.valid;
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

