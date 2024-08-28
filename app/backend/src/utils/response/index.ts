import { Request, Response } from 'express';
import { validate, ValidationError } from 'class-validator';

import { ApiResponseDto } from '@utils/response/base.response';

export function sendResponse<T extends object>(
  req: Request,
  res: Response,
  error: boolean = false,
  code: number,
  message: string,
  result: T,
) {
  let messageSent: string = message;
  let codeSent: number = code;
  let errorSent: boolean = error;
  if(!errorSent) {
    validate(result).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        errorSent = true;
        codeSent = 400;
        messageSent = errors
        .map(error => Object.values(error.constraints || {}))
        .join(', ');
  
        const response = new ApiResponseDto<T>(
          errorSent,
          codeSent,
          messageSent,
          req.method,
          req.originalUrl,
          {} as T,
        );
        
        res.status(codeSent).json(response);
      } else {  
        const response = new ApiResponseDto<T>(
          errorSent,
          codeSent,
          messageSent,
          req.method,
          req.originalUrl,
          result,
        );
        
        res.status(codeSent).json(response);
      }
    });
  } else {
    const response = new ApiResponseDto<T>(
      errorSent,
      codeSent,
      messageSent,
      req.method,
      req.originalUrl,
      result,
    );
    
    res.status(codeSent).json(response);
  }
}
