import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, MatDialogModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(private authService: AuthService, public dialog: MatDialog) {}
  logout() {
    this.authService.logout();
  }
  removeConsent() {
    this.dialog.open(LogoutDialogComponent);
  }
}
