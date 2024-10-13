import { RequestProductResponseDto } from "@dto/response";
import { RequestProduct, TemporaryProduct } from "@entities";
import {
  requestProductRepository,
  productRequisitionFormRepository,
  productRepository,
  unitRepository,
  temporaryProductRepository,
} from "@repositories";
import { GlobalError, ErrorCodes, ValidationError } from "@exception";
import { mapper } from "@mappers";
import {
  TAddNewRequestProductRequestDto,
  TCreateRequestProductRequestDto,
  TUpdateRequestProductRequestDto,
} from "@types";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import {
  AddNewRequestProductRequestDto,
  CreateRequestProductRequestDto,
  CreateTemporaryProductRequestDto,
  UpdateRequestProduct,
} from "@dto/request";
import { PermissionUtils } from "@utils";
import { StatusCodes } from "http-status-codes";

class RequestProductService {
  public async deleteRequestProductInProductRequisitionForm(
    slug: string,
    creatorId: string
  ): Promise<RequestProductResponseDto> {
    // CHECKING
    const requestProduct = await requestProductRepository.findOne({
      where: {
        slug: slug,
      },
      relations: [
        "productRequisitionForm",
        "productRequisitionForm.creator",
        "product",
      ],
    });
    if (!requestProduct)
      throw new GlobalError(ErrorCodes.REQUEST_PRODUCT_NOT_FOUND);

    if (!requestProduct.productRequisitionForm)
      throw new GlobalError(ErrorCodes.FORM_NOT_FOUND);

    if (requestProduct.productRequisitionForm.creator) {
      if (requestProduct.productRequisitionForm.creator?.id !== creatorId)
        throw new GlobalError(StatusCodes.FORBIDDEN);
    } else {
      // creator not found
      throw new GlobalError(StatusCodes.FORBIDDEN);
    }

    const isPermitEdit: boolean =
      PermissionUtils.isPermitEditProductRequisitionForm(
        requestProduct.productRequisitionForm.status,
        requestProduct.productRequisitionForm.isRecalled
      );
    if (!isPermitEdit) throw new GlobalError(StatusCodes.FORBIDDEN);

    await requestProductRepository.softRemove(requestProduct);
    const deletedRequestProductDto = mapper.map(
      requestProduct,
      RequestProduct,
      RequestProductResponseDto
    );
    return deletedRequestProductDto;
  }

  public async updateRequestProductInProductRequisitionForm(
    slug: string,
    plainData: TUpdateRequestProductRequestDto,
    creatorId: string
  ): Promise<RequestProductResponseDto> {
    // CHECKING
    const requestData = plainToClass(UpdateRequestProduct, plainData);
    console.log({ slug });
    console.log({ requestData });
    const errors = await validate(requestData);
    if (errors.length > 0) throw new ValidationError(errors);

    const requestProduct = await requestProductRepository.findOne({
      where: {
        slug,
      },
      relations: [
        "productRequisitionForm",
        "productRequisitionForm.creator",
        "product",
        "temporaryProduct",
      ],
    });
    if (!requestProduct)
      throw new GlobalError(ErrorCodes.REQUEST_PRODUCT_NOT_FOUND);

    if (!requestProduct.productRequisitionForm)
      throw new GlobalError(ErrorCodes.FORM_NOT_FOUND);

    if (requestProduct.productRequisitionForm.creator) {
      if (requestProduct.productRequisitionForm.creator?.id !== creatorId)
        throw new GlobalError(StatusCodes.FORBIDDEN);
    } else {
      // creator not found
      throw new GlobalError(StatusCodes.FORBIDDEN);
    }
    const isPermitEdit: boolean =
      PermissionUtils.isPermitEditProductRequisitionForm(
        requestProduct.productRequisitionForm.status,
        requestProduct.productRequisitionForm.isRecalled
      );
    if (!isPermitEdit) throw new GlobalError(StatusCodes.FORBIDDEN);

    if (requestProduct.isExistProduct) {
      requestProduct.requestQuantity = requestData.requestQuantity;
      const updatedData = await requestProductRepository.save(requestProduct);
      const updatedDataDto = mapper.map(
        updatedData,
        RequestProduct,
        RequestProductResponseDto
      );
      return updatedDataDto;
    }

    // update temporary product
    if (!requestProduct.temporaryProduct)
      throw new GlobalError(ErrorCodes.REQUEST_PRODUCT_NOT_FOUND);
    const unit = await unitRepository.findOneBy({ slug: requestData.unit });
    if (!unit) throw new GlobalError(ErrorCodes.UNIT_NOT_FOUND);

    Object.assign(requestProduct.temporaryProduct, {
      name: requestData.name,
      provider: requestData.provider,
      unit: unit,
      description: requestData.description,
    });

    Object.assign(requestProduct, {
      requestQuantity: requestData.requestQuantity,
      description: requestData.description,
    });

    const updatedData = await requestProductRepository.save(requestProduct);
    const updatedDataDto = mapper.map(
      updatedData,
      RequestProduct,
      RequestProductResponseDto
    );
    return updatedDataDto;
  }

