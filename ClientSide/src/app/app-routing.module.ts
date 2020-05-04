import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AllTripsForJoiningComponent } from './components/all-trips-for-joining/all-trips-for-joining.component';
import { TripPlanningComponent } from './components/trip-planning/trip-planning.component';
import { AddGuideToTripComponent } from './components/add-guide-to-trip/add-guide-to-trip.component';
import { GuideSignUpComponent } from './components/guide-sign-up/guide-sign-up.component';
import { AddAttractionComponent } from './components/add-attraction/add-attraction.component';
import { ManagerSignInComponent } from './components/manager-sign-in/manager-sign-in.component';
import { GuideSignInComponent } from './components/guide-sign-in/guide-sign-in.component';
import { WaitingGuidesComponent } from './components/waiting-guides/waiting-guides.component';
import { Error404Component } from './components/error404/error404.component';
import { FilteringAttractionsComponent } from './components/filtering-attractions/filtering-attractions.component';
import { TripComponent } from './components/trip/trip.component';
import { GuidePlaningTripComponent } from './components/guide-planing-trip/guide-planing-trip.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { PlanYourTripComponent } from './components/plan-your-trip/plan-your-trip.component';
import { AboutComponent } from './components/about/about.component';
import { WaitingAttractionsComponent } from './components/waiting-attractions/waiting-attractions.component';
import { JoiningToTripComponent } from './components/joining-to-trip/joining-to-trip.component';
import { EndPlanningComponent } from './components/end-planning/end-planning.component';
import { TripsForGuideComponent } from './components/trips-for-guide/trips-for-guide.component';
import { TrainingRequestsComponent } from './components/training-requests/training-requests.component';
import { EditGuideComponent } from './components/edit-guide/edit-guide.component';
import { ActivityDairyComponent } from './components/activity-dairy/activity-dairy.component';
import { GuideGuard } from './guide.guard';
import { PolicySiteComponent } from './components/policy-site/policy-site.component';
import { AuthGuard } from './auth.guard';
// import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: "",
    component: WelcomeComponent,
  },
  {
    path: "about",
    component: AboutComponent,
  },
  {
    path: "planYourTrip",
    component: PlanYourTripComponent,
    children: [
      {
        path: "login",
        component: LoginComponent,
      },
      {
        path: "sitePolicy",
        component: PolicySiteComponent,
      },
      {
        path: "addGuideToTrip",
        component: AddGuideToTripComponent,
      },
      {
        path: "allTourGuides",
        component: AddGuideToTripComponent,
      },
      {
        path: "endPlanning",
        component: EndPlanningComponent
      },
      {
        path: "tripsForGuide",
        component: TripsForGuideComponent,
        canActivate:[GuideGuard]
      },
      {
        path: "editGuide",
        component: EditGuideComponent,
        canActivate:[GuideGuard]
      },
      {
        path: "about",
        component: AboutComponent,
      },
      {
        path: "joiningToTrip",
        component: JoiningToTripComponent,
        canActivate:[AuthGuard]
      },
      {
        path: "tripsForJoining",
        component: AllTripsForJoiningComponent,
      },
      {
        path: "traningRequest",
        component: TrainingRequestsComponent,
        canActivate:[GuideGuard]
      },
      {
        path: "avtivityDairy",
        component: ActivityDairyComponent,
        canActivate:[GuideGuard]
      },
      {
        path: "tripPlanning",
        component: TripPlanningComponent,
        children: [
          {
            path: "trip",
            component: TripComponent
          },
          {
            path: "guideTripPlanning",
            component: GuidePlaningTripComponent,
            canActivate:[GuideGuard]
          },

        ]
      },
      {
        path: "addAttraction",
        component: AddAttractionComponent
      },
      {
        path: "adminEntrance",
        component: ManagerSignInComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "waitingGuides",
        component: WaitingGuidesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "waitingAttractions",
        component: WaitingAttractionsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "guideEntrance",
        component: GuideSignInComponent,
        canActivate:[GuideGuard]
      },
      {
        path: "guideSignUp",
        component: GuideSignUpComponent
      },
    ]
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "**",
    component: Error404Component
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
