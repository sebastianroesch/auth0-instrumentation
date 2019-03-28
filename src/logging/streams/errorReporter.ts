import { hapiPluginBuilder } from "./hapiPluginBuilder";
import * as raven from "raven";
import { LoggingSettings } from "../../configuration/LoggingSettings";
import { emptyErrorReporter } from "../../Stubs";

export function buildErrorReporter(configuration: LoggingSettings) {
  if (!configuration.sentryUrl) {
    return emptyErrorReporter;
  }

  const client: any = new raven.Client(configuration.sentryUrl);

  client.hapi = {
    plugin: hapiPluginBuilder(client)
  };

  client.express = {
    requestHandler: raven.middleware.express.requestHandler(configuration.sentryUrl),
    errorHandler: raven.middleware.express.errorHandler(configuration.sentryUrl)
  };

  client.isActive = true;
  return client;
}
