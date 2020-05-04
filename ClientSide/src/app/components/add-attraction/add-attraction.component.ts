// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { TouristAttractionsService } from 'src/app/shared/tourist-attractions.service';
// import { TouristAttractions } from 'src/app/classes/tourist-attractions';
// import { Categories } from 'src/app/classes/categories';
// import { ArraysService } from 'src/app/shared/arrays.service';
// import { AttractionsToCategories } from 'src/app/classes/attractions-to-categories';
// import { AmazingTimePickerService } from 'amazing-time-picker';
// import { ImagesService } from 'src/app/shared/images.service';
// import { enableProdMode } from '@angular/core';
// import { AttractionsArrays } from 'src/app/classes/attractions-arrays';
// import { WaitingAttractions } from 'src/app/classes/waiting-attractions';
// import { WaitingAttractionsService } from 'src/app/shared/waiting-attractions.service';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { Route } from '@angular/compiler/src/core';
// import { Router } from '@angular/router';
// @Component({
//   selector: 'app-add-attraction',
//   templateUrl: './add-attraction.component.html',
//   styleUrls: ['./add-attraction.component.scss']
// })
// export class AddAttractionComponent implements OnInit {
//   seassonAttraction: string[] = AttractionsArrays.seasons;
//   areaAttraction: string[] = AttractionsArrays.areas;
//   categories: Categories[] = [];
//   checkedSeasson: string = "";
//   checkedArea: string = "";
//   categoriesArr: string = "";
//   checkedIsPayment: Boolean = false;
//   newImg: string;
//   imagesUrlArr: string[] = [];
//   isLinear = false;
//   constructor(private form: FormBuilder, private waitingAttractionService: WaitingAttractionsService,
//     private attractionServies: TouristAttractionsService, private arrService: ArraysService,
//     private atp: AmazingTimePickerService, private imagesService: ImagesService,
//     private _snackBar: MatSnackBar,private router:Router
//   ) { }

//   firstFormGroup: FormGroup;
//   secondFormGroup: FormGroup;
//   thirdFormGroup: FormGroup;
//   fourFormGroup: FormGroup;
//   ngOnInit() {
//     this.getcategories();

//     this.firstFormGroup = this.form.group({
//       attractionName: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[A-Za-zא-ת ]+$')]],
//       address: ['', [Validators.required, Validators.minLength(2)]],
//       area: ['',],
//       phoneNumber: ['', [Validators.minLength(8), Validators.pattern('^[0-9-]+$')]],
//       http: ['', [Validators.minLength(10)]],
//     });
//     this.secondFormGroup = this.form.group({
//       seasson: ['',],
//       accessibility: [''],
//       openningHour: ['', Validators.pattern('^[0-9:]+$')],
//       closingHour: ['', Validators.pattern('^[0-9:]+$')],
//     });
//     this.thirdFormGroup = this.form.group({
//       isMatchFamilies: ['', Validators.required],
//       isMatchChildren: [''],
//       isEntranceToWater: [''],
//       isPayment: [''],
//       isMatchGroups: [''],
//       entranceToWater: [, ''],
//       notes: [''],
//     });
//     this.fourFormGroup = this.form.group({
//     });


//   }
//   getcategories() {
//     this.attractionServies.getCategories().subscribe(data => { if (data) this.categories = data });
//   }

//   addAttrction: WaitingAttractions = new WaitingAttractions();

//   onSubmit1() {
    
//   }
//   onSubmit2() {
//     this.addAttrction.attractionName = this.firstFormGroup.controls.attractionName.value;
//     this.addAttrction.address = this.firstFormGroup.controls.address.value;
//     this.addAttrction.area = this.firstFormGroup.controls.area.value;
//     this.addAttrction.phoneNumber = this.firstFormGroup.controls.phoneNumber.value;
//     this.addAttrction.link = this.firstFormGroup.controls.http.value;

