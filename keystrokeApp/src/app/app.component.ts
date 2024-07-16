import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AuthService } from './services/auth.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginPageComponent, MatSnackBarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
