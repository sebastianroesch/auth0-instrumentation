"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function hapiErrorReporterBuilder(client, options) {
    return function hapiErrorReporter(request, event) {
        // extract err, id depends on the hapi version.
        // for >= hapi17:
        //            - event has a property error
        //            - the id is on `request.info.id`
        // for < hapi17:
        //            - event is the directly the error
        //            - the id is on `request.id`
        var err = event.isBoom ? event : event.error;
        var id = request.id ? request.id : request.info.id;
        client.captureError(err, {
            extra: {
                timestamp: request.info.received,
                id: id,
                method: request.method,
                path: request.path,
                payload: request.pre && request.pre._originalPayload,
                query: request.query,
                remoteAddress: request.info.remoteAddress,
                userAgent: request.raw.req.headers["user-agent"]
            },
            tags: options.tags
        });
    };
}
exports.hapiErrorReporterBuilder = hapiErrorReporterBuilder;
