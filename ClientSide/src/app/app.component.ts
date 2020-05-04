import { Component } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ClientSide';

  // User:;


  // constructor(private router: Router, private serHomeLogin: LoginComponent, private serLocalstorage: LocalStorageNowUserService) {
  //   router.events.subscribe(e => {

  //     if (e instanceof NavigationStart) {
  //       this.User= this.serLocalstorage.getFromLocal("User");
  //       if (this.User == null && e.url != '/http:'&&e.url!='/homeLogin') {
  //         this.serHomeLogin.urlWant = e.url;
  //         this.router.navigateByUrl('/homeLogin');
  //       }
  //     }
  //     // if (e instanceof NavigationEnd) {
  //     //   // Exit Code
  //     // }
  //   })
  // };

}
