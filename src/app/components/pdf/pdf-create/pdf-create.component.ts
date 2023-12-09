import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-pdf-create',
  templateUrl: './pdf-create.component.html',
  styleUrls: ['./pdf-create.component.scss']
})
export class PdfCreateComponent implements OnInit {

  //pega o elemento que vai ser transformado em pdf
  @ViewChild("laudoTemplate", { static: true }) laudoTemplate: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }

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
