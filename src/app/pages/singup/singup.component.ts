import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth-service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss']
})
export class SingupComponent {
userData: FormGroup

  constructor(
    private authService: AuthService
  ) {
  this.userData = new FormGroup({
    email: new FormControl("",[Validators.required, Validators.email]),
    password: new FormControl("",[Validators.required,Validators.minLength(6)])
  })
  }

  onSubmit() {
  if (this.userData.valid){
    this.authService.signUp(this.userData.value)
  }
  }
}
