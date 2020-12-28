import Errors from "./Errors";
import HttpError from "@/stuff/HttpError";

/**
 * Source (of inspiration):
 * @link https://raw.githubusercontent.com/laracasts/Vue-Forms/master/public/js/app.js
 */
class Form {
  /**
   * Create a new Form instance.
   *
   * @param {object} data
   */
  constructor(data) {
    this._originalData = data;

    for (let field in data) {
      this[field] = data[field];
    }

    this.errors = new Errors();
  }

  /**
   * Fetch all relevant data for the form.
   */
  data() {
    let data = {};

    for (let property in this._originalData) {
      data[property] = this[property];
    }

    return data;
  }

  /**
   * Reset the form fields.
   */
  reset() {
    for (let field in this._originalData) {
      this[field] = this._originalData[field];
    }

    this.errors.clear();
  }

  /**
   * Hook form-related handlers to a promise.
   *
   * @param {Promise} connection
   */
  async hook(connection) {
    return connection
      .then((foo) => {
        // console.log('THEN hook')
        this.reset()
        return foo
      })
      .catch(async (error) => {
        if (error instanceof HttpError) {
          const data = await error.content()
          this.recordErrors(data?.errors || {})
          // console.log('CATCH hook', data)
        }
        throw error
      })
  }

  /**
   * Make a `then` promise handler.
   *
   * promise
   *   .then(form.onSuccess())
   *
   * The handler resets the form when called.
   */
  onSuccess() {
    return (passable) => {
      // console.log('THEN hook')
      this.reset()
      return passable
    }
  }

  /**
   * Make a `catch` promise handler.
   *
   * promise
   *   .catch(form.onError())
   *
   * The handler records errors from the HttpError-contained response body when called.
   */
  onError() {
    return async (error) => {
      if (error instanceof HttpError) {
        const data = await error.content()
        this.recordErrors(data?.errors || {})
        // console.log('CATCH hook', data)
      }
      throw error
    }
  }

  /**
   * Make a pair of promise handlers (pass and fail handlers).
   *
   * promise
   *   .then(...form.hooks())
   */
  hooks() {
    return [
      this.onSuccess(),
      this.onError(),
    ]
  }

  recordErrors(errors) {
    this.errors.record(errors);
  }
}

export default Form;
