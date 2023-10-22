import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog , MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamado';
import { Laudo } from 'src/app/models/laudo';
import { ChamadoService } from 'src/app/services/chamado.service';
import { LaudoService } from 'src/app/services/laudo.service';

@Component({
  selector: 'app-laudo-create',
  templateUrl: './laudo-create.component.html',
  styleUrls: ['./laudo-create.component.scss']
})
export class LaudoCreateComponent implements OnInit {

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

  projecoes: FormControl = new FormControl(null, [Validators.required]);
  achadosRadiograficos: FormControl = new FormControl(null, [Validators.required]);
  impressoesDiagnosticas: FormControl = new FormControl(null, [Validators.required]);
  chamadoId: FormControl = new FormControl(null, [Validators.required]);

  constructor( private chamadoService: ChamadoService, private laudoService: LaudoService, private toastService: ToastrService,
    private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.findAllChamados();
  }

  create(): void{
    this.laudoService.create(this.laudo).subscribe(res =>{
      this.toastService.success('Criado laudo com sucesso', 'Novo Laudo');
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

  selectChamado(chamado: number): void{
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


@Component({
  selector: 'dialog-content',
  templateUrl: 'dialog-imagem.html',
  styleUrls: ['./laudo-create.component.scss']
})
export class DialogContentDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}

