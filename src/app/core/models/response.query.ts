export interface ResponseQuery<T> {
  items: T[];
  count: number;
  success: boolean;
  message: string;
}

