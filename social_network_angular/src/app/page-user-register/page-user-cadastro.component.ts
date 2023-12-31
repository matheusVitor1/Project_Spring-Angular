import { UserService } from './../services/user.service';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserSettingsService } from '../page-user-settings/services/user-settings.service';


@Component({
  selector: 'app-page-user-cadastro',
  templateUrl: './page-user-cadastro.component.html',
  styleUrls: ['./page-user-cadastro.component.css']
})
export class PageUserCadastroComponent {
  tipoDocumento: string = 'cpf';
  documentoPattern: string = '';
  photoUrlControl = new FormControl();
  userNameControl = new FormControl();
  birthdayControl = new FormControl();
  identityControl = new FormControl();
  emailControl = new FormControl();
  passwordControl = new FormControl();

  updatePattern() {
    if (this.tipoDocumento === 'cpf') {
      // Defina a máscara de CPF
      // Exemplo: '999.999.999-99'
      this.documentoPattern = '\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}';
    } else if (this.tipoDocumento === 'cnpj') {
      // Defina a máscara de CNPJ
      // Exemplo: '99.999.999/9999-99'
      this.documentoPattern = '\\d{2}\\.\\d{3}\\.\\d{3}/\\d{4}-\\d{2}';
    } else {
      this.documentoPattern = ''; // Selecione outra opção
    }
  }

  constructor (private userService: UserService, private router: Router, private http: HttpClient, private userSettings: UserSettingsService){}

  registerUser(){
    const requestBody = {
      photoUrl: this.photoUrlControl.value,
      name: this.userNameControl.value,
      birthday: this.birthdayControl.value,
      identity: this.identityControl.value,
      email: this.emailControl.value,
      password: this.passwordControl.value,
      active: true
    }
    this.userService.addUser(requestBody).subscribe(
    (response) => {
      const aboutBody = {
        userEmail:this.emailControl.value,
        userBirthday: this.identityControl.value,
        userId: response.id,
      };

      const heroBody = {
        userNickName: this.userNameControl.value,
        userPhoto: this.photoUrlControl.value,
        userId: response.id,
      };

      this.userSettings.saveUserAbout(aboutBody).subscribe(
        (responseAbout) => {

        }
      );

      this.userSettings.saveUserHero(heroBody).subscribe(
        (responseHero) => {

        }
      );

      
      this.router.navigate(['/login']);
      alert("Usuário Cadastrado com Sucesso!")
    },
    (error) => {
      if (error.status === 409) {
        // Lógica a ser executada em caso de conflito (status 409 - CONFLICT)
        alert("Usuário já existe com esse Documento ou Email")
        console.error('Usuário já cadastrado: ', error);
      } else {
        // Lógica de tratamento de outros erros
        console.error('Erro desconhecido: ', error);
      }
    });
  }

  saverUserHero(){
    const body = {
      userNickName: this.userNameControl.value,
      userPhoto: this.photoUrlControl.value,
    }
    this.userSettings.saveUserHero(body).subscribe(
      (reponse) =>{

      }
    );
  }





}
