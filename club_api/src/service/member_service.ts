import memberRepo from "../repo/member_repo";
import Member, { MemberInterface } from "../models/member_model";


export const updateMember = async (member: MemberInterface): Promise<void> => {
    return memberRepo.updateMember({
        ...member,
    });
};


export const createMember = async (member: MemberInterface): Promise<{ member: MemberInterface; }> => {
    return memberRepo.createMember({
        ...member,
    });
};

export const getMemberList = async (): Promise<MemberInterface[]> => {
    return memberRepo.getMemberList();
};
export const getMemberDetails = async (id: number): Promise<MemberInterface | null> => {
    return memberRepo.getMemberDetails(id);
};
export const deleteMember = async (id: number): Promise<boolean> => {
    if (await memberRepo.deleteMember(id) > 0) {
        return true;
    }
    return false;
};

export const existByEmail = async (email: string): Promise<boolean> => {
    const mmbr = await memberRepo.getByEmail(email);
    return mmbr ? true : false;
};



export default {
    createMember,
    updateMember,
    existByEmail,
    getMemberList,
    getMemberDetails,
    deleteMember
};