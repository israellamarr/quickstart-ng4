import { Injectable }               from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { AppSettings }              from '../../../config/app.settings';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthHttp, JwtHelper }      from 'angular2-jwt';
import { Observable }               from 'rxjs/Observable';
import { Subject }                  from 'rxjs/Subject';
import 'rxjs/add/observable/of';

import { User }                     from '../../shared/user';
import { DataResult }               from '../../shared/data-result';

@Injectable()
export class AuthenticationService {

    private apiUrl              = AppSettings.API_ENDPOINT;  // URL to web API
    private isLoggedIn          = new Subject<boolean>();
    isLoggedInStateChanged$     = this.isLoggedIn.asObservable();
    jwtHelper: JwtHelper        = new JwtHelper();
    // store the URL so we can redirect after logging in
    redirectUrl: string;
    appSettings: any = AppSettings;
    token: any;

    constructor(private http: Http, private authHttp: AuthHttp, private router: Router) {
        this.token = null;
        try {
            this.token = this.jwtHelper.decodeToken(localStorage.getItem('auth_jwt_token'));
        } catch(err) {
            console.log('userHasRole', 'Authentication token not valid.');
        }
    }

    getUserInfo(): User {
        let user = new User();
        if (this.token) {
            user.user_code              = this.token.data.auth;
            user.user_id                = this.token.data.user_id;
            user.email                  = this.token.data.email;
            user.first_name             = this.token.data.first_name;
            user.last_name              = this.token.data.last_name;
            user.organization_name      = this.token.data.organization_name;
        }
        return user;
    }

    sendPasswordReset(email: string): Observable<DataResult> {
        let data = {
            email: email
        };
        return this.http.post(AppSettings.API_ENDPOINT+'/send_password_retrieval', data).map(response => {
            let body = response.json();
            let dataResult = new DataResult();
            if (body.status == 'success') {
                dataResult.success   = true;
                dataResult.message   = body.message;
            } else {
                dataResult.success   = false;
                dataResult.message   = body.message;
            }
            return dataResult;
        }).catch(this.handleError);
    }

    updatePassword(user_code: string, password: string): Observable<DataResult> {
        let data = {
            user_code: user_code,
            password: password
        };
        return this.http.post(AppSettings.API_ENDPOINT+'/update_password_with_code', data).map(response => {
            let body = response.json();
            let dataResult = new DataResult();
            if (body.status == 'success') {
                dataResult.success   = true;
                dataResult.message   = body.message;
            } else {
                dataResult.success   = false;
                dataResult.message   = body.message;
            }
            return dataResult;
        }).catch(this.handleError);
    }

    login(email: string, password: string): Observable<DataResult> {
        let credentials = {
            email: email,
            password: password
        };
        // don't use AuthHttp here because you don't need to send a jwt if you are trying to login
        return this.http.post(AppSettings.API_ENDPOINT+'/sign_in', credentials).map(response => {
            let body = response.json();
            let dataResult      = new DataResult();
            if (body.status == 'success') {
                if (body.data) {
                    localStorage.setItem('auth_jwt_token', body.data);

                    try {
                        this.token = this.jwtHelper.decodeToken(localStorage.getItem('auth_jwt_token'));
                    } catch(err) {
                        console.log('login', 'Authentication token not valid.');
                    }

                    dataResult.success      = true;
                    this.isLoggedIn.next(true);
                } else {
                    dataResult.success      = false;
                    dataResult.message      = body.message;
                    this.isLoggedIn.next(false);
                }
            } else {
                dataResult.success      = false;
                dataResult.message      = body.message;
                dataResult.errors       = body.errors;
            }
            return dataResult;
        }).catch(this.handleError);
    }

    setIsLoggedIn() {
        this.isLoggedIn.next(true);
    }

    signOut(): Observable<boolean> {
        console.log('Signing out...');
        localStorage.removeItem('auth_jwt_token');
        this.token = null;
        this.router.navigate(['/login']);
        return Observable.of(true);
    }

    isAuthenticated(): boolean {
        try {
            let token = this.jwtHelper.decodeToken(localStorage.getItem('auth_jwt_token'));
            return true;
        } catch(err) {
            //console.log('Authentication token not valid.');
            return false;
        }
    }

    canManageRole(role: number) {
        if (this.token) {
            if (this.token.data.roles) {
                let userRoles = this.token.data.roles;
                if (userRoles.indexOf(this.appSettings.ROLE_SUPER_USER) !== -1) {
                    return true;
                } else if (userRoles.indexOf(this.appSettings.ROLE_NSGIC_STATE_REP) !== -1) {
                    let canManage = [
                        this.appSettings.ROLE_NSGIC_STATE_REP,
                        this.appSettings.ROLE_NSGIC_STATE_ADMIN,
                        this.appSettings.ROLE_STATE_EGRT,
                        this.appSettings.ROLE_STATE_GIS_EMA
                    ];
                    if (canManage.indexOf(role) !== -1) {
                        return true;
                    } else {
                        return false;
                    }

                } else if (userRoles.indexOf(this.appSettings.ROLE_NSGIC_STATE_ADMIN) !== -1) {
                    let canManage = [
                        this.appSettings.ROLE_NSGIC_STATE_ADMIN,
                        this.appSettings.ROLE_STATE_EGRT,
                        this.appSettings.ROLE_STATE_GIS_EMA
                    ];
                    if (canManage.indexOf(role) !== -1) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        } else {
            return false;
        }
    }

    userHasRole(role: number): boolean {
        var user_has_role = false;
        if (this.token) {
            if (this.token.data.roles) {
                let userRoles = this.token.data.roles;

                if (userRoles.indexOf(this.appSettings.ROLE_SUPER_USER) !== -1) {
                    user_has_role = true;
                } else {
                    if (userRoles.indexOf(role) !== -1) {
                        user_has_role = true;
                    }
                }
            }
        }
        return user_has_role;
    }

    isStateBasedRole(role_id: number): boolean {
        let stateBasedRoles = [this.appSettings.ROLE_NSGIC_STATE_REP, this.appSettings.ROLE_NSGIC_STATE_ADMIN, this.appSettings.ROLE_STATE_EGRT, this.appSettings.ROLE_STATE_GIS_EMA];
        return (stateBasedRoles.indexOf(role_id) !== -1);
    }

    roleValidation(roles: any): boolean {
        var user_has_role = false;
        if (this.token) {
            if (this.token.data.roles) {
                let userRoles           = this.token.data.roles;
                if (roles.any) {
                    let anyRoles            = roles.any;
                    for (let role_id of anyRoles) {
                        if (userRoles.indexOf(role_id) !== -1) {
                            user_has_role = true;
                        }
                    }
                }
                if (roles.required) {
                    let requiredRoles       = roles.required;
                    for (let role_id of requiredRoles) {
                        if (userRoles.indexOf(role_id) !== -1) {
                            user_has_role = true;
                        } else {
                            user_has_role = false;
                            break;
                        }
                    }
                }
            }
        }
        return user_has_role;
    }

    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
          const body = error.json() || '';
          const err = body.error || JSON.stringify(body);
          errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
          errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}