//     this.addAttrction.openningHour = this.secondFormGroup.controls.openningHour.value;
//     this.addAttrction.closingHour = this.secondFormGroup.controls.closingHour.value;
//     this.addAttrction.seasson = this.checkedSeasson;
//     this.addAttrction.accessibility = this.secondFormGroup.controls.accessibility.value;
//   }
//   onSubmit3() {
//     this.addAttrction.isMatchChildren = this.thirdFormGroup.controls.isMatchChildren.value;
//     this.addAttrction.entranceToWater = this.thirdFormGroup.controls.entranceToWater.value;
//     this.addAttrction.isMatchFamilies = this.thirdFormGroup.controls.isMatchFamilies.value;
//     this.addAttrction.isMatchGroups = this.thirdFormGroup.controls.isMatchGroups.value;
//     this.addAttrction.payment = this.thirdFormGroup.controls.isPayment.value;
//     this.addAttrction.notes = this.thirdFormGroup.controls.notes.value;
//   }
//   onSubmit4() {
//     this.addAttrction.categories = this.categoriesArr.slice(0, -1);
//     this.waitingAttractionService.IsExistAttraction(this.addAttrction.attractionName).subscribe(isExist => {
//       if (!isExist) {
//         this.waitingAttractionService.getWaitingAttractionIdByName(this.addAttrction.attractionName).subscribe(data => {
//           if (data == 0) {
//             this.waitingAttractionService.addWaitingAttraction(this.addAttrction).subscribe(x => {
//               if (x) {
//                 this.imagesService.addWaitingAttractionImage(data, this.imagesUrlArr).subscribe();
//                 this._snackBar.open("בקשתך נקלטה בהצלחה, האתר יתווסף למערכת לאחר אישור המנהל.", "הבנתי", {
//                   duration: 4500,
//                 });
//                 this.router.navigate(["planYourTrip/tripPlanning"]);
//               }
//             });
//           }
//         });
//       }
//       else {
//         alert("אתר זה כבר נשלח למנהל כבקשה להוספה, האתר יתווסף לאחר אישור המנהל");
//       }
//     });
//   }

//   get attractionName() {
//     return this.firstFormGroup.get('attractionName');
//   }
//   get address() {
//     return this.firstFormGroup.get('addressName');
//   }
//   get accessibility() {
//     return this.secondFormGroup.get('accessibility');
//   }
//   get closingHour() {
//     return this.secondFormGroup.get('closingHour');
//   }
//   get openningHour() {
//     return this.secondFormGroup.get('openningHour');
//   }
//   saveSeasson(seasson: string) {
//     if (this.checkedSeasson.search(seasson) == -1)
//       this.checkedSeasson = this.checkedSeasson.concat(seasson, ",");
//     else {
//       seasson = seasson.concat(',');
//       this.checkedSeasson = this.checkedSeasson.replace(seasson, "");
//     }
//   }
//   saveArea(area: string) {
//     this.checkedArea = area;
//   }
//   checkedCategories(category: string) {
//     if (this.categoriesArr.length == 0 || this.categoriesArr.indexOf(category) == -1) {
//       this.categoriesArr = this.categoriesArr.concat(category);
//       this.categoriesArr = this.categoriesArr.concat(',');
//     }
//     else {
//       const index = this.categoriesArr.indexOf(category);
//       if (index > -1) {
//         category = category.concat(',');
//         this.categoriesArr = this.categoriesArr.replace(category, "");
//       }
//     }
//   }
//   open() {
//     const amazingTimePicker = this.atp.open();
//     amazingTimePicker.afterClose().subscribe();
//   }
//   onFileUpload(event) {
//     const selecetdFile = event.target.files[0];
//     const reader = new FileReader();
//     reader.onload = () => {
//       this.newImg = reader.result.toString();
//       this.arrService.addStringToArray(this.newImg, this.imagesUrlArr);
//     };
//     reader.readAsDataURL(selecetdFile);
//   }
// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TouristAttractionsService } from 'src/app/shared/tourist-attractions.service';
import { TouristAttractions } from 'src/app/classes/tourist-attractions';
import { Categories } from 'src/app/classes/categories';
import { ArraysService } from 'src/app/shared/arrays.service';
import { AttractionsToCategories } from 'src/app/classes/attractions-to-categories';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { ImagesService } from 'src/app/shared/images.service';
import { enableProdMode } from '@angular/core';
import { AttractionsArrays } from 'src/app/classes/attractions-arrays';
import { WaitingAttractions } from 'src/app/classes/waiting-attractions';
import { WaitingAttractionsService } from 'src/app/shared/waiting-attractions.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-attraction',
  templateUrl: './add-attraction.component.html',
  styleUrls: ['./add-attraction.component.scss']
})
export class AddAttractionComponent implements OnInit {
  addAttractionForm: FormGroup;
  attraction: WaitingAttractions = new WaitingAttractions();
  seassonAttraction: string[] = AttractionsArrays.seasons;
  areaAttraction: string[] = AttractionsArrays.areas;
  categories: Categories[] = [];
  checkedSeasson: string = "";
  checkedArea: string = "";
  categoriesArr: string = "";
  checkedIsPayment: Boolean = false;
  newImg: string;
  imagesUrlArr: string[] = [];
  constructor(private form: FormBuilder, private waitingAttractionService: WaitingAttractionsService,
    private attractionServies: TouristAttractionsService, private arrService: ArraysService,
    private atp: AmazingTimePickerService, private imagesService: ImagesService,
    private _snackBar: MatSnackBar,private router:Router
  ) { }
  ngOnInit() {
    this.getcategories();
    this.addAttractionForm = this.form.group({
      attractionName: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[A-Za-zא-ת ]+$')]],
      address: ['', [Validators.required, Validators.minLength(2)]],
      area: ['',],
      phoneNumber: ['', [Validators.minLength(8), Validators.pattern('^[0-9-]+$')]],
      estimatedTime:['',[Validators.pattern('^[א-ת0-9-: ]+$')]],
      seasson: ['',],
      accessibility: [''],
      http: ['', [Validators.minLength(10)]],
      isMatchFamilies: ['', Validators.required],
      isMatchChildren: [''],
      isEntranceToWater: [''],
      isPayment: [''],
      isMatchGroups: [''],
      notes: [''],
      openningHour: [''],
      closingHour: [''],
    });
  }
  getcategories() {
    this.attractionServies.getCategories().subscribe(data => { if (data) this.categories = data });
  }

