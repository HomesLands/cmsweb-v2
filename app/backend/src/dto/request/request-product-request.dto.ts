import {
  IsNotEmpty,
  IsOptional,
  Min,
} from 'class-validator';
import { Expose } from 'class-transformer';
import { AutoMap } from '@automapper/classes';

export class CreateRequestProductRequestDto {
  // @IsNotEmpty({ message: "INVALID_PRODUCT_SLUG" })
  @IsOptional()
  @Expose()
  @AutoMap()
  product?: string;

  @IsNotEmpty({ message: "INVALID_REQUEST_PRODUCT_QUANTITY" })
  @Min(1, { message: "INVALID_REQUEST_PRODUCT_QUANTITY"})
  @Expose()
  @AutoMap()
  requestQuantity?: number;

  @IsNotEmpty({ message: "INVALID_PRODUCT_NAME" })
  @Expose()
  @AutoMap()
  name?: string;

  @IsNotEmpty({ message: "INVALID_PRODUCT_PROVIDER" })
  @Expose()
  @AutoMap()
  provider?: string;

  @IsNotEmpty({ message: "INVALID_UNIT_SLUG" })
  @Expose()
  @AutoMap()
  unit?: string;

  @IsNotEmpty({ message: "INVALID_PRODUCT_DESCRIPTION" })
  @Expose()
  @AutoMap()
  description?: string;
}

export class UpdateRequestProduct {
  @IsNotEmpty({ message: "INVALID_REQUEST_PRODUCT_QUANTITY" })
  @Min(1, { message: "INVALID_REQUEST_PRODUCT_QUANTITY"})
  @Expose()
  @AutoMap()
  requestQuantity?: number;

  @IsNotEmpty({ message: "INVALID_PRODUCT_NAME" })
  @Expose()
  @AutoMap()
  name?: string;

  @IsNotEmpty({ message: "INVALID_PRODUCT_PROVIDER" })
  @Expose()
  @AutoMap()
  provider?: string;

  @IsNotEmpty({ message: "INVALID_UNIT_SLUG" })
  @Expose()
  @AutoMap()
  unit?: string;

  @IsNotEmpty({ message: "INVALID_PRODUCT_DESCRIPTION" })
  @Expose()
  @AutoMap()
  description?: string;
}

export class AddNewRequestProductRequestDto extends CreateRequestProductRequestDto {
  @IsNotEmpty({ message: "INVALID_FORM_SLUG" })
  @Expose()
  @AutoMap()
  form?: string;
}