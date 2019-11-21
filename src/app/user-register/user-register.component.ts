import { MatDialog, MatSnackBar } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { SuccessfulRegisterComponent } from '../successful-register/successful-register.component';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  formCadastro;
  valoresForm: Object;
  conversao;
  durationInSeconds = 5;

  constructor(private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    private userService: UserService,
    private loginService: LoginService,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    //localStorage.clear();
    this.formCadastro = this.fb.group({
      email: [],
      login: [],
      password: []
    });

    this.formCadastro.valueChanges.pipe(
      debounceTime(1000))
      .subscribe(res => {
        this.valoresForm = res;
      });

    this.isUserLoggedIn();
  }

  isUserLoggedIn() {
    if (this.loginService.isLoggedIn()) {
      this.router.navigate(['/home'])
    }
  }

  cadastro() {
    this.conversao = JSON.stringify(this.valoresForm);

    let user = new User();
    user.email = this.formCadastro.value.email;
    user.login = this.formCadastro.value.login;
    user.password = this.formCadastro.value.password;

    this.userService.postUsers(user).subscribe(users => {
      this.router.navigate(['/login']);
      this.openSnackBar();
    },
      Error => {
        console.log(Error);
        alert("Erro ao cadastrar");

      }
    );
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SuccessfulRegisterComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  verificaCadastro() {
    this.router.navigate(['/succesful-register']);
  }

}
