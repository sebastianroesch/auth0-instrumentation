import Configuration from "../configuration/Configuration";
import { ProcessInfo } from "auth0-common-logging";
import { Serializers } from "auth0-common-logging";
import * as bunyan from "bunyan";
import { decorateLogger } from "./Utils";
import { StreamBuilder } from "./streams/StreamBuilder";
import { DecoratedBunyan } from "./DecoratedBunyan";

export class Logger {
  public static build(configuration: Configuration, packageInfo: { name: string }, serializers?): DecoratedBunyan {
    if (!serializers) {
      serializers = Serializers;
    }

    const streams = StreamBuilder.getStreams(configuration);
    const process_info =
      ProcessInfo && !configuration.logging.ignoreProcessInfo && ProcessInfo.version !== "0.0.0"
        ? ProcessInfo
        : undefined;

    const logger = bunyan.createLogger({
      name: packageInfo.name,
      process: process_info,
      region: configuration.aws.region,
      service_name: configuration.logging.serviceName || packageInfo.name,
      environment: configuration.aws.environment,
      purpose: configuration.aws.purpose,
      channel: configuration.aws.releaseChannel,
      streams: streams as any,
      serializers
    });

    logger.on("error", (err, stream) => {
      console.error("Cannot write to log stream " + stream.name + " " + (err && err.message));
    });
    return decorateLogger(logger);
  }
}
