import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../../../service/auth.service";


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly AuthService: AuthService, private readonly router: Router) {}

    canActivate() {
        if (this.AuthService.isAuthenticated()) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}