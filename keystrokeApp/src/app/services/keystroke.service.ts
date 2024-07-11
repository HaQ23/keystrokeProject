import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { KeystrokeData, Sentence, UserKeystrokeData } from '../models/models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KeystrokeService {
  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}
  postKeystrokeData(userKeystrokeData: UserKeystrokeData): Observable<{}> {
    console.log(userKeystrokeData);
    return this.http.post(`${this.baseUrl}/test`, userKeystrokeData);
  }

  getPhrase(userEmail: string): Observable<Sentence> {
    return this.http.get<Sentence>(`${this.baseUrl}/sentence/${userEmail}`);
  }
}
