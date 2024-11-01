import { CreateProductPurchaseFormWithoutProductRequisitionFormRequestDto } from "@dto/request";
import { productPurchaseFormRepository, productRepository, temporaryProductRepository, unitRepository } from "@repositories";
import { TCreateProductPurchaseFormWithoutProductRequisitionFormRequestDto } from "@types";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { productPurchaseFormService } from "@services";
import { ErrorCodes, GlobalError, ValidationError } from "@exception";
import { mapper } from "@mappers";

jest.mock("@repositories");
jest.mock("@mappers", () => ({
  mapper: {
    mapArray: jest.fn(),
    map: jest.fn(),
  },
}));

jest.mock('class-validator', () => {
  const actualClassValidator = jest.requireActual('class-validator');
  return {
    ...actualClassValidator,
    validate: jest.fn(),
  };
});

jest.mock('class-transformer', () => {
  const actualClassValidator = jest.requireActual('class-transformer');
  return {
    ...actualClassValidator,
    plainToClass: jest.fn(),
  };
});

describe("Product purchase form service", () => {
  describe("Create product purchase form without product requisition form", () => {
    // test("Create product purchase form without product requisition form successfully", async () => {
    //   const plainData: TCreateProductPurchaseFormWithoutProductRequisitionFormRequestDto = {
    //     code: "YCMH-123",
    //     description: "Mua gấp",
    //     purchaseProducts: [
    //       {
    //         purchaseQuantity: 5,
    //         product: "product-slug-1",
    //         name: "product-1",
    //         provider: "Bosh",
    //         unit: "unit-slug-1",
    //         description: "loại lớn"
    //       },
    //       {
    //         purchaseQuantity: 10,
    //         temporaryProduct: "temporary-product-slug-1",
    //         name: "temporary-product-1",
    //         provider: "Bosh",
    //         unit: "unit-slug-1",
    //         description: "loại lớn"
    //       },
    //     ]
    //   };

    //   const requestData: CreateProductPurchaseFormWithoutProductRequisitionFormRequestDto = {
    //     code: "YCMH-123",
    //     description: "Mua gấp",
    //     purchaseProducts: [
    //       {
    //         purchaseQuantity: 5,
    //         product: "product-slug-1",
    //         name: "product-1",
    //         provider: "Bosh",
    //         unit: "unit-slug-1",
    //         description: "loại lớn"
    //       },
    //       {
    //         purchaseQuantity: 10,
    //         temporaryProduct: "temporary-product-slug-1",
    //         name: "temporary-product-1",
    //         provider: "Bosh",
    //         unit: "unit-slug-1",
    //         description: "loại lớn"
    //       },
    //     ]
    //   };
    //   (plainToClass as jest.Mock).mockReturnValue(requestData);
    //   (validate as jest.Mock).mockResolvedValue([]);
    //   (productPurchaseFormRepository.existsBy as jest.Mock).mockResolvedValue(false);
    // });

    // it('should throw a ValidationError if validation fails', async () => {
    //   const requestData: CreateProductPurchaseFormWithoutProductRequisitionFormRequestDto = {
    //     code: "YCMH-123",
    //     description: "Mua gấp",
    //     purchaseProducts: [
    //       {
    //         purchaseQuantity: 5,
    //         product: "product-slug-1",
    //         name: "product-1",
    //         provider: "Bosh",
    //         unit: "unit-slug-1",
    //         description: "loại lớn"
    //       },
    //       {
    //         purchaseQuantity: 10,
    //         temporaryProduct: "temporary-product-slug-1",
    //         name: "temporary-product-1",
    //         provider: "Bosh",
    //         unit: "unit-slug-1",
    //         description: "loại lớn"
    //       },
    //     ]
    //   };
    //   (validate as jest.Mock).mockResolvedValue(['error']); // Mock validation errors
    //   await expect(
    //     productPurchaseFormService.createProductPurchaseFormWithoutProductRequisitionForm(requestData)
    //   ).rejects.toThrow(ValidationError);
    // });
  
    // it('should throw an error if code already exists', async () => {
    //   const requestData: CreateProductPurchaseFormWithoutProductRequisitionFormRequestDto = {
    //     code: "YCMH-123",
    //     description: "Mua gấp",
    //     purchaseProducts: [
    //       {
    //         purchaseQuantity: 5,
    //         product: "product-slug-1",
    //         name: "product-1",
    //         provider: "Bosh",
    //         unit: "unit-slug-1",
    //         description: "loại lớn"
    //       },
    //       {
    //         purchaseQuantity: 10,
    //         temporaryProduct: "temporary-product-slug-1",
    //         name: "temporary-product-1",
    //         provider: "Bosh",
    //         unit: "unit-slug-1",
    //         description: "loại lớn"
    //       },
    //     ]
    //   };
    //   (validate as jest.Mock).mockResolvedValue([]); // No validation errors
    //   (productPurchaseFormRepository.existsBy as jest.Mock).mockResolvedValue(true); // Mock code existence
    //   await expect(
    //     productPurchaseFormService.createProductPurchaseFormWithoutProductRequisitionForm(requestData)
    //   ).rejects.toThrow(TypeError);
    // })
  });
})