"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FileStream = /** @class */ (function () {
    function FileStream(configuration) {
        this.name = "file-stream";
        this.level = configuration.logLevel;
        if (configuration.logFilename) {
            this.path = configuration.logFilename;
        }
    }
    return FileStream;
}());
exports.FileStream = FileStream;
