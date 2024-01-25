import mongoose from 'mongoose';
import memberSchema from '../schemas/member.schema.js';

const Member = mongoose.model('Member', memberSchema);

const createMember = async (data) => {
    try {
        const member = await Member.create(data);
        return member;
    } catch (error) {
        console.log(error);
    }
}

const memberExists = async (filter) => {
    try {
        const result = await Member.exists(filter);
        return result;
    } catch (error) {
        console.log(error);
    }
}

export { Member, createMember, memberExists };