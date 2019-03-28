import { EnvironmentVariables } from "./EnvironmentVariables";
import { TracingAgents } from "./TracingAgents";

export class TracingSettings {
  public traceAgent?: TracingAgents;
  public agentHost?: string;
  public agentPort?: number;
  public apiKey?: string;
  public useTLS?: boolean;
  public reportInterval?: number;

  constructor(env: EnvironmentVariables) {
    this.traceAgent = env.TRACE_AGENT_CLIENT;
    this.agentHost = env.TRACE_AGENT_HOST;
    this.agentPort = env.TRACE_AGENT_PORT;
    this.apiKey = env.TRACE_AGENT_API_KEY;
    this.useTLS = env.TRACE_AGENT_USE_TLS;
    this.reportInterval = env.TRACE_REPORTING_INTERVAL_MILLIS;
  }
}
