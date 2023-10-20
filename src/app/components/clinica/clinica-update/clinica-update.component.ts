import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Clinica } from 'src/app/models/clinica';
import { ClinicaService } from 'src/app/services/clinica.service';

@Component({
  selector: 'app-clinica-update',
  templateUrl: './clinica-update.component.html',
  styleUrls: ['./clinica-update.component.scss']
})
export class ClinicaUpdateComponent implements OnInit {

  clinica: Clinica = {
    id:'',
    nome:'',
    nomeClinica:'',
    cnpj: '',
    email: '',
    senha: '',
    endereco:'',
    perfis:[],
    dataCriacao: ''
  }

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cnpj: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));

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

  update(): void{
    this.service.update(this.clinica).subscribe(res => {
      this.toast.success('Clinica atualizado com sucesso', 'Atualização');
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

  validaCampos(){
    return this.nome.valid && this.cnpj.valid && this.email.valid && this.senha.valid;
  }
}
