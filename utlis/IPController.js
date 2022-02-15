class IPController {
  constructor() {
    this.ipClickCounter = new Map();
  }

  counterControl(click) {
    if (this.ipClickCounter.has(click.ip)) {
      this.ipClickCounter.set(click.ip, this.ipClickCounter.get(click.ip) + 1);
    } else {
      this.ipClickCounter.set(click.ip, 1);
    }
  }

  /**
   * Get IPs repeated more than 10 times
   * @returns {Array} Banned IPs
   */
  getBannedIPs = () => {
    const ips = [];
    this.ipClickCounter.forEach((value, key) => {
      if (value > 10) {
        ips.push(key);
      }
    });
    return ips;
  };

  cleanRepeatedMoreThan10Times = (arrayData) => {
    const bannedIPs = this.getBannedIPs();
    const result = arrayData.filter((element) => !bannedIPs.includes(element.ip));
    return result;
  };
}

module.exports = IPController;
