import { Request, Response } from "express";
import multer from "multer";
import path from "path";

var fs = require('fs');

type Member = {
    name: string,
    age: number,
    email: string,
    fileName: string
}
const updateMember = async (req: Request, res: Response) => {


    const files: any = req.files;
    console.log('files:', files.avatar)

    // var oldpath = files.filetoupload.path;
    // // var newpath = 'C:/Users/Your Name/' + files.filetoupload.name;
    // var newpath = '/uploads';
    // fs.rename(oldpath, newpath, function (err: any) {
    //   if (err) throw err;
    //   res.write('File uploaded and moved!');
    //   res.end();
    // });

    // if (files.avatar) {
    //     console.log('files:', files.avatar)
    // }
    let response = {
        status: "success",
        response: {}
    }
    res.send(response);


    try {


    } catch (error) {
        console.log('error:', error)


    }
};

export default updateMember;
let p = path.join(__dirname, './../../../uploads');
console.log("___________");
console.log(p);
console.log("___________");


// handle storage using multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, p);
    },
    filename: function (req, file, cb) {
        // cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
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

