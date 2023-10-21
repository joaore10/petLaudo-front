import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Laudo } from 'src/app/models/laudo';
import { LaudoService } from 'src/app/services/laudo.service';

@Component({
  selector: 'app-laudo-list',
  templateUrl: './laudo-list.component.html',
  styleUrls: ['./laudo-list.component.scss','../../../app.component.scss']
})
export class LaudoListComponent implements OnInit {

  ELEMENT_DATA: Laudo[] = [];
  FILTERED_DATA: Laudo[] = [];
  
  displayedColumns: string[] = ['id', 'projecoes','achadosRadiograficos','impressoesDiagnosticas','dataCriacao','acoes'];
  dataSource = new MatTableDataSource<Laudo>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: LaudoService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe(res => {
      this.ELEMENT_DATA = res;
      this.dataSource = new MatTableDataSource<Laudo>(res);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  retornaStatus(status: any): string {
    if(status == '0'){
      return 'ABERTO';
    }else if(status == '1'){
      return 'EM ANDAMENTO';
    }else{
      return 'ENCERRADO';
    }
  }


}