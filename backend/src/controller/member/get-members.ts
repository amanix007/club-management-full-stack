import { Request, Response } from "express";
const faker = require('faker');


type Member = {
    id: string,
    name: string,
    age: number,
    email: string,
    avatarPath: string
}
const getMembers = async (req: Request, res: Response) => {


    let members: Array<Member> = [];
    for (let i = 0; i < 10; i++) {
        let id = faker.random.uuid();
        let name = faker.name.findName(); // Caitlyn Kerluke
        let email = faker.internet.email(); // Rusty@arne.info
        let avatarPath = faker.image.imageUrl(); // Rusty@arne.info
        let age = faker.random.number({ min: 18, max: 100 });
        members.push({
            id, name, age, email, avatarPath
        })
    }

    console.log('members:', members)

    try {
        res.send(members);

    } catch (error) {
        console.log('error:', error)


    }
};

export default getMembers;