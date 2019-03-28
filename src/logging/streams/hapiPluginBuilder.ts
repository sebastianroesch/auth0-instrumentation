import { hapiErrorReporterBuilder } from "./hapiErrorReporterBuilder";

export function hapiPluginBuilder(client) {
  const plugin = {
    pkg: require("../../../package.json"),
    register(server, options, next) {
      const hapiVersion = server.version || ""; // '17.0.0'
      // tslint:disable-next-line: radix
      const majorHapiVersion = parseInt(hapiVersion.split(".")[0]);
      const errorReporter = hapiErrorReporterBuilder(client, options);
      server.expose("client", client);

      // depending on the hapi version use a different way to listen to the event
      if (majorHapiVersion >= 17) {
        server.events.on({ name: "request", channels: "error" }, errorReporter);
      } else {
        server.on("request-error", errorReporter);
        next();
      }
    }
  };

  return plugin;
}
