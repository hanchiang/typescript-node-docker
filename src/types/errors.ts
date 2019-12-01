export enum ErrorCode {
  BAD_REQUEST = 'badRequest',
  INTERNAL_SERVER_ERROR = 'internalServerError',
  FORBIDDEN = 'forbidden',
  NOT_FOUND = 'notFound',
  CONFLICT = 'conflict',
  UNAUTHORIZED = 'unauthorized',
}

const HTTP_STATUSES = {
  [ErrorCode.BAD_REQUEST]: 400,
  [ErrorCode.UNAUTHORIZED]: 401,
  [ErrorCode.FORBIDDEN]: 403,
  [ErrorCode.NOT_FOUND]: 404,
  [ErrorCode.CONFLICT]: 409,
  [ErrorCode.INTERNAL_SERVER_ERROR]: 500,
};

/**
 * Get http status code by ErrorCode
 */
export const httpStatus = (code: ErrorCode): number => {
  return HTTP_STATUSES[code] || 500;
};
