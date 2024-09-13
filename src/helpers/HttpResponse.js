const defaultExcludedKeys = ['__v', 'password'];

export class HttpResponse {
  constructor(data, options = {}) {
    const { statusCode = 200, count, limit, page, deleted } = options;

    this.statusCode = statusCode;

    if (Array.isArray(data)) {
      this.count = count;
      this.limit = limit;
      this.page = page;
      this.data = data.map((obj) => this.filteredObj(obj));
    } else if (typeof data === 'object') {
      deleted && (this.deleted = deleted);
      this.data = this.filteredObj(data);
    } else {
      this.data = data;
    }
  }

  filteredObj(obj) {
    const newObj = {};
    for (const key in obj) {
      if (defaultExcludedKeys.includes(key) === false) {
        newObj[key] = obj[key];
      }
    }
    return newObj;
  }
}
