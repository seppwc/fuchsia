export interface FuchsiaResponse<T> {
  [key: string]: any;
  message: string;
  payload?: T;
  errors?: string;
}
