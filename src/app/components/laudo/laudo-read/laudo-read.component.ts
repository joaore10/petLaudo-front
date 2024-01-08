import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Chamado } from 'src/app/models/chamado';
import { Laudo } from 'src/app/models/laudo';
import { ChamadoService } from 'src/app/services/chamado.service';
import { LaudoService } from 'src/app/services/laudo.service';
import { DialogContentDialog } from '../laudo-create/laudo-create.component';
import html2pdf from 'html2pdf.js';
import { HttpClient } from '@angular/common/http';
import { ImageServiceService } from 'src/app/services/image-service.service';

@Component({
  selector: 'app-laudo-read',
  templateUrl: './laudo-read.component.html',
  styleUrls: ['./laudo-read.component.scss']
})
export class LaudoReadComponent implements OnInit {

  //pega o elemento que vai ser transformado em pdf
  @ViewChild("laudoTemplate", { static: true }) laudoTemplate: ElementRef;

  laudo: Laudo = {
    id: '', 
    projecoes: '',
    achadosRadiograficos: '',
    impressoesDiagnosticas: '',
    chamadoId: '',
    dataCriacao: ''
  }
  base64Images: string[] = [];
  chamados: Chamado[] = [];
  chamado: any = {};
  localImageUrls: String[] = [];

  disableChamadoSelect = false;

  chamadoId: FormControl = new FormControl(null, [Validators.required]);

  constructor( private chamadoService: ChamadoService, private laudoService: LaudoService,
    public dialog: MatDialog, private route: ActivatedRoute,private http: HttpClient, private imageService: ImageServiceService) { }

  ngOnInit(): void {
    this.laudo.id = this.route.snapshot.paramMap.get('id');
    if(this.laudo.id){
      this.findLaudoById();
    }
    this.selectChamado(this.laudo.chamadoId);
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
    this.chamadoService.findById(chamado).subscribe(res => {
      this.chamado = res;
      if(this.chamado.imagens){
        this.getImagesBase64();
      }
    })
  }

  getImagesBase64(){
    this.imageService.convertToBase64(this.chamado.imagens)
      .then((base64Images: string[]) => {
        this.base64Images = base64Images;
      })
      .catch((error) => {
        console.error('Erro ao converter imagens para base64:', error);
      });
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


  carregarImagens(): void {
    // Suponha que `this.laudo` contém as informações do laudo, incluindo as URLs das imagens
    if (this.chamado.imagens && this.chamado.imagens.length > 0) {
      this.laudoService.downloadImagesFromBackend(this.chamado.imagens)
        .then((base64Images: string[]) => {
          // Adicione as imagens baixadas ao array de imagensa
          this.localImageUrls = base64Images;
        })
        .catch((error) => {
          console.error('Erro ao baixar imagens:', error);
        });
    }
  }

  // esse funciona
  createPDF(): void {
    
    const content = this.laudoTemplate.nativeElement;
    const options = {
      margin: [0, 0, 0, 0],
      filename: "petLaudo.pdf",
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: 'legacy', before: '.page-break' },
    };

    html2pdf().set(options).from(content).save();

  }

}

