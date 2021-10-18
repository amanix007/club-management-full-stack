import { home } from "../../controller/common";
import { Router } from "express";

const commonRouter = Router();

commonRouter.get("/", home);

export default commonRouter;