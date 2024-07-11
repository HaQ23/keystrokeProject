import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/models';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-set-user-data',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    RouterModule,
  ],
  templateUrl: './set-user-data.component.html',
  styleUrl: './set-user-data.component.scss',
})
export class SetUserDataComponent {
  form = new FormGroup({
    role: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router, private authService: AuthService) {}

  submitForm() {
    if (this.form.valid) {
      const role = this.role?.value;
      if (role) {
        const userData: User | null = this.authService.getUserData();
        if (userData) {
          const newUserData: User = {
            email: userData.email,
            role: role,
            consent: userData.consent,
          };
          this.authService.updateUser(newUserData).subscribe({
            next: (user: User) => {
              if (user.consent) {
                this.router.navigate(['/keystroke-capture']);
              } else {
                this.router.navigate(['/data-consent']);
              }
            },
            error: (error) => {
              console.error('An error occurred while logging in', error);
            },
          });
        }
      }
    }
  }

  get role() {
    return this.form.get('role');
  }
}
