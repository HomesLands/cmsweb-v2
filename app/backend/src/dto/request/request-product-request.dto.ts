import {
  IsNotEmpty,
  Min,
} from 'class-validator';
import { Expose } from 'class-transformer';
import { AutoMap } from '@automapper/classes';

export class CreateRequestProductRequestDto {
  @IsNotEmpty()
  @Expose()
  @AutoMap()
  productSlug?: string;

  @IsNotEmpty()
  @Min(1)
  @Expose()
  @AutoMap()
  requestQuantity?: number;
}