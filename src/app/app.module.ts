import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Para trabalhar com formulários no angular 12
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Para realizar requisições HTTP
import { HttpClientModule } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';
import { NgxMaskModule } from 'ngx-mask';

// Imports para componentes do Angular Material
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatSidenavModule} from '@angular/material/sidenav'; 
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table'; 
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatMomentDateModule} from '@angular/material-moment-adapter';


// Componentes do projeto
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { TecnicoListComponent } from './components/tecnico/tecnico-list/tecnico-list.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptorProvider } from './interceptors/auth.interceptor';
import { TecnicoCreateComponent } from './components/tecnico/tecnico-create/tecnico-create.component';
import { TecnicoUpdateComponent } from './components/tecnico/tecnico-update/tecnico-update.component';
import { TecnicoDeleteComponent } from './components/tecnico/tecnico-delete/tecnico-delete.component';
import { ClienteCreateComponent } from './components/cliente/cliente-create/cliente-create.component';
import { ClienteDeleteComponent } from './components/cliente/cliente-delete/cliente-delete.component';
import { ClienteListComponent } from './components/cliente/cliente-list/cliente-list.component';
import { ClienteUpdateComponent } from './components/cliente/cliente-update/cliente-update.component';
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
import { LaudoDeleteComponent } from './components/laudo/laudo-delete/laudo-delete.component';
import { LaudoUpdateComponent } from './components/laudo/laudo-update/laudo-update.component';
import { LaudoReadComponent } from './components/laudo/laudo-read/laudo-read.component';
import { PdfCreateComponent } from './components/pdf/pdf-create/pdf-create.component';




@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    HeaderComponent,
    TecnicoListComponent,
    LoginComponent,
    TecnicoCreateComponent,
    TecnicoUpdateComponent,
    TecnicoDeleteComponent,
    ClienteCreateComponent,
    ClienteDeleteComponent,
    ClienteListComponent,
    ClienteUpdateComponent,
    ChamadoListComponent,
    ChamadoCreateComponent,
    ChamadoUpdateComponent,
    ChamadoReadComponent,
    ClinicaListComponent,
    ClinicaCreateComponent,
    ClinicaUpdateComponent,
    ClinicaDeleteComponent,
    LaudoListComponent,
    LaudoCreateComponent,
    LaudoDeleteComponent,
    LaudoUpdateComponent,
    LaudoReadComponent,
    PdfCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    //Forms angular 12
    FormsModule,
    ReactiveFormsModule,
    //Realizar Requisições Http
    HttpClientModule,
    //Componentes Angular Material
    MatFormFieldModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatRadioModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      closeButton: true,
      progressBar: true
    }),
    NgxMaskModule.forRoot()
  ],
  providers: [AuthInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
