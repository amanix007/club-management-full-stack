import { Request, Response } from "express";
import multer from "multer";
import path from "path";
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
// let p = path.join(__dirname, './../../../uploads');
let p = path.join(__dirname, './../../../public/images');
console.log("___________");
console.log(p);
console.log("___________");


// handle storage using multer
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, p);
//     },
//     filename: function (req, file, cb) {
//         // cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);

//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
// });


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // cb(null, './public/image');
        cb(null, p);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});


// const storage = multer.diskStorage({
//     destination: './uploads',
//     filename: function (req, file, cb) {
//         return cb(null, file.originalname)
//     }
// });
// const storage = multer.diskStorage({
//     destination: './uploads',
//     filename: function (req, file, cb) {
//         return cb(null, file.originalname)
//     }
// });

export const upload = multer({ storage: storage });

