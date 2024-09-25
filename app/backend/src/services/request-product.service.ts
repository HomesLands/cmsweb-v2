import { RequestProductResponseDto } from "@dto/response";
import { RequestProduct } from "@entities";
import {
  requestProductRepository,
  productRequisitionFormRepository,
  productRepository,
} from "@repositories";
import { GlobalError, ErrorCodes, ValidationError } from "@exception";
import { mapper } from "@mappers";
import { 
  TAddNewRequestProductRequestDto,
  TChangeQuantityRequestProductRequestDto,
  TCreateRequestProductRequestDto, 
} from "@types";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import {
  AddNewRequestProduct,
  ChangeQuantityRequestProduct,
  CreateRequestProductRequestDto, 
} from "@dto/request";
import { PermissionUtils } from "@utils";

class RequestProductService {
  public async deleteRequestProductInProductRequisitionForm (
    slug: string,
    creatorId: string,
  ): Promise<RequestProductResponseDto> {
    // CHECKING
    const requestProduct = await requestProductRepository.findOne({
      where: {
        slug: slug
      },
      relations: [
        'productRequisitionForm',
        'productRequisitionForm.creator',
        'product',
      ]
    });
    if(!requestProduct) throw new GlobalError(ErrorCodes.REQUEST_PRODUCT_NOT_FOUND);

    if(!requestProduct.productRequisitionForm) throw new GlobalError(ErrorCodes.FORM_NOT_FOUND);

    if(requestProduct.productRequisitionForm.creator) {
      if(requestProduct.productRequisitionForm.creator?.id !== creatorId) 
        throw new GlobalError(ErrorCodes.FORBIDDEN_EDIT_FORM);
    } else {
      // creator not found
      throw new GlobalError(ErrorCodes.FORBIDDEN_EDIT_FORM);
    }

    const isPermitEdit: boolean = PermissionUtils.isPermitEditProductRequisitionForm(
      requestProduct.productRequisitionForm.status,
      requestProduct.productRequisitionForm.isRecalled
    );
    if(!isPermitEdit) throw new GlobalError(ErrorCodes.CAN_NOT_EDIT_FORM);

    await requestProductRepository.remove(requestProduct);
    const deletedRequestProductDto = mapper.map(requestProduct, RequestProduct, RequestProductResponseDto);
    return deletedRequestProductDto;
  }

  public async changeQuantityRequestProductInProductRequisitionForm (
    plainData: TChangeQuantityRequestProductRequestDto,
    creatorId: string
  ): Promise<RequestProductResponseDto> {
    // CHECKING
    const requestData = plainToClass(ChangeQuantityRequestProduct, plainData);
    const errors = await validate(requestData);
    if(errors.length > 0) throw new ValidationError(errors);
    
    const requestProduct = await requestProductRepository.findOne({
      where: {
        slug: requestData.slug
      },
      relations: [
        'productRequisitionForm',
        'productRequisitionForm.creator',
        'product'
      ]
    });
    if(!requestProduct) throw new GlobalError(ErrorCodes.REQUEST_PRODUCT_NOT_FOUND);

    if(!requestProduct.productRequisitionForm) throw new GlobalError(ErrorCodes.FORM_NOT_FOUND);

    if(requestProduct.productRequisitionForm.creator) {
      if(requestProduct.productRequisitionForm.creator?.id !== creatorId) 
        throw new GlobalError(ErrorCodes.FORBIDDEN_EDIT_FORM);
    } else {
      // creator not found
      throw new GlobalError(ErrorCodes.FORBIDDEN_EDIT_FORM);
    }
    const isPermitEdit: boolean = PermissionUtils.isPermitEditProductRequisitionForm(
      requestProduct.productRequisitionForm.status,
      requestProduct.productRequisitionForm.isRecalled
    );
    if(!isPermitEdit) throw new GlobalError(ErrorCodes.CAN_NOT_EDIT_FORM);
    
    // UPDATE
    requestProduct.requestQuantity = requestData.newQuantity;
    const updatedData = await requestProductRepository.save(requestProduct);
    const updatedDataDto = mapper.map(updatedData, RequestProduct, RequestProductResponseDto);
    return updatedDataDto;
  }

  public async addNewRequestProductInProductRequisitionForm (
    plainData: TAddNewRequestProductRequestDto,
    creatorId: string
  ): Promise<RequestProductResponseDto> {
    // CHECKING
    const requestData = plainToClass(AddNewRequestProduct, plainData);
    const errors = await validate(requestData);
    if(errors.length > 0) throw new ValidationError(errors);

    const product = await productRepository.findOneBy({
      slug: requestData.productSlug,
    });
    if (!product) throw new GlobalError(ErrorCodes.PRODUCT_NOT_FOUND);

    const form = await productRequisitionFormRepository.findOne({
      where: {
        slug: requestData.formSlug
      },
      relations: [
        'requestProducts',
        'requestProducts.product',
        'creator'
      ]
    });
    if(!form) throw new GlobalError(ErrorCodes.FORM_NOT_FOUND);

    if(form.creator) {
      if(form.creator?.id !== creatorId) 
        throw new GlobalError(ErrorCodes.FORBIDDEN_EDIT_FORM);
    } else {
      // creator not found
      throw new GlobalError(ErrorCodes.FORBIDDEN_EDIT_FORM);
    }

    const formCheck = await productRequisitionFormRepository.findOne({
      where: {
        slug: requestData.formSlug,
        requestProducts: {
          product: {
            id: product.id
          }
        }
      },
    });

    if(formCheck) throw new GlobalError(ErrorCodes.REQUEST_PRODUCT_EXIST);

    const isPermitEdit: boolean = PermissionUtils.isPermitEditProductRequisitionForm(
      form.status,
      form.isRecalled
    );
    if(!isPermitEdit) throw new GlobalError(ErrorCodes.CAN_NOT_EDIT_FORM);

    // UPDATE
    const dataCreateRequestProduct: TCreateRequestProductRequestDto = {
      productSlug: requestData.productSlug,
      requestQuantity: requestData.requestQuantity,
    };

    const requestProductMapper = mapper.map(
      dataCreateRequestProduct,
      CreateRequestProductRequestDto,
      RequestProduct
    );
    requestProductMapper.productRequisitionForm = form;
    requestProductMapper.product = product;
    const createdRequestProduct = await requestProductRepository.createAndSave(requestProductMapper);
    const requestProductDto = mapper.map(
      createdRequestProduct,
      RequestProduct,
      RequestProductResponseDto,
    );
    return requestProductDto;
  }
}

export default new RequestProductService();