import { productRepository } from "@repositories";
import { logger } from "@lib/logger";
import { GlobalError } from "@exception/global-error";
import { ErrorCodes } from "@exception/error-code";
import { Product } from "@entities";

export class ProductUtils {
  /**
   * Update the quantity of product when have product warehouse is updated or added new
   * @param {number} quantityProductWarehouseAddNew
   * @param {Product} productData
   * @returns {void}
   */
  static async updateQuantityProductWhenProductWarehouseChange(
    quantityProductWarehouseAddNew?: number,
    productData?: Product
  ): Promise<void> {
    try {
      if(!productData) throw new GlobalError(ErrorCodes.PRODUCT_NOT_FOUND);
      if(!('quantity' in productData && typeof productData.quantity === 'number')) 
        throw new GlobalError(ErrorCodes.PRODUCT_NOT_FOUND);

      if(!quantityProductWarehouseAddNew) 
        throw new GlobalError(ErrorCodes.MISSING_QUANTITY_PRODUCT_WAREHOUSE_ADD_NEW)

      productData.quantity += quantityProductWarehouseAddNew;
      await productRepository.save(productData);
      return;
    } catch (error) {
      logger.error(error);
      throw new GlobalError(ErrorCodes.ERROR_WHEN_UPDATE_PRODUCT_QUANTITY);
    }
  } 
}