import Configuration from "../../configuration/Configuration";
import { ILoggerStream } from "./ILoggerStream";
import { ConsoleStream } from "./ConsoleStream";
import { FileStream } from "./FileStream";
import { WebStream } from "./WebStream";
import { KinesisStream } from "./KinesisStream";
import { SentryStream } from "./SentryStream";

export class StreamBuilder {
  public static getStreams(configuration: Configuration): ILoggerStream[] {
    const streams: ILoggerStream[] = [];
    if (configuration.logging.logFilename) {
      streams.push(new FileStream(configuration.logging));
    } else {
      streams.push(new ConsoleStream(configuration.logging));
    }

    if (configuration.logging.isProduction && configuration.logging.logWebUrl) {
      streams.push(new WebStream(configuration.logging));
    }

    if (configuration.logging.kinesisStream) {
      streams.push(new KinesisStream(configuration.logging, configuration.aws));
    }

    streams.push(new SentryStream(configuration.logging));

    return streams;
  }
}
