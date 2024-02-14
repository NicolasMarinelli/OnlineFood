import express, {Request,Response,NextFunction} from  "express"
import { GetFoodAvailability, GetTopRestaurants, RestaurantsById, SeachFoods } from "../controllers"

const router= express.Router()

//**----food Availability ----*/
router.get("/:pincode",GetFoodAvailability)

//**----TOP restaurants ----*/

router.get("/topRestaurants/:pincode",GetTopRestaurants)
//**----food available in 30 minutes  ----*/
router.get("/foodsIn30min/:pincode",GetFoodAvailability)
//**----Sheach foods  ----*/
router.get("/search/:pincode",SeachFoods)
//**----Find Restaurant by id ----*/
router.get("/restaurant/:pincode",RestaurantsById)



export {router as ShoppingRoute}