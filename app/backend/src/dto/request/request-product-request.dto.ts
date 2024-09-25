import {
  IsNotEmpty,
  IsOptional,
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
  @Min(1, { message: "INVALID_REQUEST_PRODUCT_QUANTITY"})
  @Expose()
  @AutoMap()
  requestQuantity?: number;
}

export class ChangeQuantityRequestProduct {
  @IsNotEmpty({ message: "INVALID_REQUEST_PRODUCT_SLUG" })
  @Expose()
  @AutoMap()
  slug?: string;

  @IsNotEmpty({ message: "INVALID_REQUEST_PRODUCT_QUANTITY" })
  @Min(1, { message: "INVALID_REQUEST_PRODUCT_QUANTITY"})
  @Expose()
  @AutoMap()
  newQuantity?: number;
}

export class AddNewRequestProduct {
  @IsNotEmpty({ message: "INVALID_PRODUCT_SLUG" })
  @Expose()
  @AutoMap()
  productSlug?: string;

  @IsNotEmpty({ message: "INVALID_FORM_SLUG" })
  @Expose()
  @AutoMap()
  formSlug?: string;

  @IsNotEmpty({ message: "INVALID_REQUEST_PRODUCT_QUANTITY" })
  @Min(1, { message: "INVALID_REQUEST_PRODUCT_QUANTITY"})
  @Expose()
  @AutoMap()
  requestQuantity?: number;
}