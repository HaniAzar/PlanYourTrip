import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { UsersService } from 'src/app/shared/users.service';
import { Users } from 'src/app/classes/users';
import { disableBindings } from '@angular/core/src/render3';
import { GuidesService } from 'src/app/shared/guides.service';
import { ManagerService } from 'src/app/shared/manager.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { GeneralService } from 'src/app/shared/general.service';
import { TourGuides } from 'src/app/classes/tour-guides';
import { ForgetPasswordComponent } from '../forget-password/forget-password.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private form: FormBuilder, private userService: UsersService,
    private guideService: GuidesService, private managerService: ManagerService,
    private router: Router, private general: GeneralService, public dialog: MatDialog, ) { }

  login: FormGroup;
  hide = true;
  flag: number = 0;
  signFlag: boolean = false;
  currentUser: any;
  signUpUser: FormGroup;

  ngOnInit() {
    this.login = this.form.group({
      email: ['', [Validators.required, Validators.email]],
      passwordUser: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
    });

    this.signUpUser = this.form.group({
      userName: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[A-Za-zא-ת ]+$')]],
      eMail: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(8)]],
    });
  }
  get email() {
    return this.login.get('email');
  }
  get passwordUser() {
    return this.login.get('passwordUser');
  }
  get userName() {
    return this.signUpUser.get('userName');
  }
  get addressName() {
    return this.signUpUser.get('addressName');
  }

  onSubmit(): void {
    this.general.clearStorage();
    this.flag = 1;
    if (this.signFlag == false)
      this.checkUser();
  }
  guides: TourGuides[] = [];
  user: Users;
  flag2: boolean = false;
  signUser() {
    this.signFlag = true;
    this.user = this.signUpUser.value;
    this.userService.getIfExistUser(this.signUpUser.controls.eMail.value, this.signUpUser.controls.password.value).subscribe(y => {
      if (y)
        alert("משתמש קיים במערכת!");
      else {
        this.guideService.getAllGuides().subscribe(data => {
          if (data) {
            this.guides = data;
            this.guides.forEach(element => {
              if (element.eMail == this.signUpUser.controls.eMail.value) {
                this.flag2 = true;
                this.userService.getIfMatchPasswordGuide(this.signUpUser.controls.eMail.value, this.signUpUser.controls.password.value).subscribe(x => {
                  if (x == true) {
                    alert("הסיסמה שבחרת כבר קיימת, נסה סיסמה אחרת");
                    this.signFlag = false;
                  }
                  else {
                    debugger;
                    this.flag2 = false;
                    this.userService.AddUser(this.signUpUser.value).subscribe(user => {
                      if (user) {
                        alert("addSuccess!");
                        this.openDialog(this.user);
                        this.signFlag = false;
                      }
                    });
                  }
                });
              }
            });
            if (this.flag2 == false) {
              this.userService.AddUser(this.signUpUser.value).subscribe(user => {
                if (user) {
                  alert("addSuccess!");
                  this.openDialog(this.user);
                  this.signFlag = false;
                }
              });
            }
          }
        });
      }
    });
  }
  checkUser() {
    return this.userService.IsExistUser(this.login.controls["email"].value, this.login.controls["passwordUser"].value)
      .subscribe(data => {
        if (data) {
          this.currentUser = data;
          this.general.addToStorage('user', data);
          if (JSON.parse(localStorage.getItem('user')) && localStorage['user'] != null)
            window.location.href = 'http://localhost:4200/planYourTrip/tripPlanning';
        }
        else {
          return this.userService.IsPasswordError(this.login.controls["email"].value, this.login.controls["passwordUser"].value)
            .subscribe(data => {
              if (data == true)
                this.isGuide();
              if (data == false)
                this.isGuide();
            })
        }
      });
  }
  isGuide() {
    return this.guideService.IsExistGuide(this.login.controls["email"].value, this.login.controls["passwordUser"].value)
      .subscribe(data => {
        if (data) {
          this.currentUser = data;
          this.general.addToStorage('guide', data);
          if (JSON.parse(localStorage.getItem('guide')) && localStorage['guide'] != null)
            window.location.href = 'http://localhost:4200/planYourTrip/guideEntrance';
        }
        else {
          return this.guideService.IsPasswordError(this.login.controls["email"].value, this.login.controls["passwordUser"].value)
            .subscribe(data => {
              if (data) {
                if (data == true)
                  this.isManager();
              }
              if (data == false)
                this.isManager();
            })
        }
      });
  }
  isManager() {
    return this.managerService.checkManager(this.login.controls["email"].value, this.login.controls["passwordUser"].value)
      .subscribe(data => {
        if (data == true) {
          this.currentUser = data;
          this.general.addToStorage('manager', data);
          if (JSON.parse(localStorage.getItem('manager')) && localStorage['manager'] != null)
            window.location.href = 'http://localhost:4200/planYourTrip/adminEntrance';
        }
        else {
          return this.managerService.IsPasswordError(this.login.controls["email"].value, this.login.controls["passwordUser"].value)
            .subscribe(data => {
              if (data == false)
                alert("הזנת סיסמה שגויה!");
            })
        }
      });
  }
  openDialog(user?: Users) {
    console.log(user);
    const dialogRef = this.dialog.open(DialogComponent, { data: { component: "login", header: "נרשמת בהצלחה ל- Plan Your Trip", text: " האם תרצה להתחבר כעת?", buttonTextOk: "התחבר כעת" } });
    dialogRef.afterClosed().subscribe(result => {
       this.general.addToStorage('user',user);
       window.location.href = 'http://localhost:4200/planYourTrip/tripPlanning';
    })
  }

  forgetPassword() {
    this.dialog.open(ForgetPasswordComponent);
  }
}