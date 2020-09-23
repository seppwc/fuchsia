export interface FuchsiaResponse<T> {
  message: string;
  payload?: T;
  errors?: string;
}
