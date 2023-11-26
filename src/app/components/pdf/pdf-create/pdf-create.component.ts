import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { jsPDF } from 'jspdf';

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
    const DATA = this.laudoTemplate.nativeElement;
    const pdf: jsPDF = new jsPDF({
      orientation: 'portrait', // Orientação do documento: 'portrait' ou 'landscape'
      unit: 'px', // Unidade de medida: 'pt', 'mm', 'cm', 'in'
      format: 'a4' // Formato do documento: 'a3', 'a4', 'a5', etc.
    });
    pdf.html(DATA, {
      callback: (pdf) => {
        pdf.save("laudo");
      },
      windowWidth:210
    });
  }

}
