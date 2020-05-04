import { Component, OnInit } from '@angular/core';
import { TourGuides } from 'src/app/classes/tour-guides';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { GuidesService } from 'src/app/shared/guides.service';

@Component({
  selector: 'app-edit-guide',
  templateUrl: './edit-guide.component.html',
  styleUrls: ['./edit-guide.component.scss']
})
export class EditGuideComponent implements OnInit {
  currentGuide: TourGuides;
  editDetailsForm: FormGroup;
  days: string[] = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי"];
  languagesArr: string[] = ["עברית", "אנגלית", "צרפתית", "רוסית", "ספרדית", "ערבית", "איטלקית"];
  constructor(private formBuilder: FormBuilder, private route: Router, private dialog: MatDialog, private guideService: GuidesService) { }

  ngOnInit() {
    this.currentGuide = JSON.parse(localStorage.getItem('guide'));
    this.newImg = this.currentGuide.profile;
    this.editDetailsForm = this.formBuilder.group({
      days: false,
      languages: false,
      guidePhone: ['', [Validators.pattern('^[-0-9]+$'), Validators.minLength(9)]],
      email: ['', [Validators.email]],
      guideName: ['', [Validators.minLength(2), Validators.pattern('^[A-Za-zא-ת ]+$')]],
      password: ['', [Validators.minLength(5), Validators.maxLength(8)]],
      details: ['',],
    });
  }

  onSubmit(guide: TourGuides) {
    if (this.newImg != null)
      this.currentGuide.profile = this.newImg;
    if (guide.guideName)
      this.currentGuide.guideName = guide.guideName;
    if (guide.eMail != null)
      this.currentGuide.eMail = guide.eMail;
    if (guide.phoneNumber != null)
      this.currentGuide.phoneNumber = guide.phoneNumber;
    if (guide.password != "")
      this.currentGuide.password = guide.password;
    if (guide.details != "")
      this.currentGuide.details = guide.details;
    if (this.checkedDays != "")
      this.currentGuide.workingDays = this.checkedDays;
    if (this.checkedLanguages != "")
      this.currentGuide.languages = this.checkedLanguages;
    this.guideService.upDateGuideDetailes(this.currentGuide).subscribe();
    alert("הפרטים נקלטו בהצלחה"+"תוכל לראות את השינויים בכניסתך הבאה למערכת");
    // this.dialog.open(DialogComponent, { data: { header: "", text: " תוכל לראות את השינויים בכניסתך הבאה למערכת", buttonTextCencel: "אישור" } });
    this.route.navigate(["planYourTrip/tripPlanning"]);

  }
  cencel() {
    this.route.navigate(['planYourTrip/tripPlanning'])
  }
  deleteGuide() {
    this.guideService.checkTripsForGuide(this.currentGuide.id).subscribe(isExist => {
      if (isExist)
      this.dialog.open(DialogComponent, { data: { header: "אינך רשאי לבטל את הרשמתך לאתר", text: "בהתאם לתקנון האתר, תוכל לבטל לאחר תאריך הטיול שהנך מדריך אותו", buttonTextCencel: "אישור" } });
      else {
        this.guideService.deleteGuideById(this.currentGuide.id).subscribe(data => {
          if (data) {
            alert("הוסרת בהצלחה");
            localStorage.removeItem('guide');
            window.location.href = 'planYourTrip/tripPlanning';
          }
        });
      }
    });
  }
  get email() {
    return this.editDetailsForm.get('email');
  }
  get guideName() {
    return this.editDetailsForm.get('guideName');
  }
  get guidePhone() {
    return this.editDetailsForm.get('guidePhone');
  }
  get password() {
    return this.editDetailsForm.get('password');
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
  isCheckedDays: boolean = false;
  checkedLanguages: string = "";
  isCheckedLanguages: boolean = false;
  checkedDays: string = "";

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
}



