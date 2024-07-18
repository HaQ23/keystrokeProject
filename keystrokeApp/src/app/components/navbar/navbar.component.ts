import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { User } from '../../models/models';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, MatDialogModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  userData!: User | null;
  isMenuOpen = false;
  constructor(private authService: AuthService, public dialog: MatDialog) {}
  ngOnInit(): void {
    this.authService.user$.subscribe((userData) => {
      this.userData = userData;
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  logout() {
    this.authService.logout();
  }
  removeConsent() {
    this.dialog.open(LogoutDialogComponent);
  }
}
