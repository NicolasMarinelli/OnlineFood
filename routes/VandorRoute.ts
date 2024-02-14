import express, {Request,Response,NextFunction} from "express";
import { AddFood, GetFoods, GetVandorProfile, UpdateVandorCoverImage, UpdateVandorProfile, UpdateVandorService, VandorLogin } from "../controllers/VandorController";
import { Authenticate } from "../middlewares/CommonAuth";
import multer from "multer"


const router = express.Router()

const imageStorage= multer.diskStorage({
    
    destination:function(req,file,cd){
        cd(null,"images")
    },
    filename: function(req,file,cd){
      
        cd(null,/*new Date().toISOString()+*/"_"+ file.originalname)
    }
})

const images = multer({storage: imageStorage}).array("images",10)

router.post("/login",VandorLogin)

router.use(Authenticate)
router.get("/profile",GetVandorProfile)
router.patch("/profile",UpdateVandorProfile)
router.patch("/coverimage",images,UpdateVandorCoverImage)
router.patch("/service",UpdateVandorService)


router.post("/food",images,AddFood)
router.get("/foods",GetFoods)

router.get("/",(req:Request, res: Response, next: NextFunction)=>{

    res.json({message:"hello from Vandor"})
})

export { router as VandorRoute}