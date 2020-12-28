/**
 * Source (of inspiration):
 * @link https://raw.githubusercontent.com/laracasts/Vue-Forms/master/public/js/app.js
 */
class Errors {
  /**
   * Create a new Errors instance.
   */
  constructor() {
    this._errors = {};
  }

  /**
   * Determine if an errors exists for the given field.
   *
   * @param {string} field
   */
  has(field) {
    return Object.prototype.hasOwnProperty.call(this._errors, field);
  }

  /**
   * Determine if we have any errors.
   */
  any() {
    return Object.keys(this._errors).length > 0;
  }

  /**
   * Retrieve the first error message for a field.
   *
   * @param {string} field
   */
  getFirst(field) {
    if (this._errors[field]) {
      return this._errors[field][0];
    }
  }

  /**
   * Retrieve all error messages for a field.
   *
   * @param {string} field
   */
  get(field) {
    if (this._errors[field]) {
      return this._errors[field];
    }
  }

  /**
   * Record the new errors.
   *
   * @param {object} errors
   */
  record(errors) {
    this._errors = errors;
  }

  /**
   * Clear one or all error fields.
   *
   * @param {string|null} field
   */
  clear(field = null) {
    if (field) {
      delete this._errors[field];

      return;
    }

    this._errors = {};
  }
}

export default Errors;