  public async addNewRequestProductInProductRequisitionForm(
    plainData: TAddNewRequestProductRequestDto,
    creatorId: string
  ): Promise<RequestProductResponseDto> {
    // CHECKING
    const requestData = plainToClass(AddNewRequestProductRequestDto, plainData);
    const errors = await validate(requestData);
    if (errors.length > 0) throw new ValidationError(errors);

    const form = await productRequisitionFormRepository.findOne({
      where: {
        slug: requestData.form,
      },
      relations: [
        "requestProducts",
        "requestProducts.product.unit",
        "requestProducts.temporaryProduct.unit",
        "creator",
      ],
    });
    if (!form) throw new GlobalError(ErrorCodes.FORM_NOT_FOUND);

    if (form.creator) {
      if (form.creator?.id !== creatorId)
        throw new GlobalError(StatusCodes.FORBIDDEN);
    } else {
      // creator not found
      throw new GlobalError(StatusCodes.FORBIDDEN);
    }

    const isPermitEdit: boolean =
      PermissionUtils.isPermitEditProductRequisitionForm(
        form.status,
        form.isRecalled
      );
    if (!isPermitEdit) throw new GlobalError(StatusCodes.FORBIDDEN);

    const dataCreateRequestProduct: TCreateRequestProductRequestDto = {
      product: requestData.product,
      requestQuantity: requestData.requestQuantity,
    };

    const requestProductMapper = mapper.map(
      dataCreateRequestProduct,
      CreateRequestProductRequestDto,
      RequestProduct
    );
    requestProductMapper.productRequisitionForm = form;

    let product = await productRepository.findOneBy({
      slug: requestData.product,
    });
    // khi product là null hoặc undefined,
    // typeORM sẽ bỏ qua và lấy phần tử đầu tiên chứ không trả thẳng về null
    if (requestData.product === null || requestData.product === undefined) {
      product = null;
    }

    if (product) {
      const formCheck = await productRequisitionFormRepository.findOne({
        where: {
          slug: requestData.form,
          requestProducts: {
            product: {
              id: product.id,
            },
          },
        },
      });
      if (formCheck) throw new GlobalError(ErrorCodes.REQUEST_PRODUCT_EXIST);
      requestProductMapper.product = product;
    } else {
      // note: if the name of new product like and shorter than existed temporary product => error
      // const formCheck = await productRequisitionFormRepository.findOne({
      //   where: {
      //     slug: requestData.form,
      //     requestProducts: {
      //       temporaryProduct: {
      //         name: Like(`%${requestData.name}%`)
      //       }
      //     }
      //   },
      // });
      // if(formCheck) throw new GlobalError(ErrorCodes.REQUEST_PRODUCT_EXIST);

      const unit = await unitRepository.findOneBy({
        slug: requestData.unit,
      });
      if (!unit) throw new GlobalError(ErrorCodes.UNIT_NOT_FOUND);

      const temporaryRequestProductData = mapper.map(
        requestData,
        CreateTemporaryProductRequestDto,
        TemporaryProduct
      );
      temporaryRequestProductData.unit = unit;
      const temporaryProduct = await temporaryProductRepository.createAndSave(
        temporaryRequestProductData
      );

      requestProductMapper.temporaryProduct = temporaryProduct;
      requestProductMapper.isExistProduct = false;
    }

    const createdRequestProduct =
      await requestProductRepository.createAndSave(requestProductMapper);
    const requestProductDto = mapper.map(
      createdRequestProduct,
      RequestProduct,
      RequestProductResponseDto
    );

    return requestProductDto;
  }
}

export default new RequestProductService();
