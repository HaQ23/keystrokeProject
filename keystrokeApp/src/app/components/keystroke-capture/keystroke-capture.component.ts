import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {
  KeystrokeData,
  Sentence,
  UserKeystrokeData,
} from '../../models/models';
import { DialogComponent } from '../dialog/dialog.component';
import { AuthService } from '../../services/auth.service';
import { KeystrokeService } from '../../services/keystroke.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-keystroke-capture',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    NavbarComponent,
  ],
  templateUrl: './keystroke-capture.component.html',
  styleUrls: ['./keystroke-capture.component.scss'],
})
export class KeystrokeCaptureComponent implements OnInit {
  userSentence: string = '';
  sentence: Sentence = {
    id: '1',
    text: '',
  };
  private keystrokeData: KeystrokeData[] = [];
  private keyMap: { [key: string]: string } = {
    ' ': 'Space',
  };

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private keystrokeService: KeystrokeService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getSentence();
  }
  getSentence() {
    const userEmail = this.authService.getUserData()?.email;
    if (userEmail) {
      this.keystrokeService.getPhrase(userEmail).subscribe({
        next: (data) => {
          this.sentence = {
            id: data.id,
            text: data.text,
          };
        },
        error: (err) => {
          console.error('An error occurred while downloading sentences', err);
        },
      });
    }
  }
  onKeydown(event: KeyboardEvent) {
    const key = this.normalizeKey(event.key);
    const currentTime = event.timeStamp;
    const existingKeystroke = this.keystrokeData.find(
      (item) => item.key === key && item.releaseTime === 0
    );
    if (!existingKeystroke) {
      this.keystrokeData.push({
        key,
        pressTime: currentTime,
        releaseTime: 0,
      });
    }
  }

  onKeyup(event: KeyboardEvent) {
    const key = this.normalizeKey(event.key);
    const currentTime = event.timeStamp;
    const keystroke = this.keystrokeData.find(
      (item) => item.key === key && item.releaseTime === 0
    );
    if (keystroke) {
      keystroke.releaseTime = currentTime;
    }
  }

  onInput(event: any) {
    this.userSentence = event.target.value;
  }

  send() {
    const accuracy = this.calculateAccuracy(
      this.userSentence,
      this.sentence.text
    );
    if (this.keystrokeData.length > this.sentence.text.length / 2) {
      if (accuracy >= 50) {
        this.sendUserKeystrokeData(this.sentence.id, this.keystrokeData);
        this.clear();
        this.getSentence();
      } else {
        this.openDialog(
          `You have only transcribed ${accuracy}% of the text correctly. Please try again.`
        );
      }
    } else {
      this.openDialog(`Incorrectly entered data, try again`);
    }
  }
  sendUserKeystrokeData(sentenceId: string, keystrokeData: KeystrokeData[]) {
    const userEmail = this.authService.getUserData()?.email;
    if (userEmail) {
      const userKeystrokeData: UserKeystrokeData = {
        userEmail,
        sentenceId,
        testRunOn: keystrokeData[0].pressTime,
        keystrokeData,
      };
      this.keystrokeService.postKeystrokeData(userKeystrokeData).subscribe({
        next: (reponse) => {
          this.openDialog(`Success! Your text has been sent, thank you !`);
        },
        error: (error) => {
          this.openDialog(`Error! Your text has not been sent, try again. `);
        },
      });
    }
  }
  openDialog(message: string): void {
    this.dialog.open(DialogComponent, {
      data: { message: message },
    });
  }
  clear() {
    this.userSentence = '';
    this.keystrokeData = [];
  }

  calculateAccuracy(input: string, original: string): number {
    let correctCharacters = 0;
    for (let i = 0; i < input.length && i < original.length; i++) {
      if (input[i] === original[i]) {
        correctCharacters += 1;
      }
    }
    return Math.round((correctCharacters / original.length) * 100);
  }

  normalizeKey(key: string): string {
    return this.keyMap[key] || key;
  }

  get enteredText(): string {
    return this.sentence.text.substring(0, this.userSentence.length);
  }

  get remainingText(): string {
    return this.sentence.text.substring(this.userSentence.length);
  }
}
