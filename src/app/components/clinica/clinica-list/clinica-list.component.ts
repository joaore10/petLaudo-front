import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Clinica } from 'src/app/models/clinica';
import { ClinicaService } from 'src/app/services/clinica.service';

@Component({
  selector: 'app-clinica-list',
  templateUrl: './clinica-list.component.html',
  styleUrls: ['./clinica-list.component.scss','../../../app.component.scss']
})
export class ClinicaListComponent implements OnInit {

  ELEMENT_DATA: Clinica[] = []
  
  displayedColumns: string[] = ['id', 'nome','nomeClinica', 'cnpj', 'email', 'acoes'];
  dataSource = new MatTableDataSource<Clinica>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: ClinicaService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(){
    this.service.findAll().subscribe( res => {
      this.ELEMENT_DATA = res;
      this.dataSource = new MatTableDataSource<Clinica>(res);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

