import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

export async function validateRequestData<T extends object> (
  requestDto: new (...args: any[]) => T,
  data: any
): Promise<{ error: boolean; message: string; dto: T }> {
  const dto = plainToClass(requestDto, data);
  const errors: ValidationError[] = await validate(dto);
  
  if (errors.length > 0) {
    const message: string = errors
      .map(error => Object.values(error.constraints || {}))
      .join(', ');

    return { error: true, message, dto };
  }

  return { error: false, message: 'Success', dto };
}