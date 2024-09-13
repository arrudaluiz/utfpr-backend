export class HttpError {
  constructor(error = {}) {
    let { statusCode = 500, message } = error;

    switch (error.name) {
      case 'CastError':
        if (error?.reason?.name === 'BSONError') {
          statusCode = 400;
          message = error.reason.message;
        }
        break;
      case 'ValidationError':
        statusCode = 400;
      default:
        break;
    }

    this.statusCode = statusCode;

    switch (statusCode) {
      case 400:
        this.name = 'BadRequestError';
        this.message = message || 'Something is wrong with the request.';
        break;
      case 401:
        this.name = 'UnauthorizedError';
        this.message =
          message ||
          'The client must authenticate itself to get the requested response.';
        break;
      case 403:
        this.name = 'ForbiddenError';
        this.message =
          message || 'The client does not have access rights to the content.';
        break;
      case 404:
        this.name = 'NotFoundError';
        this.message = message || 'The requested resource does not exist.';
        break;
      default:
        this.name = 'InternalServerError';
        this.message =
          message ||
          'Something is wrong with the server. Please try again later.';
    }

    this.errors = error.errors;
  }

  log(req) {
    console.error(
      req.method,
      req.baseUrl + req.url,
      this.statusCode,
      '- ' + this.name + ':',
      this.message
    );
  }
}
