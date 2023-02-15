export interface ExampleParams {
  account: string;
  password: string;
}

export interface LoginResult {
  userId: string | number;
  token: string;
}
