import * as http from "http";
import * as https from "https";

export function buildKeepAliveAgent(isProduction): any {
  const options = { keepAlive: true };
  return isProduction ? new https.Agent(options) : new http.Agent(options);
}
