export default class Result {
  error;
  value;
  isError;
  constructor(isError, error, value) {
    this.isError = isError;
    this.error = error || {};
    this.value = value || {};
  }

  getValue() {
    return this.value;
  }

  getError() {
    return this.error;
  }

  static success(value) {
    return new Result(false, undefined, value);
  }

  static failed(error) {
    return new Result(true, error, undefined);
  }
}
