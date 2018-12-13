


class DebugRuntimeToggle {
  constructor(metricType, monitor) {
    this.metricType = metricType;
    this.monitor = monitor;
    this.enabled = false;
    this.toggle = this.toggle.bind(this);
  }

  toggle(req, res) {
    const action = (this.enabled) ? 'disable' : 'enable';
    this.monitor[action](this.metricType);
    res.send({
      action: action,
      metricType: this.metricType,
    });
    this.enabled = !this.enabled;
  }
}

module.exports = {
  DebugRuntimeToggle: DebugRuntimeToggle,
};
