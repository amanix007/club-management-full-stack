
import { Router } from "express";
import createMember, { upload } from "../../../controller/member/create-member";
import updateMember, { upload as upload2} from "../../../controller/member/update-member";
import getMembers from "../../../controller/member/get-members";

const MemberRouter = Router();



MemberRouter.post("/create-member", upload.single('dataFile'), createMember);
MemberRouter.put("/update-member", upload2.single('dataFile'), updateMember);
MemberRouter.get("/get-members", getMembers);


export default MemberRouter;