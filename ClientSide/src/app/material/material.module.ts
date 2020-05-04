import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatRadioModule} from '@angular/material/radio';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatBadgeModule} from '@angular/material/badge';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSliderModule} from '@angular/material/slider';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule,
    CdkStepperModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatSelectModule,
    MatDialogModule,
    MatTableModule,
    MatExpansionModule,
    MatRadioModule,
    AmazingTimePickerModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatBadgeModule,
    DragDropModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatSliderModule
  ],
  exports:[
    MatButtonModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule,
    CdkStepperModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatSelectModule,
    MatDialogModule,
    MatTableModule,
    MatExpansionModule,
    MatRadioModule,
    AmazingTimePickerModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatBadgeModule,
    DragDropModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatSliderModule
  ]
})
export class MaterialModule { }
