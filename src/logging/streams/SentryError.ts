export class SentryError extends Error {
  public signal: string;
  public code: string;

  constructor(message: string) {
    super(message);
  }
}
