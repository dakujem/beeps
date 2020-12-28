import {DateTime} from 'luxon'


const dateTimeSafe = (v) => {
  if (typeof v === 'undefined' || v === null || v instanceof DateTime) {
    return v
  }
  if (v instanceof Date) {
    return DateTime.fromJSDate(v)
  }
  return DateTime.fromMillis(v)
}

class BeepsContainer {
  constructor(connector) {
    this._connector = connector
    this._data = null // the data
    this.loading = false // loading new data?
    this.loaded = false // any usable data present?
    this.reset()
  }

  async reload() {
    this.loading = true
    const res = await this._connector.loadBeeps()
    this._data = res.data.map((d) => {
      // d.created_raw = d.created
      d.created = dateTimeSafe(d.created?.js)
      d.published = dateTimeSafe(d.published?.js)
      d.updated = dateTimeSafe(d.updated?.js)
      return d
    })
    this.loading = false
    this.loaded = true
  }

  reset() {
    this.loaded = false
    this.loading = false
  }

  data() {
    if (this.loaded) {
      return this._data
    }
    return null
  }
}

export default BeepsContainer
