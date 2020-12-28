class HttpError extends Error {
  constructor(response, content = null, cause = null) {
    super(response.statusText || 'Connection to the API failed.');
    this.name = 'HttpError'
    this.cause = cause
    this.response = response
    this.data = content
  }

  text() {
    return this.response.statusText
  }

  code() {
    return this.response.statusCode
  }

  async content() {
    if (typeof this.data === 'undefined' || this.data === null) {
      return !this.response.bodyUsed ? this.response.json() : null
    }
    return this.data || null
  }
}

export default HttpError
