import mongoose from 'mongoose';
import memberSchema from '../schemas/member.schema.js';

const Member = mongoose.model('Member', memberSchema);

const createMember = async (data) => {
    try {
        const formattedId = new mongoose.Types.ObjectId(data.userId);
        data.userId = formattedId;
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

const findMember = async (filter) => {
    try {
        const member = await Member.findOne(filter).exec();

        return member;
    } catch (error) {
        console.log(error);
    }
}

const findMembers = async (filter) => {
    try {
        const { userId } = filter;
        const formattedId = new mongoose.Types.ObjectId(userId);
        const members = await Member.find({ userId: formattedId });

        return members;
    } catch (error) {
        console.log(error);
    }
}

const updateMember = async (member) => {
    try {
        member.save();
    } catch (error) {
        console.log(error);
    }
}

const deleteMember = async (conditions) => {
    try {
        const result = await Member.where().findOneAndDelete(conditions).exec();

        return result;
    } catch (error) {
        console.log(error);
    }
}

export {
    Member,
    createMember,
    memberExists,
    findMember,
    findMembers,
    updateMember,
    deleteMember,
};