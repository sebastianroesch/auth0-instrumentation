import { AWSSettings } from "../../configuration/AWSSettings";
import { LoggingSettings } from "../../configuration/LoggingSettings";

export class KinesisOptions {
  public accessKeyId: string | undefined;
  public secretAccessKey: string | undefined;
  public sessionToken: string | undefined;
  public credentials: string | undefined;
  public streamName: string | undefined;
  public region: string | undefined;
  public partitionKey: () => string;
  public httpOptions: { agent: any };
  public objectMode: any;
  public buffer: { timeout: number; length: number; isPrioritaryMsg: (entry: any) => boolean };
  constructor(loggingConfiguration: LoggingSettings, awsConfiguration: AWSSettings, keepAliveAgent: any) {
    this.accessKeyId = awsConfiguration.accessKeyId;
    this.secretAccessKey = awsConfiguration.accessKeySecret;
    this.sessionToken = awsConfiguration.sessionToken;
    this.credentials = awsConfiguration.credentials;
    this.streamName = loggingConfiguration.kinesisStream;
    this.region = awsConfiguration.region;
    this.partitionKey = function getPartitionKey() {
      return Date.now().toString() + Math.random();
    };
    this.httpOptions = {
      agent: keepAliveAgent
    };
    this.objectMode = loggingConfiguration.kinesisObjectMode;
    this.buffer = loggingConfiguration.buffer;
  }
}
