import Member, { MemberInterface } from "../models/member_model";

import sequelize from "../config/sequelize";
import { Op } from "sequelize";


export const get = async (userID: number): Promise<MemberInterface | null> => {
    return Member.findByPk(userID);
};

export const getMemberList = async (): Promise<MemberInterface[]> => {
    return Member.findAll({
        offset: 0, limit: 100,
        // order: [["id" ] ],
    });
};

export const getMemberDetails = async (id: number): Promise<MemberInterface | null> => {
    return Member.findOne({
        where: {
            id: id
        }
    });
};
export const deleteMember = async (id: number): Promise<number> => {
    return Member.destroy({
        where: {
            id: id
        }
    });
};

export const createMember = async (member: MemberInterface): Promise<{
    member: MemberInterface;
}> => {
    const transaction = await sequelize.transaction({});
    try {
        const mmbr = await Member.create(member, { transaction });

        await transaction.commit();

        return {
            member: mmbr.get({ plain: true }) as MemberInterface,

        };
    } catch (e) {
        await transaction.rollback();
        throw e;
    }
};
export const updateMember = async (member: MemberInterface): Promise<void> => {

    try {
        await Member.update({ ...member }, {
            where: {
                id: member.id
            }
        });




    } catch (e) {

        throw e;
    }
};

export const getByEmail = async (email: string): Promise<MemberInterface | null> => {
    return Member.findOne({
        where: {
            email: email
        }
    });
};



export const getByEmailOrMobileWithProfile = async (email: string, mobileNumber: string): Promise<MemberInterface | null> => {
    return Member.findOne({
        where: {
            mobileNumber,
            [Op.or]: [{
                email,
            }]
        },
        include: [Member.associations.profile]
    });
};

export const verifyEmailAddress = async (token: string): Promise<any> => {
    return Member.update({
        isVerified: true
    },
        {
            where: {
                verificationToken: token
            }
        }
    );
};

export const getByToken = async (token: string): Promise<MemberInterface | null> => {
    return Member.findOne({
        where: {
            verificationToken: token
        }
    });
};

export default {
    createMember,
    getByEmail,
    getMemberList,
    getMemberDetails,
    getByEmailOrMobileWithProfile,
    verifyEmailAddress,
    getByToken,
    deleteMember,
    updateMember
};