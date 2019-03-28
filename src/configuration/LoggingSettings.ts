import { EnvironmentVariables } from "./EnvironmentVariables";
import LogLevel from "./LogLevel";
export class LoggingSettings {
  public logFilename?: string;
  public logLevel: LogLevel;
  public useConsoleNiceFormat?: boolean;
  public logWebUrl?: string;
  public logWebLevel: LogLevel;
  public sentryUrl?: string;
  public sentryLogLevel: LogLevel;
  public kinesisStream?: string;
  public kinesisLogLevel: LogLevel;
  public kinesisLogType?: string;
  public ignoreProcessInfo?: boolean;
  public isProduction?: boolean;
  public kinesisObjectMode?: any;
  public kinesisTimeout?: number;
  public kinesisLength?: number;
  public buffer: { timeout: number; length: number; isPrioritaryMsg: (entry: any) => boolean };
  public serviceName?: string;

  constructor(env: EnvironmentVariables) {
    this.serviceName = env.SERVICE_NAME;
    this.logFilename = env.LOG_FILE;
    this.logLevel = env.CONSOLE_LOG_LEVEL || env.LOG_LEVEL || LogLevel.ERROR;
    this.useConsoleNiceFormat = env.CONSOLE_NICE_FORMAT;
    this.logWebUrl = env.LOG_TO_WEB_URL;
    this.logWebLevel = env.LOG_TO_WEB_LEVEL || LogLevel.ERROR;
    this.sentryUrl = env.ERROR_REPORTER_URL;
    this.sentryLogLevel = env.ERROR_REPORTER_LOG_LEVEL || LogLevel.ERROR;
    this.kinesisStream = env.LOG_TO_KINESIS;
    this.kinesisLogLevel = env.LOG_TO_KINESIS_LEVEL || LogLevel.ERROR;
    this.kinesisLogType = env.LOG_TO_KINESIS_LOG_TYPE;
    this.kinesisObjectMode = typeof env.KINESIS_OBJECT_MODE !== "undefined" ? env.KINESIS_OBJECT_MODE : true;
    this.buffer = {
      timeout: env.KINESIS_TIMEOUT || 5,
      length: env.KINESIS_LENGTH || 50,
      isPrioritaryMsg(entry: { level: number }) {
        return entry.level >= 40;
      }
    };
    this.ignoreProcessInfo = env.IGNORE_PROCESS_INFO;
    this.isProduction = process.env.NODE_ENV === "production";
  }
}
