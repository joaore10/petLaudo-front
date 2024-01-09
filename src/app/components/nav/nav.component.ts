import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { ClinicaService } from 'src/app/services/clinica.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss','../../app.component.scss']
})
export class NavComponent implements OnInit {

  userName: string;
  userRole: string;
  constructor(private router: Router, private authService: AuthService, private toast: ToastrService, private clinicaService: ClinicaService, private tecnicoService: TecnicoService) { }

  ngOnInit(): void {
    this.userRole = localStorage.getItem('userRole');
    this.userName = localStorage.getItem('userName');
    if(this.userRole === "ROLE_CLIENTE"){
      this.findClinicaById(localStorage.getItem('userId'));
    }else{
      this.findTecnicoById(localStorage.getItem('userId'));
    }
    
    this.router.navigate(['home']);
  }
  
  logout(){
    this.router.navigate(['login']);
    this.authService.logout();
    this.toast.info('Logout realizado com sucesso', 'Logout')
  }

  findClinicaById(id: any): void{
    this.clinicaService.findById(id).subscribe(res => {
      localStorage.setItem('userName', res.nomeClinica);
      this.userName = res.nomeClinica;
    })
  }

  findTecnicoById(id: any): void {
    this.tecnicoService.findById(id).subscribe(res => {
      localStorage.setItem('userName', res.nome);
      this.userName = res.nome;
    })
  }

}
