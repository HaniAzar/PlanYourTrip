import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { TourGuides } from 'src/app/classes/tour-guides';
import { GuidesService } from 'src/app/shared/guides.service';
import { Input } from '@angular/core';
import { GuidesForJoiningToSite } from 'src/app/classes/guides-for-joining-to-site';
import { WaitingGuidesService } from 'src/app/shared/waiting-guides.service';
import { UsersService } from 'src/app/shared/users.service';
import { Profile } from 'selenium-webdriver/firefox';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
@Component({
  selector: 'app-guide-sign-up',
  templateUrl: './guide-sign-up.component.html',
  styleUrls: ['./guide-sign-up.component.scss']
})
export class GuideSignUpComponent implements OnInit {
  signUp: FormGroup;
  days: string[] = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי"];
  languagesArr: string[] = ["עברית", "אנגלית", "צרפתית", "רוסית", "ספרדית", "ערבית", "איטלקית"];
  checkedDays: string = "";
  agree: boolean = false;
  isCheckedDays: boolean = false;
  checkedLanguages: string = "";
  isCheckedLanguages: boolean = false;
  notGood: boolean = false;
  signedUp: boolean = false;
  newGuide: GuidesForJoiningToSite;
  constructor(private FormBuilder: FormBuilder, private waitingGuideService: WaitingGuidesService, private userService: UsersService,
   private dialog:MatDialog) { }

  ngOnInit() {
    this.signUp = this.FormBuilder.group({
      days: false,
      guidePhone: ['', [Validators.required, Validators.pattern('^[-0-9]+$'), Validators.minLength(9)]],
      email: ['', [Validators.required, Validators.email]],
      guideName: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[A-Za-zא-ת ]+$')]],
      languages: false,
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(8)]],
      guideDetailes: ['',],
      Profile: ['',],
    });
  }
  onSubmit(guide: GuidesForJoiningToSite) {
    debugger;
    guide.details = this.signUp.controls.guideDetailes.value;
    guide.phoneNumber = this.signUp.controls.guidePhone.value;
    guide.workingDays = this.checkedDays;
    guide.languages = this.checkedLanguages;
    this.newGuide = guide;
    this.userService.getIfExistGuide(this.signUp.controls.email.value, this.signUp.controls.password.value).subscribe(x => {
      if (x) {
        alert("מדריך כבר רשום");
        this.signedUp = true;
      }
      else {
        this.signedUp = false;
        this.userService.getIfExistUser(this.signUp.controls.email.value, this.signUp.controls.password.value).subscribe(data => {
          if (data) {//קיים כזה משתמש
            this.userService.getIfMatchPasswordUser(this.signUp.controls.email.value, this.signUp.controls.password.value).subscribe(x => {
              if (x) {
                this.notGood = true;
                this.dialog.open(DialogComponent, { data: { header: "בחר סיסמה אחרת היא קיימת כבר כמשתמש", buttonTextCencel: "אישור" } });
              }
              else this.notGood = false;;
            });
          }
        });
      }
    });
  }
  get email() {
    return this.signUp.get('email');
  }
  get guideName() {
    return this.signUp.get('guideName');
  }
  get guidePhone() {
    return this.signUp.get('guidePhone');
  }
  get password() {
    return this.signUp.get('password');
  }
  saveDays(day: string) {
    this.isCheckedDays = true;
    if (this.checkedDays.search(day) == -1)
      this.checkedDays = this.checkedDays.concat(day, ",");
    else {
      day = day.concat(',');
      this.checkedDays = this.checkedDays.replace(day, "");
    }
  }
  savelanguages(language: string) {
    this.isCheckedLanguages = true;
    if (this.checkedLanguages.search(language) == -1)
      this.checkedLanguages = this.checkedLanguages.concat(language, ",");
    else {
      language = language.concat(',');
      this.checkedLanguages = this.checkedLanguages.replace(language, "");
    }
  }
  sendToManager() {
    if(this.newImg!=null)
       this.newGuide.profile=this.newImg;
    this.waitingGuideService.AddGuideForSite(this.newGuide).subscribe(a => { console.log(a) });
  }

  newImg: string;
  onFileUpload(event) {
    const selecetdFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.newImg = reader.result.toString();
    };
    reader.readAsDataURL(selecetdFile);
  }
  OpensitePolicy(){
    window.open("/planYourTrip/sitePolicy");
  }
}
