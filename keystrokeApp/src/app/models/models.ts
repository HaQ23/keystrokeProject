export interface Sentence {
  id: string;
  text: string;
}
export interface User {
  email: string;
  role: string;
  consent: boolean;
}
export interface KeystrokeData {
  key: string;
  pressTime: number;
  releaseTime: number;
}
export interface UserKeystrokeData {
  userEmail: string;
  sentenceId: string;
  testRunOn: number;
  keystrokeData: KeystrokeData[];
}
