import { getRepository } from "typeorm";
import { Product } from "../Entities/productEntities";
import { AppError } from "../Errors";
import { IProductProps } from "../Types";

export const createProductService = async (data: IProductProps, isAdm: boolean) => {
  const { name } = data
  if (isAdm) {
    try {
      const productRepository = getRepository(Product)
      let product = await productRepository.findOne({ name }) 
      
      if (!product) {
        product = productRepository.create(data)
    
        await productRepository.save(product)
    
        return product
      } else {
        throw new AppError('Product already registered', 400)
      }
  
    } catch (err) {
      throw new AppError((err as any).message, 400)
    }
  } else {
    throw new AppError('Unsifficient permission', 401)
  }
}
