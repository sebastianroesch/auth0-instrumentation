import { KinesisOptions } from "src/logging/streams/KinesisOptions";
import { LoggingSettings } from "src/configuration/LoggingSettings";
import { AWSSettings } from "src/configuration/AWSSettings";

describe("buildKinesisOptions", () => {
  let actual: KinesisOptions;

  it("should convert configuration values into kinesis options object", () => {
    const loggingConfiguration = new LoggingSettings({
      KINESIS_OBJECT_MODE: "test",
      LOG_TO_KINESIS: "test-stream"
    });
    const awsConfiguration = new AWSSettings({
      AWS_ACCESS_KEY_ID: "test-key",
      AWS_ACCESS_KEY_SECRET: "test-secret",
      AWS_SESSION_TOKEN: "token",
      AWS_CREDENTIALS: "test@test",
      AWS_REGION: "us-test"
    });
    actual = new KinesisOptions(loggingConfiguration, awsConfiguration, {});

    expect(actual.accessKeyId).toEqual(awsConfiguration.accessKeyId);
    expect(actual.secretAccessKey).toEqual(awsConfiguration.accessKeySecret);
    expect(actual.sessionToken).toEqual(awsConfiguration.sessionToken);
    expect(actual.credentials).toEqual(awsConfiguration.credentials);
    expect(actual.region).toEqual(awsConfiguration.region);
    expect(actual.streamName).toEqual(loggingConfiguration.kinesisStream);
    expect(actual.objectMode).toEqual(loggingConfiguration.kinesisObjectMode);
  });
});
