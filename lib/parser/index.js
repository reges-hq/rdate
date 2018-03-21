const utils = require('../utils');
const formatOptions = require('./format-options');

const expHHMM = /(\d\d)\:(\d\d)\:?(\d\d)?$/;

module.exports = {
  /**
   *
   * @param {*} date
   */
  asYearAndDate(date) {
    const yyyy = date.getFullYear();
    const mm = utils.pad0(date.getMonth() + 1);
    const dd = utils.pad0(date.getDate());

    return `${yyyy}-${mm}-${dd}`;
  },

  asDateTimeWithSeconds(date) {
    const yyyy = date.getFullYear();
    const mm = utils.pad0(date.getMonth() + 1);
    const dd = utils.pad0(date.getDate());
    const hh = utils.pad0(date.getHours());
    const m = utils.pad0(date.getMinutes());
    const ss = utils.pad0(date.getSeconds());

    return `${yyyy}-${mm}-${dd} ${hh}:${m}:${ss}`;
  },

  asDateTimeWithSecondsWithDelimiterT(date) {
    const yyyy = date.getFullYear();
    const mm = utils.pad0(date.getMonth() + 1);
    const dd = utils.pad0(date.getDate());
    const hh = utils.pad0(date.getHours());
    const m = utils.pad0(date.getMinutes());
    const ss = utils.pad0(date.getSeconds());

    return `${yyyy}-${mm}-${dd}T${hh}:${m}:${ss}`;
  },

  /**
   *
   */
  asHoursAndMinutes(date) {
    const hh = utils.pad0(date.getHours());
    const m = utils.pad0(date.getMinutes());

    return `${hh}:${m}`;
  },

  /**
   *
   * @param {*} date
   */
  asDateTime(date) {
    const yyyy = date.getFullYear();
    const mm = utils.pad0(date.getMonth() + 1);
    const dd = utils.pad0(date.getDate());
    const hh = utils.pad0(date.getHours());
    const m = utils.pad0(date.getMinutes());

    return `${yyyy}-${mm}-${dd} ${hh}:${m}`;
  },

  /**
   *
   * @param {*} date
   */
  asDateTimeWithDelimiterT(date) {
    const yyyy = date.getFullYear();
    const mm = utils.pad0(date.getMonth() + 1);
    const dd = utils.pad0(date.getDate());
    const hh = utils.pad0(date.getHours());
    const m = utils.pad0(date.getMinutes());

    return `${yyyy}-${mm}-${dd}T${hh}:${m}`;
  },

  /**
   *
   * @param {*} formatOption
   */
  getFormat(formatOption) {
    const result = formatOptions[formatOption];
    return result;
  },

  /**
   *
   * @param {*} dateString
   */
  hasHoursAndMinutes(dateString) {
    return expHHMM.test(dateString);
  },

  /**
   *
   * @param {*} dateString
   */
  getHoursAndMinutesFromDateString(dateString) {
    const result = expHHMM.exec(dateString);

    if (result.length) {
      return result[0];
    }

    return undefined;
  }
};
