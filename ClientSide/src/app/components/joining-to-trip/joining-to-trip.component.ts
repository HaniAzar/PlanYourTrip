import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TripsForJoiningService } from 'src/app/shared/trips-for-joining.service';
import { GeneralService } from 'src/app/shared/general.service';
import { WrittenDownUsers } from 'src/app/classes/written-down-users';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-joining-to-trip',
  templateUrl: './joining-to-trip.component.html',
  styleUrls: ['./joining-to-trip.component.scss']
})
export class JoiningToTripComponent implements OnInit {
  @Input() public set id(id: number) {
    let tripId = id;
    if (tripId) {
      this.general.addToStorage('id', tripId);
    }
  }

  signToTrip: FormGroup;
  userId: number;
  tripId: number;
  ok: boolean = false;
  joiningToTripObj: WrittenDownUsers = new WrittenDownUsers();

  constructor(private dialog: MatDialog, private form: FormBuilder, private tripsForJoining: TripsForJoiningService, private general: GeneralService) { }

  ngOnInit() {
    this.signToTrip = this.form.group({
      userName: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[A-Za-zא-ת ]+$')]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(7), Validators.pattern('^[0-9- ]+$')]],
      numOfTourists: ['', [Validators.required, Validators.pattern('^[0-9 ]+$')]],
    });
    if (localStorage['user'])
      this.userId = JSON.parse(localStorage.getItem('user')).id;
  }

  get numOfTourists() {
    return this.signToTrip.get('numOfTourists');
  }

  onSubmit() {
    if (localStorage['id'])
      this.tripId = JSON.parse(localStorage.getItem('id'));
    this.joiningToTripObj = new WrittenDownUsers(this.tripId, this.userId, this.signToTrip.controls.numOfTourists.value);
    this.tripsForJoining.signUserToTrip(this.joiningToTripObj).subscribe(data => console.log(data));
    this.tripsForJoining.updateNumOfTourists(this.joiningToTripObj).subscribe();
    this.tripsForJoining.SignUpTripSendEmail(JSON.parse(localStorage.getItem('user'))).subscribe(y => {
      if (y) {
        alert("נשלח בהצלחה");
        this.dialog.closeAll();
        window.location.href = 'http://localhost:4200/planYourTrip/tripsForJoining';
      }
    });
  }
  closeDialog() {
    this.dialog.closeAll();
  }
  checkNumOfTourists(): boolean {
    if (this.signToTrip.controls.numPerson.value > 10)
      return false;
    return true;
  }
  isOk() {
    if (!this.ok)
      this.ok = true;
    else
      this.ok = false;
  }
}