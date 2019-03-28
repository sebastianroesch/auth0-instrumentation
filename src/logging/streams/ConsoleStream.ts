import { ILoggerStream } from "./ILoggerStream";
import { LoggingSettings } from "../../configuration/LoggingSettings";
import { spawn } from "child_process";
import LogLevel from "../../configuration/LogLevel";

export class ConsoleStream implements ILoggerStream {
  public name: string;
  public level: LogLevel;
  public stream: any;
  constructor(configuration: LoggingSettings, spawnProcess = spawn) {
    this.name = "console-stream";

    if (configuration.useConsoleNiceFormat) {
      const bunyanFormatter = spawnProcess(`${__dirname}/../../../node_modules/.bin/bunyan`, ["--color"], {
        stdio: ["pipe", "inherit", "inherit"]
      });
      this.stream = bunyanFormatter.stdin;
    } else {
      this.stream = process.stdout;
    }

    this.level = configuration.logLevel;
  }
}
