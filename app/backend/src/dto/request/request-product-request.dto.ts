import {
  IsNotEmpty,
  Min,
} from 'class-validator';
import { Expose } from 'class-transformer';
import { AutoMap } from '@automapper/classes';

export class CreateRequestProductRequestDto {
  @IsNotEmpty({ message: "INVALID_PRODUCT_SLUG" })
  @Expose()
  @AutoMap()
  productSlug?: string;

  @IsNotEmpty({ message: "INVALID_REQUEST_PRODUCT_QUANTITY" })
  @Min(1)
  @Expose()
  @AutoMap()
  requestQuantity?: number;
}