import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/models';
import { error } from 'console';
@Component({
  selector: 'app-data-consent',
  standalone: true,
  imports: [MatButtonModule, RouterModule, MatDialogModule],
  templateUrl: './data-consent.component.html',
  styleUrl: './data-consent.component.scss',
})
export class DataConsentComponent {
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}
  agree() {
    const userData: User | null = this.authService.getUserData();
    if (userData) {
      const newUserData: User = {
        email: userData.email,
        consent: true,
        role: userData.role,
      };
      this.authService.updateUser(newUserData).subscribe({
        next: (user) => {
          if (user.consent) {
            this.router.navigate(['/keystroke-capture']);
          }
        },

        error: (err) => {
          console.log('Problem with confirming consent ', err);
        },
      });
    }
  }
  disagree() {
    this.openDialog('If you want to move on you must give your consent ');
  }
  openDialog(message: string): void {
    this.dialog.open(DialogComponent, {
      data: {
        message: message,
      },
    });
  }
}
