import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/users.service';
import { GeneralService } from 'src/app/shared/general.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  forgetPassword: FormGroup;
  forgetPassword2: FormGroup;
  mailUser: string;
  isHidde: boolean = false;
  constructor(private fb: FormBuilder, private userService: UsersService, private generalService: GeneralService) { }

  ngOnInit() {
    this.forgetPassword = this.fb.group({
      email: ['', [Validators.email]],
    });
    this.forgetPassword2 = this.fb.group({
      password: ['', [Validators.minLength(6), Validators.maxLength(8)]],
    });
  }
  get email() {
    return this.forgetPassword.get('email');
  }
  get password() {
    return this.forgetPassword2.get('password');
  }
  reset() {
    this.isHidde = true;
    this.mailUser=this.forgetPassword.controls.email.value;
    this.userService.getIfExistPassword(this.forgetPassword.controls.email.value, "user").subscribe();
  }
  verifyPassword() {
    this.userService.getUserIfMatchPasswordUser(this.mailUser, this.forgetPassword2.controls.password.value).subscribe(x => {
      if (x) {
        alert("זוהה בהצלחה");
        this.generalService.addToStorage('user', x);
        if (JSON.parse(localStorage.getItem('user')) && localStorage['user'] != null)
          window.location.href = 'http://localhost:4200/planYourTrip/tripPlanning';
      }
      else
        alert("סיסמה שגויה");
    });
  }
}



