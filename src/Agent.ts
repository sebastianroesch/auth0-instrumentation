import { EnvironmentVariables } from "./configuration/EnvironmentVariables";
import Configuration from "./configuration/Configuration";
import { Logger } from "./logging/Logger";
import { DecoratedBunyan } from "./logging/DecoratedBunyan";

export class Agent {
  public packageInfo: any;
  public configuration: Configuration;
  public serializers: any;
  public params: any;
  public initialized: boolean;
  public logger: DecoratedBunyan;
  constructor() {
    this.initialized = false;
    // Declare Stubs
  }

  public init(packageInfo: { name: string }, env: EnvironmentVariables, serializers: any, params: any): void {
    if (this.initialized) {
      return;
    }

    const configuration = new Configuration(env, packageInfo);
    this.logger = Logger.build(configuration, packageInfo, serializers);
    // Hello
    if (params && params.fileRotationSignal && env.LOG_FILE) {
      process.on(params.fileRotationSignal, () => {
        this.logger.reopenFileStreams();
        this.logger.info("The log file has been rotated.");
      });
    }
  }
}
