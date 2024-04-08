import {
    createMember,
    memberExists,
    findMember,
    findMembers,
    updateMember,
    deleteMember,
} from '../database/models/member.model.js';
import {
    updateAccounts,
    deleteAccounts,
} from '../database/models/account.model.js';

const addMember = async (req, res) => {
    try {
        if (!req.body.userId) {
            return res.status(401).json({ message: 'Not authorized.' });
        }
        if (!req.body.name) {
            return res.status(400).json({ message: 'Missing name.' })
        }

        if (await memberExists({ name: req.body.name, userId: req.body.userId })) {
            return res.status(400).json({ message: 'Name already exists.'});
        }

        const newMember = {
            name: req.body.name,
            userId: req.body.userId,
            accounts: [],
        }

        const result = createMember(newMember);
        res.status(201).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

const getMembers = async (req, res) => {
    try {
        const { userId } = req.body;
        const members = await findMembers({ userId: userId });
        res.status(200).json({
            data: members,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

const editMember = async (req, res) => {
    try {
        if (!req.params.currentName || !req.body.newName) {
            return res.status(400).json({ message: 'Missing a name.' });
        }

        const filter = { name: req.params.currentName };
        const member = await findMember(filter);
        if (!member) {
            return res.status(400).json({ message: 'Member not found.' });
        }

        const isNewNameTaken = await memberExists({ name: req.body.newName });
        if (!isNewNameTaken) {
            member.name = req.body.newName;
            await updateAccounts({ memberName: req.params.currentName }, { memberName: member.name });
            await updateMember(member);
        } else {
            return res.status(403).json({ message: 'Member name already exists.' });
        }

        return res.status(200).json({ message: 'Member name has been updated.' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

const removeMember = async (req, res) => {
    try {
        const conditions = { name: req.params.name };
        const result = await deleteMember(conditions);
        if (!result) {
            return res.status(404).json({ message: 'Member does not exist.' });
        }

        await deleteAccounts({ memberName: req.params.name });
        return res.status(200).json({ message: 'Member was successfully deleted.' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

export {
    addMember,
    getMembers,
    editMember,
    removeMember,
};