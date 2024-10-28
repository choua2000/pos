import { Customer } from "../entitys/customer";
import { Request, Response } from "express";
import { AppDataSource } from "../configs/db";

const customerRepository = AppDataSource.getRepository(Customer);
class CustomerController {
   static async createCustomer(req: Request, res: Response) {
    try {
        const { name, email, phone, address } = req.body;
        if (!name || !email || !phone || !address) {
            return res.status(400).json({ message: "Please add all fields" });
        }
        const checkcustomer = await customerRepository.findOneBy({ email });
        if (checkcustomer) {
            return res.status(400).json({ message: "Customer already exists" });
        }
        const newCustomer = await customerRepository.create({
            name,
            email,
            phone,
            address
        });
        await customerRepository.save(newCustomer);
        return res.status(200).json({ message: "Customer created successfully", newCustomer });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error });   
        }
    }

    static async getCustiomer(req: Request, res: Response) {
        try {
            const customers = await customerRepository.find({relations:["sale"]});
            if (!customers) {
                return res.status(404).json({ message: "Customer not found" });
            }
            return res.status(200).json({ customers });
        } catch (error) {
            return res.status(500).json({ message: "Internal server error", error });
        }
    }
    
}
export default CustomerController