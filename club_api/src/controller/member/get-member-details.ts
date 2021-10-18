import { Request, Response } from "express";
import { MemberInterface } from "../../models/member_model";
import member_service from "../../service/member_service";


type Member = {
    id: string,
    name: string,
    age: number,
    email: string,
    fileName: string
}
const getMemberDetails = async (req: Request, res: Response) => {

    let { id } = req.params;
    let member: MemberInterface | null;

    try {
        member = await member_service.getMemberDetails(parseInt(id));
        console.log('member:', member)
        if (member) {
            res.status(200).send({
                status: "success",
                response: member,
                message: "Successs"
            });


        } else {
            res.status(400).send({
                status: "failed",
                response: {},
                message: "Not Found"
            });
        }


    } catch (error) {
        console.log('error:', error)


    }
};

export default getMemberDetails;