import { AWSSettings } from "src/configuration/AWSSettings";
import { EnvironmentVariables } from "src/configuration/EnvironmentVariables";

describe("AWSValues", () => {
  let actual: AWSSettings;
  let environment: EnvironmentVariables;

  describe("constructor", () => {
    it("should map variables correctly", () => {
      environment = new EnvironmentVariables();
      environment.PURPOSE = "test-purpose";
      environment.RELEASE_CHANNEL = "test-channel";
      environment.AWS_REGION = "test-region";
      environment.ENVIRONMENT = "test-environment";
      environment.AWS_ACCESS_KEY_ID = "test-key";
      environment.AWS_ACCESS_KEY_SECRET = "test-secret";
      environment.AWS_SESSION_TOKEN = "test-token";
      environment.AWS_CREDENTIALS = "test-credentials";

      actual = new AWSSettings(environment);
      expect(actual.environment).toEqual(environment.ENVIRONMENT);
      expect(actual.purpose).toEqual(environment.PURPOSE);
      expect(actual.region).toEqual(environment.AWS_REGION);
      expect(actual.releaseChannel).toEqual(environment.RELEASE_CHANNEL);
      expect(actual.accessKeyId).toEqual(environment.AWS_ACCESS_KEY_ID);
      expect(actual.accessKeySecret).toEqual(environment.AWS_ACCESS_KEY_SECRET);
      expect(actual.sessionToken).toEqual(environment.AWS_SESSION_TOKEN);
      expect(actual.credentials).toEqual(environment.AWS_CREDENTIALS);
    });
  });
});
