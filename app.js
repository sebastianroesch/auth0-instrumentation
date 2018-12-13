const appmetrics = require('appmetrics');
const agent = require('./index.js');

appmetrics.configure({
  mqtt: 'off',
  profiling: 'off'
});

agent.init({name: 'test'}, process.env);
const monitor = appmetrics.monitor();
agent.metrics.startRuntimeCollection(appmetrics, monitor);

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  agent.metrics.incrementOne('http.request');
  res.send('Hello World!');
});

const profileHTTP = new agent.http.DebugRuntimeToggle('profiling', monitor);

app.post('/debug/v8/profiling', profileHTTP.toggle);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
