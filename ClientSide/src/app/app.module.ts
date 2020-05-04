import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { MapComponent } from './components/map/map.component';
import { AddAttractionComponent } from './components/add-attraction/add-attraction.component';
import { AddGuideToTripComponent } from './components/add-guide-to-trip/add-guide-to-trip.component';
import { FooterComponent } from './components/footer/footer.component';
import { GuideSignUpComponent } from './components/guide-sign-up/guide-sign-up.component';
import { HeaderComponent } from './components/header/header.component';
import { JoiningToTripComponent } from './components/joining-to-trip/joining-to-trip.component';
import { LoginComponent } from './components/login/login.component';
import { TripPlanningComponent } from './components/trip-planning/trip-planning.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { ReactiveFormsModule, FormGroup, FormsModule } from '@angular/forms';
import { AllTripsForJoiningComponent } from './components/all-trips-for-joining/all-trips-for-joining.component';
import { FilteringAttractionsComponent } from './components/filtering-attractions/filtering-attractions.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { GuideSignInComponent } from './components/guide-sign-in/guide-sign-in.component';
import { FilterListPipe } from './shared/filter-list.pipe';
import { ManagerSignInComponent } from './components/manager-sign-in/manager-sign-in.component';
import { WaitingGuidesComponent } from './components/waiting-guides/waiting-guides.component';
import { DialogComponent } from './shared/dialog/dialog.component';
import { Error404Component } from './components/error404/error404.component';
import { GuidePlaningTripComponent } from './components/guide-planing-trip/guide-planing-trip.component';
import { TripComponent } from './components/trip/trip.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { PlanYourTripComponent } from './components/plan-your-trip/plan-your-trip.component';
import { AboutComponent } from './components/about/about.component';
import { WaitingAttractionsComponent } from './components/waiting-attractions/waiting-attractions.component';
import { EndPlanningComponent } from './components/end-planning/end-planning.component';
import { TripsForGuideComponent } from './components/trips-for-guide/trips-for-guide.component';
import { TrainingRequestsComponent } from './components/training-requests/training-requests.component';
import { ShareTripComponent } from './components/share-trip/share-trip.component';
import { FilterBylanguagePipe } from './shared/filter-bylanguage.pipe';
import { EditGuideComponent } from './components/edit-guide/edit-guide.component';
import { ActivityDairyComponent } from './components/activity-dairy/activity-dairy.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { GuideUpDateNotesToTripComponent } from './components/guide-up-date-notes-to-trip/guide-up-date-notes-to-trip.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import { PolicySiteComponent } from './components/policy-site/policy-site.component';
import { GuideGuard } from './guide.guard';
import { AuthService } from './shared/auth‏.service';
import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    AddAttractionComponent,
    AddGuideToTripComponent,
    FooterComponent,
    GuideSignUpComponent,
    HeaderComponent,
    JoiningToTripComponent,
    LoginComponent,
    TripPlanningComponent,
    AllTripsForJoiningComponent,
    FilteringAttractionsComponent,
    GuideSignInComponent,
    FilterListPipe,
    ManagerSignInComponent,
    WaitingGuidesComponent,
    DialogComponent,
    Error404Component,
    GuidePlaningTripComponent,
    TripComponent,
    WelcomeComponent,
    PlanYourTripComponent,
    AboutComponent,
    WaitingAttractionsComponent,
    EndPlanningComponent,
    TripsForGuideComponent,
    TrainingRequestsComponent,
    ShareTripComponent,
    FilterBylanguagePipe,
    EditGuideComponent,
    ActivityDairyComponent,
    ForgetPasswordComponent,
    GuideUpDateNotesToTripComponent,
    PolicySiteComponent,
  ],

  imports: [
    BrowserModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    AppRoutingModule,
    MaterialModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCzh1Uc2AV0Gs5IUx6cPWdrUP2rCREhddY',
      apiVersion: '4',
      libraries: ['geometry'],
      language:'he'
    }),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FullCalendarModule,
    DragDropModule,
    MatMenuModule,
    MatTabsModule,
    MatTooltipModule
  ],
  exports: [
    MaterialModule
  ],
  providers: [AuthGuard,GuideGuard,AuthService],
  entryComponents: [DialogComponent, ShareTripComponent, ForgetPasswordComponent, GuideUpDateNotesToTripComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
