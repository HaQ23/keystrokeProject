import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/models';

@Component({
  selector: 'app-login-page',
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
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  emailForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(private router: Router, private authService: AuthService) {}

  submitForm() {
    if (this.emailForm.valid) {
      const email = this.email?.value;
      if (email) {
        this.authService.login(email).subscribe({
          next: (user: User) => {
            if (user.role !== '') {
              this.router.navigate(['/keystroke-capture']);
            } else {
              this.router.navigate(['/set-user-data']);
            }
          },
          error: (error) => {
            console.error('An error occurred while logging in', error);
          },
        });
      }
    }
  }

  get email() {
    return this.emailForm.get('email');
  }
}
