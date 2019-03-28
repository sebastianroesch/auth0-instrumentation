"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var ConsoleStream = /** @class */ (function () {
    function ConsoleStream(configuration, spawnProcess) {
        if (spawnProcess === void 0) { spawnProcess = child_process_1.spawn; }
        this.name = "console-stream";
        if (configuration.useConsoleNiceFormat) {
            var bunyanFormatter = spawnProcess(__dirname + "/../../../node_modules/.bin/bunyan", ["--color"], {
                stdio: ["pipe", "inherit", "inherit"]
            });
            this.stream = bunyanFormatter.stdin;
        }
        else {
            this.stream = process.stdout;
        }
        this.level = configuration.logLevel;
    }
    return ConsoleStream;
}());
exports.ConsoleStream = ConsoleStream;
