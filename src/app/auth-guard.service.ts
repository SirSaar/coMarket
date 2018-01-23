import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                           from '@angular/router';
import { AuthService }      from './auth.service';
import { Observable }       from 'rxjs/Observable';
import {tap} from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
     private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
     //url now is the future url to navigate to.
    this.authService.redirectUrl = state.url;
    return this.authService.checkLogIn().pipe(
      tap(isLoggedIn => {
         if(!isLoggedIn) this.router.navigate(['/unauthorized']); })
      )
  }
  


  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(route, state);
  }

}