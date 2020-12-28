/**
 * API connector class.
 */
import HttpError from "@/stuff/HttpError";

class Connector {
  constructor(token = null) {
    this._bearer = token
  }

  bearer(token) {
    this._bearer = token
  }

  binding(code) {
    return (arg, ...args) => code.call(this, arg, ...args)
  }

  async loadBeeps() {
    return this.query(
      'GET',
      '/api/beeps'
    )
  }

  async postBeep(content) {
    return this.query(
      'POST',
      '/api/beeps',
      content,
    )
  }

  async authenticate(credentials) {
    return this.query(
      'POST',
      '/api/session',
      credentials,
    )
  }

  /**
   * Query an API endpoint sending and awaiting JSON-encoded data.
   *
   * @param {string} method
   * @param {string} url
   * @param {Object|null} data
   * @param {Object|null} params
   */
  async query(method, url, data = null, params = null) {
    // ?? flatten(params) // q-flat https://github.com/DylanPiercey/q-flat
    return new Promise((resolve, reject) => {
      const headers = {
        'Content-Type': 'application/json',
        cache: 'no-cache',
      }
      if (this._bearer) {
        headers.authorization = `Bearer ${this._bearer}`
      }
      // this is really a basic way to deal with query params, should be improved
      return fetch(url + (params ? '?' + new URLSearchParams(params) : ''), {
        method: method.toUpperCase(),
        body: data && JSON.stringify(data),
        headers,
      })
        .then((response) => {
          if (!response.ok) {
            throw new HttpError(response)
          }
          resolve(response.json());
        })
        .catch(error => {
          reject(error);
        })
    });
  }

  fuck__query(requestType, url, data, params) {
    // ?? flatten(params) // q-flat https://github.com/DylanPiercey/q-flat
    return new Promise((resolve, reject) => {
      fetch(url + '?' + new URLSearchParams(params), {
        method: requestType,
        body: data && JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          cache: 'no-cache',
        },
      })
        .then(function (response) {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          resolve(response.json());
        })
        .catch(reject)

      // axios[requestType](url, data)
      //   .then(response => {
      //     this.onSuccess(response.data);
      //
      //     resolve(response.data);
      //   })
      //   .catch(error => {
      //     this.onFail(error.response.data);
      //
      //     reject(error.response.data);
      //   });
    });
  }
}

export default Connector
