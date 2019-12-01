import { ErrorCode } from '../types/errors';

export const throwError = (code: ErrorCode, message: string, devMessage: string = '') => {
  const retVal: any = new Error(message);
  retVal.code = code;
  retVal.devMessage = devMessage;
  throw retVal;
};
