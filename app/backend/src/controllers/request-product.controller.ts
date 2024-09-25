import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

import { requestProductService } from "@services";
import { TAddNewRequestProductRequestDto, TApiResponse, TChangeQuantityRequestProductRequestDto } from "@types";
import { RequestProductResponseDto } from "@dto/response";

class RequestProductController {
/**
 * @swagger
 * components:
 *   schemas:
 *     ChangeQuantityRequestProductRequestDto:
 *       type: object
 *       required:
 *         - slug
 *         - newQuantity
 *       properties:
 *         slug:
 *           type: string
 *           description: The slug of the request product.
 *         newQuantity:
 *           type: integer
 *           description: The new quantity of the product being requested.
 *       example:
 *         slug: KeYdkmeNg
 *         newQuantity: 10
 *
 *     AddNewRequestProductRequestDto:
 *       type: object
 *       required:
 *         - productSlug
 *         - formSlug
 *         - requestQuantity
 *       properties:
 *         productSlug:
 *           type: string
 *           description: The slug of the product being added.
 *         formSlug:
 *           type: string
 *           description: The slug of the form to add the new request product.
 *         requestQuantity:
 *           type: integer
 *           description: The quantity of the requested product.
 *       example:
 *         productSlug: KeYdkmeNg
 *         formSlug: formSlug-123
 *         requestQuantity: 10
 */

  /**
   * @swagger
   * tags:
   *   - name: RequestProduct
   *     description: The request product managing API
   */

  /**
   * @swagger
   * /requestProducts/{slug}:
   *   delete:
   *     summary: Delete request product
   *     tags: [RequestProduct]
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: path
   *         name: slug
   *         schema:
   *           type: string
   *         required: true
   *         description: The slug of request product
   *         example: slug-123
   *     responses:
   *       200:
   *         description: Delete request product successfully.
   *       500:
   *         description: Server error
   */
  public async deleteRequestProductInProductRequisitionForm(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { slug } = req.params;
      const creatorId = req.userId as string;
      const deletedRequestProduct = 
        await requestProductService.deleteRequestProductInProductRequisitionForm(
          slug,
          creatorId
        );
      const response: TApiResponse<RequestProductResponseDto> = {
        code: StatusCodes.OK,
        error: false,
        message: "Delete request product successfully",
        method: req.method,
        path: req.originalUrl,
        result: deletedRequestProduct,
      };
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /requestProducts/updateQuantity:
   *   patch:
   *     summary: Change quantity request product of product requisition form
   *     tags: [RequestProduct]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/ChangeQuantityRequestProductRequestDto'
   *     responses:
   *       200:
   *         description: Change quantity request product successfully.
   *         content:
   *           application/json:
   *             schema:
   *       500:
   *         description: Server error
   *
   */
  public async changeQuantityRequestProductInProductRequisitionForm(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data = req.body as TChangeQuantityRequestProductRequestDto;
      const creatorId = req.userId as string;
      const requestProduct = 
        await requestProductService.changeQuantityRequestProductInProductRequisitionForm(
          data,
          creatorId
        );
      const response: TApiResponse<RequestProductResponseDto> = {
        code: StatusCodes.OK,
        error: false,
        message: "Change quantity request product successfully",
        method: req.method,
        path: req.originalUrl,
        result: requestProduct,
      };
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @swagger
   * /requestProducts:
   *   post:
   *     summary: Add new request product for product requisition form
   *     tags: [RequestProduct]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *              $ref: '#/components/schemas/AddNewRequestProductRequestDto'
   *     responses:
   *       200:
   *         description: Add new request product  successfully.
   *         content:
   *           application/json:
   *             schema:
   *       500:
   *         description: Server error
   *
   */
  public async addNewRequestProductInProductRequisitionForm(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data = req.body as TAddNewRequestProductRequestDto;
      const creatorId = req.userId as string;
      const requestProduct = 
        await requestProductService.addNewRequestProductInProductRequisitionForm(
          data,
          creatorId
        );
      const response: TApiResponse<RequestProductResponseDto> = {
        code: StatusCodes.OK,
        error: false,
        message: "Add new request product successfully",
        method: req.method,
        path: req.originalUrl,
        result: requestProduct,
      };
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default new RequestProductController();