  onSubmit() {
    let attraction = this.addAttractionForm.controls;
    this.attraction = new WaitingAttractions(attraction.attractionName.value, attraction.address.value, this.checkedArea,
      attraction.phoneNumber.value, attraction.isPayment.value, this.checkedSeasson, attraction.openningHour.value, attraction.closingHour.value,
      attraction.accessibility.value, null, attraction.http.value, attraction.notes.value, attraction.isEntranceToWater.value,
      attraction.isMatchGroups.value, attraction.isMatchChildren.value, attraction.isMatchFamilies.value, this.categoriesArr.slice(0, -1),attraction.estimatedTime.value);
    this.waitingAttractionService.IsExistAttraction(this.attraction.attractionName).subscribe(isExist => {
      if (!isExist) {
        this.waitingAttractionService.addWaitingAttraction(this.attraction).subscribe(x => {
          if (x) {
            this.waitingAttractionService.getWaitingAttractionIdByName(this.attraction.attractionName).subscribe(data => {
              if (data) {
                this.imagesService.addWaitingAttractionImage(data, this.imagesUrlArr).subscribe();
              }
            });
          }
        }
        );
        this._snackBar.open("האתר יתווסף למערכת לאחר אישור המנהל", "הבנתי", {
          duration: 3500,
        });
        this.router.navigate(["planYourTrip/tripPlanning"]);
      }
      else {
        alert("אתר זה כבר נשלח למנהל כבקשה להוספה, האתר יתווסף לאחר אישור המנהל");
      }
    });
  }

  get attractionName() {
    return this.addAttractionForm.get('attractionName');
  }
  get estimatedTime() {
    return this.addAttractionForm.get('estimatedTime');
  }
  get address() {
    return this.addAttractionForm.get('addressName');
  }
  get accessibility() {
    return this.addAttractionForm.get('accessibility');
  }
  saveSeasson(seasson: string) {
    if (this.checkedSeasson.search(seasson) == -1)
      this.checkedSeasson = this.checkedSeasson.concat(seasson, ",");
    else {
      seasson = seasson.concat(',');
      this.checkedSeasson = this.checkedSeasson.replace(seasson, "");
    }
  }
  saveArea(area: string) {
    this.checkedArea = area;
  }
  checkedCategories(category: string) {
    if (this.categoriesArr.length == 0 || this.categoriesArr.indexOf(category) == -1) {
      this.categoriesArr = this.categoriesArr.concat(category);
      this.categoriesArr = this.categoriesArr.concat(',');
    }
    else {
      const index = this.categoriesArr.indexOf(category);
      if (index > -1) {
        category = category.concat(',');
        this.categoriesArr = this.categoriesArr.replace(category, "");
      }
    }
  }
  open() {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
      console.log(time);
    });
  }
  onFileUpload(event) {
    const selecetdFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.newImg = reader.result.toString();
      this.arrService.addStringToArray(this.newImg, this.imagesUrlArr);
    };
    reader.readAsDataURL(selecetdFile);
    console.log(this.imagesUrlArr);
  }
}


