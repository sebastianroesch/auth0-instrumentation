export function kinesisErrorHandler(err) {
  const errorMessages = ["Error on writing logs to Kinesis"];

  if (err) {
    errorMessages.push(
      JSON.stringify({
        message: err.message,
        records: err.records,
        stack: err.stack
      })
    );
  }

  console.error.apply(this, errorMessages);
}

export function webErrorHandler(err) {
  const errorMessages = ["Error on writing logs to web url"];

  if (err) {
    errorMessages.push(
      JSON.stringify({
        message: err.message,
        stack: err.stack
      })
    );
  }

  console.error.apply(this, errorMessages);
}
