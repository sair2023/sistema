import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { LockedComponent } from "./locked/locked.component";
import { Page404Component } from "./page404/page404.component";
import { Page500Component } from "./page500/page500.component";
const routes: Routes = [
  {
    path: "",
    redirectTo: "iniciar_sesion",
    pathMatch: "full",
  },
  {
    path: "iniciar_sesion",
    component: SigninComponent,
  },
  {
    path: "registrar",
    component: SignupComponent,
  },
  {
    path: "recuperar_contra",
    component: ForgotPasswordComponent,
  },
  {
    path: "confirmacion",
    component: LockedComponent,
  },
  {
    path: "page404",
    component: Page404Component,
  },
  {
    path: "error",
    component: Page500Component,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
