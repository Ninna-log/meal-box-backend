export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string
  ) {
    super(message);
    this.name = "AppError";
    // Maintains proper stack trace in V8
    Error.captureStackTrace(this, this.constructor);
  }
}
