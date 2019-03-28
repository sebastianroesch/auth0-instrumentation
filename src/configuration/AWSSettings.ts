import { EnvironmentVariables } from "./EnvironmentVariables";

export class AWSSettings {
  public region?: string;
  public environment?: string;
  public purpose?: string;
  public releaseChannel?: string;
  public accessKeyId?: string;
  public accessKeySecret?: string;
  public sessionToken?: string;
  public credentials?: string;

  constructor(env: EnvironmentVariables) {
    this.region = env.AWS_REGION;
    this.environment = env.ENVIRONMENT;
    this.purpose = env.PURPOSE;
    this.releaseChannel = env.RELEASE_CHANNEL;
    this.accessKeyId = env.AWS_ACCESS_KEY_ID;
    this.accessKeySecret = env.AWS_ACCESS_KEY_SECRET;
    this.sessionToken = env.AWS_SESSION_TOKEN;
    this.credentials = env.AWS_CREDENTIALS;
  }
}
