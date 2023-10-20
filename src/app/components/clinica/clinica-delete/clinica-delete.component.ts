import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Clinica } from 'src/app/models/clinica';
import { ClinicaService } from 'src/app/services/clinica.service';

@Component({
  selector: 'app-clinica-delete',
  templateUrl: './clinica-delete.component.html',
  styleUrls: ['./clinica-delete.component.scss']
})
export class ClinicaDeleteComponent implements OnInit {

  clinica: Clinica = {
    id:'',
    nome:'',
    nomeClinica:'',
    cnpj: '',
    email: '',
    senha: '',
    endereco: '',
    perfis:[],
    dataCriacao: ''
  }

  constructor( private service: ClinicaService, private toast: ToastrService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.clinica.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById():void{
    this.service.findById(this.clinica.id).subscribe(res => {
      res.perfis = [];
      this.clinica = res;
    })
  }

  delete(): void{
    this.service.delete(this.clinica.id).subscribe(res => {
      this.toast.success('Cliente deletado com sucesso', 'Deletar');
      this.router.navigate(['clinicas'])
    }, ex => {
      if(ex.error.erros){
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);
        });
      }else{
        this.toast.error(ex.error.message);
      }
      
    })
  }


  addPerfil(perfil: any): void{
    if(this.clinica.perfis.includes(perfil)){
      this.clinica.perfis.splice(this.clinica.perfis.indexOf(perfil), 1);
    }else{
      this.clinica.perfis.push(perfil);
    }
  }

}
