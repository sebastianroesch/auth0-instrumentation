import LogLevel from "../../configuration/LogLevel";
import { ILoggerStream } from "./ILoggerStream";
import { LoggingSettings } from "../../configuration/LoggingSettings";

export class FileStream implements ILoggerStream {
  public name: string;
  public level: LogLevel;
  public stream: any;
  public path: string;

  constructor(configuration: LoggingSettings) {
    this.name = "file-stream";
    this.level = configuration.logLevel;
    if (configuration.logFilename) {
      this.path = configuration.logFilename;
    }
  }
}
