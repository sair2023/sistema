import { CanActivate, Router } from '@angular/router';
import { AuthService } from "../service/auth.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private adminService:AuthService,
    private router: Router
  ){

  }
  canActivate():any{
    if (!this.adminService.isAuthenticated(['ADMIN', 'EMPRESA', 'CONTA', 'EMPLE', 'VENTAS', 'PRODU'])) {
      this.router.navigate(['/login/iniciar_sesion']);
      return false;
    }
    return true;
  }
}
