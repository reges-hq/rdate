module.exports = {
  pad0(num) {
    return num < 10 ? `0${num}` : `${num}`;
  },

  currentTimeInSweden() {
    return new Date().toLocaleString('se-SE', {
      timeZone: 'Europe/Stockholm'
    });
  }
};