import { Request, Response } from "express";

import { MemberInterface } from "../../../src/models/member_model";
import member_service from "../../../src/service/member_service";

var fs = require('fs');

type Member = {
    name: string,
    age: number,
    email: string,
    fileName: string
}
const createMember = async (req: Request, res: Response) => {

    console.log('req:', req)
    const { name, email, age } = req.body;

    const file: any = req.file;
    console.log('file:', file)



    try {
        if (await member_service.existByEmail(email)) {
            // return sendResponse(
            //     ResponseStatusType.BadRequestError,
            //     ResponseCodeType.E_ADD_USER,
            //     "This email already exists with another user.",
            //     null,
            //     null,
            //     [],
            //     res
            // );

            let response = {
                status: "fail",
                message: "This email already exists with another user.",
                response: {}
            }
            res.status(400).send(response);
        }

        const memberData = {
            name,
            age: parseInt(age),
            email,
            fileName: file.filename
        };
        const { member } = await member_service.createMember(
            memberData as MemberInterface,

        );
        if (member) {

            let response = {
                status: "success",
                response: member
            }
            res.send(response);
        }



    } catch (error) {
        console.log('error:', error)


    }
};

export default createMember;

