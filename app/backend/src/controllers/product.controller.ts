import { Request, Response, NextFunction } from "express";

class ProductController {
  /**
   * @swagger
   * tags:
   *   - name: Product
   *     description: The product managing API
   */

  /**
   * @swagger
   * /users:
   *   get:
   *     summary: Get all products
   *     tags: [Product]
   *     responses:
   *       200:
   *         description: Get all products successfully.
   *       500:
   *         description: Server error
   */
  public async getAllProducts(req: Request, res: Response, next: NextFunction) {
    next();
  }
}

export default new ProductController();
