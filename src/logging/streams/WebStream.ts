import { ILoggerStream } from "./ILoggerStream";
import { LoggingSettings } from "../../configuration/LoggingSettings";
import * as CommonLogging from "auth0-common-logging";
import LogLevel from "../../configuration/LogLevel";

export class WebStream implements ILoggerStream {
  public name: string;
  public level: LogLevel;
  public stream: any;

  constructor(configuration: LoggingSettings) {
    this.name = "web-url";
    this.stream = new CommonLogging.Streams.HttpWritableStream(configuration.logWebUrl);
    this.level = configuration.logWebLevel;
  }
}
