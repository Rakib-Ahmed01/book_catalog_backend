export type ApiResponse<T> = {
  success: true;
  statusCode: number;
  message: string;
  data: T | T[] | null;
};
