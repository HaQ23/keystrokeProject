import { Component, Inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule, Router } from '@angular/router';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';
@Component({
  selector: 'app-logout-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, RouterModule],
  templateUrl: './logout-dialog.component.html',
  styleUrl: './logout-dialog.component.scss',
})
export class LogoutDialogComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  deleteConsent() {
    const userData: User | null = this.authService.getUserData();
    if (userData) {
      this.authService.removeUserConsent(userData.email).subscribe({
        next: (user) => {
          if (!user.hasConsented) {
            this.openSnackBar();
            this.router.navigate(['/data-consent']);
          }
        },

        error: (err) => {
          console.log('Problem with deleting consent ', err);
        },
      });
    }
  }
  openSnackBar() {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: { message: 'Your consent has been removed' },
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }
}
