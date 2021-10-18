
import { Router } from "express";
import createMember from "../../../controller/member/create-member";
import updateMember from "../../../controller/member/update-member";
import getMembers from "../../../controller/member/get-members";
import deleteMember from "../../../controller/member/delete-member";
import { upload } from "../../../misc/common";
import getMemberDetails from "../../../controller/member/get-member-details";


const MemberRouter = Router();



MemberRouter.post("/create-member", upload.single('avatar'), createMember);
MemberRouter.put("/update-member", upload.single('avatar'), updateMember);
MemberRouter.get("/get-members", getMembers);
MemberRouter.get("/get-member-details/:id", getMemberDetails);
MemberRouter.delete("/delete-member/:id", deleteMember);


export default MemberRouter;