export interface Sentence {
  id: string;
  text: string;
}
export interface User {
  email: string;
  role: string;
  hasConsented: boolean;
}
export interface UserUpdateData {
  role: string;
}
export interface UserConsentData {
  hasConsented: boolean;
  consent: string;
  consentDate: string;
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
export interface deleteUserConsentReponse {
  message: string;
  deleted_tests_count: number;
  updated_user_details: User;
}
