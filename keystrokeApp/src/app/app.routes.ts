import { Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { DataConsentComponent } from './components/data-consent/data-consent.component';
import { KeystrokeCaptureComponent } from './components/keystroke-capture/keystroke-capture.component';
import { authGuard } from './guards/auth.guard';
import { dataConsentGuard } from './guards/data-consent.guard';
import { keystrokeCaptureGuard } from './guards/keystroke-capture.guard';
import { SetUserDataComponent } from './components/set-user-data/set-user-data.component';
import { isLoggedGuard } from './guards/is-logged.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent, canActivate: [authGuard] },
  {
    path: 'set-user-data',
    component: SetUserDataComponent,
    canActivate: [isLoggedGuard],
  },
  {
    path: 'data-consent',
    component: DataConsentComponent,
    canActivate: [dataConsentGuard],
  },
  {
    path: 'keystroke-capture',
    component: KeystrokeCaptureComponent,
    canActivate: [keystrokeCaptureGuard],
  },
];
