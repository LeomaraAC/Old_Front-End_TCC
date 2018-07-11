import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { AuthenticationService } from '../../core/services/security/authentication.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'tcc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  navigateTo: string;

  constructor(private formBuilder: FormBuilder,
                     private loginService: AuthenticationService,
                     private nt: NotificationService,
                    private activatedRoute: ActivatedRoute,
                    private router: Router) {}

  ngOnInit() {
     this.loginService.logout();
    this.loginForm = this.formBuilder.group({
      user: this.formBuilder.control('', [Validators.required]),
      password: this.formBuilder.control('', [Validators.required])
    });
   this.navigateTo =  this.activatedRoute.snapshot.params['to'] ||  btoa( '/');
  }

  onEnter(value: string) { console.log(value); }
  login() {
    if (this.loginForm.valid) {
      const userLogin = this.loginForm.value;
      this.loginService.login(userLogin.user, userLogin.password).subscribe( user => { // Sucesso
        this.loading = false;
        // console.log(user)
      }, response => this.nt.notifySnackbar(response.error.error || 'Não autorizado!', true) , // Falha
       () => this.router.navigate([ atob (this.navigateTo)])  // Fim do observable
      );
    } else {
      console.log('invalido');
    }
  }
}
