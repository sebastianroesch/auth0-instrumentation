"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AWSSettings_1 = require("src/configuration/AWSSettings");
var EnvironmentVariables_1 = require("src/configuration/EnvironmentVariables");
describe("AWSValues", function () {
    var actual;
    var environment;
    describe("constructor", function () {
        it("should map variables correctly", function () {
            environment = new EnvironmentVariables_1.EnvironmentVariables();
            environment.PURPOSE = "test-purpose";
            environment.RELEASE_CHANNEL = "test-channel";
            environment.AWS_REGION = "test-region";
            environment.ENVIRONMENT = "test-environment";
            environment.AWS_ACCESS_KEY_ID = "test-key";
            environment.AWS_ACCESS_KEY_SECRET = "test-secret";
            environment.AWS_SESSION_TOKEN = "test-token";
            environment.AWS_CREDENTIALS = "test-credentials";
            actual = new AWSSettings_1.AWSSettings(environment);
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
