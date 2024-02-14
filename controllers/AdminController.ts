import { Request,Response,NextFunction } from "express";
import { CreateVandorInput } from "../dto/Vandor.dto";
import { Vandor } from "../models";
import {GeneratePassword,GenerateSalt} from "../utility"

export const FindVandor= async(id:string| undefined,email?:string)=>{
    if(email){
        return await Vandor.findOne({email:email})
    }else{
        return await Vandor.findById(id)
    }
}

export const CreateVandor = async (req:Request,res:Response,next: NextFunction) => {
    const {name,address,pincode,foodType,email,password,ownerName,phone}= <CreateVandorInput>req.body
    
    const existingVandor= await FindVandor("",email)


    if(existingVandor !==null){
        return res.json({"message": "A Vandor already exisits"})
    }

    const salt = await GenerateSalt()
    const userPassword= await GeneratePassword(password,salt)

    const createdVandor= await Vandor.create({
        name:name,
        address:address,
        pincode:pincode,
        foodType:foodType,
        email:email,
        password:userPassword,
        ownerName:ownerName,
        phone:phone,
        rating:0,
        salt:salt,
        serviceAvailable:false,
        coverImages:[],
        foods:[]
    })

    return res.json(createdVandor)
}

export const GetVandors = async (req:Request,res:Response,next: NextFunction) => {
    const vandors= await Vandor.find()

    if(vandors!==null){
        return res.json(vandors)
    }
    return res.json({"mesage":"Vandors data not available"})
}

export const GetVandorByID = async (req:Request,res:Response,next: NextFunction) => {
    
    const vandorID = req.params.id
    
    const vandor= await FindVandor(vandorID)
    
    if (vandor !==null){
        return res.json(vandor)
    }
    return res.json({"mesage":"Vandors data not available"})
}