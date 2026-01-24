export class AppError extends Error {
  constructor(
    public override message: string,
    public statusCode: number,
  ) {
    super(message);
  }
}
