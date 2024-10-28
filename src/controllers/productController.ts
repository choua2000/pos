import { Product } from "../entitys/product";
import { Request, Response } from "express";
import { AppDataSource } from "../configs/db";

const productRepository = AppDataSource.getRepository(Product);
 class productControllers {
    static async createProduct(req: Request, res: Response) {
        try {
            const {name, description, price} = req.body;
            if(!name || !description || !price){
                return res.status(400).json({message: "Please add all fields"});
            }

            const newProduct = productRepository.create({
                name,
                description,
                price
            });
            await productRepository.save(newProduct);
            return res.status(200).json({message: "Product created successfully",newProduct});
        } catch (error) {
            return res.status(500).json({message: "Internal server error",error});
        }
    }
    static async getProducts(req: Request, res: Response) {
        try {
            const products = await productRepository.find();
            return res.status(200).json({products});
        } catch (error) {
            return res.status(500).json({message: "Internal server error",error});
        }
    }
    static async deleteProduct(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const product = await productRepository.findOneBy({id});
            if(!product){
                return res.status(404).json({message: "Product not found"});
            }
            await productRepository.remove(product);
            console.log("deleted")
            return res.status(200).json({message: "Product deleted successfully"});
        } catch (error) {
            return res.status(500).json({message: "Internal server error",error});
        }
    }
    static async updateProduct(req: Request, res: Response) {
        try {
            const {id} = req.params;
            if(!id){
                return res.status(400).json({message: "Product not found"});
            }
            const {name, description, price} = req.body;
            if( !name || !description || !price){
                return res.status(400).json({message: "Please add all fields"});
            }
            const product = await productRepository.findOneBy({id});
            if(!product){
                return res.status(404).json({message: "Product not found"});
            }
            if(!name || !description || !price){
                return res.status(400).json({message: "Please add all fields"});
            }
            product.name = name;
            product.description = description;
            product.price = price;
            await productRepository.save(product);
            return res.status(200).json({message: "Product updated successfully",product});
        } catch (error) {
            return res.status(500).json({message: "Internal server error",error});
        }
    }
    static async getProduct(req:Request,res:Response){
        try {
            const id = req.params.id;
            if(!id){
                return res.status(404).json({message:"Product not found"})
            }
            const data = await productRepository.findOneBy({id})
            if(!data){
                return res.status(404).json({message:"not found"})
            }
            await productRepository.save(data)
            return res.status(200).json({message:"One product", data})
        } catch (error) {
            return res.status(500).json({message:"Internal server error",error})
        }
    }
 }
 export default productControllers