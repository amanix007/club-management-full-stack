import memberRepo from "../repo/member_repo";
import Member, { MemberInterface } from "../models/member_model";


export const createMember = async (member: MemberInterface): Promise<{ member: MemberInterface; }> => {
    return memberRepo.createMember({
        ...member,
    });
};

export const getMemberList = async (): Promise< MemberInterface[]> => {
    return memberRepo.getMemberList();
};

export const existByEmail = async (email: string): Promise<boolean> => {
    const mmbr = await memberRepo.getByEmail(email);
    return mmbr ? true : false;
};



export default {
    createMember,
    existByEmail,
    getMemberList
};