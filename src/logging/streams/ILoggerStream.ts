import LogLevel from "../../configuration/LogLevel";

export interface ILoggerStream {
  name: string;
  level: LogLevel;
  stream: any;
}
