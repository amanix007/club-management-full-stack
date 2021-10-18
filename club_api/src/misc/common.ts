import multer from "multer";
import path from "path";


let p = path.join(__dirname, './../../public/images');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, p);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});


export const upload = multer({ storage: storage });

// const setResponse = (res:Response, statusCode: number, status: string, responseObject: object, message: string) => : <Response>{
//    return res.status(statusCode).send({
//         status: status,
//         response: responseObject,
//         message: message
//     });
// }