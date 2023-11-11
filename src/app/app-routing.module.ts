import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { TecnicoListComponent } from './components/tecnico/tecnico-list/tecnico-list.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { TecnicoCreateComponent } from './components/tecnico/tecnico-create/tecnico-create.component';
import { TecnicoUpdateComponent } from './components/tecnico/tecnico-update/tecnico-update.component';
import { TecnicoDeleteComponent } from './components/tecnico/tecnico-delete/tecnico-delete.component';
import { ClienteListComponent } from './components/cliente/cliente-list/cliente-list.component';
import { ClienteCreateComponent } from './components/cliente/cliente-create/cliente-create.component';
import { ClienteUpdateComponent } from './components/cliente/cliente-update/cliente-update.component';
import { ClienteDeleteComponent } from './components/cliente/cliente-delete/cliente-delete.component';
import { ChamadoListComponent } from './components/chamado/chamado-list/chamado-list.component';
import { ChamadoCreateComponent } from './components/chamado/chamado-create/chamado-create.component';
import { ChamadoUpdateComponent } from './components/chamado/chamado-update/chamado-update.component';
import { ChamadoReadComponent } from './components/chamado/chamado-read/chamado-read.component';
import { ClinicaListComponent } from './components/clinica/clinica-list/clinica-list.component';
import { ClinicaCreateComponent } from './components/clinica/clinica-create/clinica-create.component';
import { ClinicaUpdateComponent } from './components/clinica/clinica-update/clinica-update.component';
import { ClinicaDeleteComponent } from './components/clinica/clinica-delete/clinica-delete.component';
import { LaudoListComponent } from './components/laudo/laudo-list/laudo-list.component';
import { LaudoCreateComponent } from './components/laudo/laudo-create/laudo-create.component';
import { LaudoUpdateComponent } from './components/laudo/laudo-update/laudo-update.component';

const routes: Routes = [
  {
    path:'login', component: LoginComponent
  },
  {
    path: '', component: NavComponent, canActivate: [AuthGuard], children: [
      { path: 'home', component: HomeComponent},

      { path: 'tecnicos', component: TecnicoListComponent},
      { path: 'tecnicos/create', component: TecnicoCreateComponent},
      { path: 'tecnicos/update/:id', component: TecnicoUpdateComponent},
      { path: 'tecnicos/delete/:id', component: TecnicoDeleteComponent},

      { path: 'clientes', component: ClienteListComponent},
      { path: 'clientes/create', component: ClienteCreateComponent},
      { path: 'clientes/update/:id', component: ClienteUpdateComponent},
      { path: 'clientes/delete/:id', component: ClienteDeleteComponent},

      { path: 'clinicas', component: ClinicaListComponent},
      { path: 'clinicas/create', component: ClinicaCreateComponent},
      { path: 'clinicas/update/:id', component: ClinicaUpdateComponent},
      { path: 'clinicas/delete/:id', component: ClinicaDeleteComponent},

      { path: 'chamados', component: ChamadoListComponent},
      { path: 'chamados/create', component: ChamadoCreateComponent},
      { path: 'chamados/update/:id', component: ChamadoUpdateComponent},
      { path: 'chamados/read/:id', component: ChamadoReadComponent},

      { path: 'laudos', component: LaudoListComponent},
      { path: 'laudos/create', component: LaudoCreateComponent},
      { path: 'laudos/update/:id', component: LaudoUpdateComponent},
      { path: 'laudos/create/:id', component: LaudoCreateComponent},
      //{ path: 'laudos/read/:id', component: LaudoReadComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
