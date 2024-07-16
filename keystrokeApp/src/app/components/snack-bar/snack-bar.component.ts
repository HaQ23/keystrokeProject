import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

@Component({
  standalone: true,
  selector: 'app-snackbar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss'],
  imports: [MatButtonModule],
})
export class SnackBarComponent {
  constructor(
    public snackBarRef: MatSnackBarRef<SnackBarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) {}

  onClose(): void {
    this.snackBarRef.dismiss();
  }
}
