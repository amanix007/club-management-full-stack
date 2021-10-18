import { Request, Response } from "express";
import multer from "multer";
import path from "path";
import { MemberInterface } from "../../../src/models/member_model";
import member_service from "../../../src/service/member_service";


type Member = {
    id: number,
    name: string,
    age: number,
    email: string,
    fileName: string
}
const updateMember = async (req: Request, res: Response) => {


    try {
        const { id, name, email, age } = req.body;
        const file: any = req.file;

        const memberData = {
            id,
            name,
            age: parseInt(age),
            email,

        } as MemberInterface;
        if (file) {
            if (file.hasOwnProperty("filename")) {
                memberData.fileName = file.filename
            }
        }
        await member_service.updateMember(memberData as MemberInterface);


        let response = {
            status: "success",
            response: {}
        }
        res.send(response);
    } catch (error) {
        console.log('error:', error)


    }
};

export default updateMember;

