
import { AuthGuard } from './shared/auth.guard';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { redirectUnauthorizedTo, canActivate , AngularFireAuthGuard,redirectLoggedInTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(["sign-in"]);
const redirectLoggedInToDashboard = () => redirectLoggedInTo(['dashboard']);




const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full',canActivate: [AngularFireAuthGuard],data: { authGuardPipe: redirectLoggedInToDashboard }},
  {path:'dashboard', component:DashboardComponent,canActivate: [AngularFireAuthGuard],data: { authGuardPipe: redirectUnauthorizedToLogin}},
  {path:'register-user', component:SignUpComponent},
  {path:'sign-in', component:SignInComponent,canActivate: [AngularFireAuthGuard],data: { authGuardPipe: redirectLoggedInToDashboard }},
  {path:'forgot-password', component:ForgotPasswordComponent},
  {path:'verify-email-address', component:VerifyEmailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  DashboardComponent,
  SignInComponent,
  SignUpComponent,
  ForgotPasswordComponent,
  VerifyEmailComponent
 ]