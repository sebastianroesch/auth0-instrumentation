import { ILoggerStream } from "./ILoggerStream";
import { LoggingSettings } from "../../configuration/LoggingSettings";
import * as KinesisWritable from "aws-kinesis-writable";
import { buildKeepAliveAgent } from "./KeepAliveAgent";
import { AWSSettings } from "../../configuration/AWSSettings";
import { KinesisOptions } from "./KinesisOptions";
import { kinesisErrorHandler } from "./error-handlers";

export class KinesisStream implements ILoggerStream {
  public name: string;
  public level: import("../../configuration/LogLevel").default;
  public stream: any;
  public logType: string;

  constructor(configuration: LoggingSettings, awsConfiguration: AWSSettings) {
    const agent = buildKeepAliveAgent(configuration.isProduction);

    const stream = new KinesisWritable(new KinesisOptions(configuration, awsConfiguration, agent));

    stream.on("error", kinesisErrorHandler);
    this.name = "kinesis";
    this.stream = stream;
    this.level = configuration.kinesisLogLevel;

    if (configuration.kinesisLogType) {
      this.logType = configuration.kinesisLogType;
    }
  }
}
