import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamado';
import { Cliente } from 'src/app/models/cliente';
import { Tecnico } from 'src/app/models/tecnico';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-chamado-update',
  templateUrl: './chamado-update.component.html',
  styleUrls: ['./chamado-update.component.scss']
})
export class ChamadoUpdateComponent implements OnInit {

  chamado: Chamado = {
    id: '',
    dataAbertura: '',
    dataFechamento: '',
    prioridade: '',
    status: '',
    titulo: '',
    observacoes: '',
    tecnico: '',
    cliente: '',
    clinica: '',
    nomeCliente: '',
    nomeTecnico: '',
    nomeClinica: '',
    dataNascimento: '',
    dataEstudo: '',
    idade: '',
    sexo: '',
    raca: '',
    especie: '',
    responsavelPaciente: '',
    medicoRequerente: '',
    nomePaciente: '',
    crmv: '',
    regiaoExame: '',
    imagens: [],
    laudo: ''
  }

  clientes: Cliente[] = [];
  tecnicos: Tecnico[] = [];

  prioridade: FormControl = new FormControl(null, [Validators.required]);
  status: FormControl = new FormControl(null, [Validators.required]);
  titulo: FormControl = new FormControl(null, [Validators.required]);
  observacoes: FormControl = new FormControl(null, [Validators.required]);
  tecnico: FormControl = new FormControl(null, [Validators.required]);
  cliente: FormControl = new FormControl(null, [Validators.required]);

  constructor( private clienteService: ClienteService, private tecnicoService: TecnicoService, private chamadoService: ChamadoService, private toastService: ToastrService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.chamado.id = this.route.snapshot.paramMap.get('id');
    this.findById();
    this.findAllClientes();
    this.findAllTecnicos();
  }

  findById(): void{
    this.chamadoService.findById(this.chamado.id).subscribe(res => {
      this.chamado = res;
      this.chamado.prioridade = this.chamado.prioridade.toString();
      this.chamado.status = this.chamado.status.toString();
    }, ex =>{
      this.toastService.error(ex.error.error);
    })
  }

  update(): void{
    this.chamadoService.update(this.chamado).subscribe(res =>{
      this.toastService.success('Atualizado com sucesso', 'Atualizar Chamado');
      this.router.navigate(['chamados']);
    }, ex => {
      this.toastService.error(ex.error.error);
    })
  }

  findAllClientes(): void {
    this.clienteService.findAll().subscribe(res => {
      this.clientes = res;
    })
  }

  findAllTecnicos(): void {
    this.tecnicoService.findAll().subscribe(res => {
      this.tecnicos = res;
    })
  }

  validaCampos(): boolean {
    return this.prioridade.valid && this.titulo.valid && this.status.valid &&
            this.observacoes.valid && this.tecnico.valid && this.cliente.valid;
  }

}
