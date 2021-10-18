import { Request, Response } from "express";
import { MemberInterface } from "../../../src/models/member_model";
import member_service from "../../../src/service/member_service";
const faker = require('faker');


type Member = {
    id: string,
    name: string,
    age: number,
    email: string,
    fileName: string
}
const getMembers = async (req: Request, res: Response) => {


    let members: Array<MemberInterface> = [];

    members = await member_service.getMemberList();


    // for (let i = 0; i < 10; i++) {
    //     let id = faker.random.uuid();
    //     let name = faker.name.findName();
    //     let email = faker.internet.email();
    //     let fileName = faker.image.imageUrl();
    //     let age = faker.random.number({ min: 18, max: 100 });
    //     members.push({
    //         id, name, age, email, fileName
    //     })
    // }



    try {


        res.send(members);

    } catch (error) {
        console.log('error:', error)


    }
};

export default getMembers;