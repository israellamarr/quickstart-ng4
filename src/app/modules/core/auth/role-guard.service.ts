import { Injectable }       from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable }       from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { AuthenticationService }    from './authentication.service';

@Injectable()
export class RoleGuard implements CanActivate {

    constructor(private authenticationService: AuthenticationService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        var valid = false;
        let url: string = state.url;
        // a data property must be attached to the route with role information
        let requiredRoles   = route.data['requiredRoles'];
        let anyRoles        = route.data['anyRoles'];
        let roles = {'any': anyRoles, 'required': requiredRoles};
        if (this.authenticationService.roleValidation(roles)) {
            valid = true;
        } else {
            valid = false;
        }
        if (valid) {
            console.log('RoleGuard', 'role validated');
            return Observable.of(true);
        } else {
            console.log('RoleGuard', 'role NOT validated');
            return Observable.of(false);
        }
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.canActivate(route, state);
    }

}
