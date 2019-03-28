import { ILoggerStream } from "./ILoggerStream";
import { LoggingSettings } from "../../configuration/LoggingSettings";
import { buildErrorReporter } from "./errorReporter";
import { Auth0SentryStream } from "./Auth0SentryStream";

export class SentryStream implements ILoggerStream {
  public name: string;
  public level: import("../../configuration/LogLevel").default;
  public stream: any;
  public type: string;

  constructor(configuration: LoggingSettings) {
    const errorReporter = buildErrorReporter(configuration);
    this.name = "sentry";
    this.type = "raw";
    this.stream = new Auth0SentryStream(errorReporter);
    this.level = configuration.sentryLogLevel;
  }
}
