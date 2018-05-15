const parser = require('./parser');
const universalDateConstructor = require('./universal-date-constructor');
const utils = require('./utils');


class RDate {
  constructor(optionsOrDateString, parseFormat) {

    if(optionsOrDateString === 'sweden') {
      optionsOrDateString = utils.currentTimeInSweden()
    } 
    
    if (typeof optionsOrDateString === 'string') {
      this._d = universalDateConstructor(optionsOrDateString, parseFormat);

      if (parser.hasHoursAndMinutes(optionsOrDateString)) {
        const hoursAndMinutes = parser.getHoursAndMinutesFromDateString(
          optionsOrDateString
        );

        if (hoursAndMinutes) {
          const [hh, mm, ss] = hoursAndMinutes.split(':');

          this._d.setHours(
            parseInt(hh, 10) || 0,
            parseInt(mm, 10) || 0,
            parseInt(ss, 10) || 0,
            0
          );
        } else {
          this._d.setHours(0, 0, 0, 0);
        }
      } else {
        this._d.setHours(0, 0, 0, 0);
      }

      if (this._d === 'Invalid Date') {
        throw new TypeError('Invalid Date');
      }
    } else if (optionsOrDateString instanceof Date) {
      this._d = new Date(optionsOrDateString);
    } else {
      this._d = new Date();
    }
  }

  /**
   *
   */
  valueOf() {
    return this._d.getTime();
  }

  /**
   *
   * @param {*} numberOfDays
   */
  addDays(numberOfDays) {
    const instance = this.copy();
    instance._d.setDate(instance._d.getDate() + numberOfDays);
    return instance;
  }

  /**
   *
   * @param {*} numberOfMinutes
   */
  addMinutes(numberOfMinutes) {
    const instance = this.copy();
    instance._d.setMinutes(instance._d.getMinutes() + numberOfMinutes);
    return instance;
  }

  /**
   *
   * @param {*} formatOption
   */
  format(formatOption) {
    const selectedFormat = parser.getFormat(formatOption);

    if (!selectedFormat) {
      throw new TypeError(`Unsupported format ${formatOption}`);
    }

    switch (selectedFormat) {
      case 1:
        return parser.asYearAndDate(this._d);
        break;

      case 2:
        return parser.asHoursAndMinutes(this._d);
        break;

      case 3:
        return parser.asDateTime(this._d);
        break;

      case 4:
        return parser.asDateTimeWithDelimiterT(this._d);
        break;

      case 5:
        return `${this._d.getTime()}`;
        break;

      case 6:
        return parser.asDateTimeWithSeconds(this._d);

      case 7:
        return parser.asDateTimeWithSecondsWithDelimiterT(this._d);
    }
  }

  /**
   *
   * @param {*} rdateObject
   */
  isSame(rdateObject) {
    if (!(rdateObject instanceof RDate)) {
      throw new TypeError('First argument of unknown type');
    }
    return rdateObject.valueOf() === this._d.valueOf();
  }

  /**
   *
   * @param {*} dateString
   */
  isBefore(dateString) {
    const compareDate = new RDate(dateString);
    return this._d < compareDate;
  }

  /**
   *
   * @param {*} dateString
   */
  isAfter(dateString) {
    const compareDate = new RDate(dateString);
    return this._d > compareDate;
  }

  /**
   *
   */
  getWeek() {
    const copyDate = new Date(
      Date.UTC(this._d.getFullYear(), this._d.getMonth(), this._d.getDate())
    );

    copyDate.setUTCDate(
      copyDate.getUTCDate() + 4 - (copyDate.getUTCDay() || 7)
    );

    const yearStart = new Date(Date.UTC(copyDate.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil(((copyDate - yearStart) / 86400000 + 1) / 7);

    return weekNo;
  }

  /**
   *
   * @param {*} rdateObject
   */
  diffDays(rdateObject) {
    const timeDifference = Math.abs(rdateObject.valueOf() - this._d.valueOf());
    let differenceInDays = Math.floor(timeDifference / (1000 * 3600 * 24));

    if (differenceInDays && rdateObject > this._d) {
      differenceInDays = differenceInDays * -1;
    }

    return differenceInDays;
  }

  /**
   *
   */
  copy() {
    return new RDate(this._d);
  }

  /**
   *
   */
  rawDiff(rdateObject) {
    const timeDifference = Math.abs(rdateObject.valueOf() - this._d.valueOf());
  }
}

/**
 *
 * Creates a new rdate object
 *
 * @param {*} optionsOrDateString
 * @param {*} parseFormat
 */
module.exports = function rdate(optionsOrDateString, parseFormat) {
  return new RDate(optionsOrDateString, parseFormat);
};
