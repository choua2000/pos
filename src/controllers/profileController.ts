import { Profile } from "../entitys/profile";
import { Request, Response } from "express";
import { AppDataSource } from "../configs/db";

const profileRepository = AppDataSource.getRepository(Profile);

class ProfileController {
   static async createProfile(req: Request, res: Response) {
       try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({message: "User id not found"});
        }
        const {url, userId} = req.body;
        if(!url || !userId){
            return res.status(400).json({message: "Profile image is required"});
        }
        const newProfile = profileRepository.create({
            url,
            userId: id
        })
        await profileRepository.save(newProfile);
        return res.status(200).json({message: "Profile created successfully",newProfile});
       } catch (error) {
        return res.status(500).json({message: "Internal server error",error});
       }    
    }
    // static async getProfile(req: Request, res: Response) {
    //     try {
    //         const {id} = req.params;
    //         if(!id){
    //             return res.status(400).json({message: "User id not found"});
    //         }
    //         const profile = await profileRepository.findOne({
    //            where: {id},
    //            relations:["user"]
    //         });
    //         if(!profile){
    //             return res.status(404).json({message: "Profile not found"});
    //         }
    //         return res.status(200).json({profile});
    //     } catch (error) {
    //         return res.status(500).json({message: "Internal server error",error});
    //     }
    // }
    static async getProfiles(req: Request, res: Response) {
        try {
            const profiles = await profileRepository.find({relations:["user"]});
            if(!profiles){
                return res.status(404).json({message: "Profile not found"});
            }
            return res.status(200).json({profiles});
        } catch (error) {
            return res.status(500).json({message: "Internal server error",error});
        }
    }
   static async deleteProfile(req: Request, res: Response) {
       try {
        const {id} = req.params;
        const profile = await profileRepository.findOneBy({userId: id});
        if(!profile){
            return res.status(404).json({message: "Profile not found"});
        }
        await profileRepository.remove(profile);
        return res.status(200).json({message: "Profile deleted successfully"});
       } catch (error) {
        return res.status(500).json({message: "Internal server error",error});
       }    
   }
   static async updateProfile(req: Request, res: Response) {
       try {
        const {id} = req.params;
        const profile = await profileRepository.findOneBy({userId: id});
        if(!profile){
            return res.status(404).json({message: "Profile not found"});
        }
        const {url} = req.body;
        if(!url){
            return res.status(400).json({message: "Profile image is required"});
        }
        profile.url = url;
        await profileRepository.save(profile);
        return res.status(200).json({message: "Profile updated successfully",profile});
       } catch (error) {
        return res.status(500).json({message: "Internal server error",error});
       }    
   }
}
export default  ProfileController;