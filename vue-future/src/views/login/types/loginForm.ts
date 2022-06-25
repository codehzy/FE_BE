export interface FormState {
  email: string;
  password: string;
  code: string;
}

export interface loginUser {
  code: string;
  data: {
    token: string;
  };
}
