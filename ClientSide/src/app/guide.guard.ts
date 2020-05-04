import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth‏.service';

@Injectable()
export class GuideGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.authService.isGuide()) {
            return true;
        }
        else {
            this.router.navigate(["planYourTrip/login"]);
            return false;
        }
    }
}