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

const addMember = async (request, response) => {
    try {
        if (!request.body.name) {
            return response.status(400).send({ message: 'Missing name.' })
        }

        if (await memberExists({ name: request.body.name })) {
            return response.status(400).send({ message: 'Name already exists.'});
        }

        const newMember = {
            name: request.body.name,
            accounts: [],
        }

        const result = createMember(newMember);
        return response.status(201).send(result);
    } catch (error) {
        console.log(error);
        return response.status(500).send({ message: error.message });
    }
}

const getMembers = async (request, response) => {
    try {
        const members = await findMembers();
        return response.status(200).send({
            data: members,
        });
    } catch (error) {
        console.log(error);
        return response.status(500).send({ message: error.message });
    }
}

const editMember = async (request, response) => {
    try {
        if (!request.params.currentName || !request.body.newName) {
            return response.status(400).send({ message: 'Missing a name.' });
        }

        const filter = { name: request.params.currentName };
        const member = await findMember(filter);
        if (!member) {
            return response.status(400).send({ message: 'Member not found.' });
        }

        const isNewNameTaken = await memberExists({ name: request.body.newName });
        if (!isNewNameTaken) {
            member.name = request.body.newName;
            await updateAccounts({ memberName: request.params.currentName }, { memberName: member.name });
            await updateMember(member);
        } else {
            return response.status(403).send({ message: 'Member name already exists.' });
        }

        return response.status(200).send({ message: 'Member name has been updated.' });
    } catch (error) {
        console.log(error);
        return response.status(500).send({ message: error.message });
    }
}

const removeMember = async (request, response) => {
    try {
        const conditions = { name: request.params.name };
        const result = await deleteMember(conditions);
        if (!result) {
            return response.status(404).send({ message: 'Member does not exist.' });
        }

        await deleteAccounts({ memberName: request.params.name });
        return response.status(200).send({ message: 'Member was successfully deleted.' });
    } catch (error) {
        console.log(error);
        return response.status(500).send({ message: error.message });
    }
}

export {
    addMember,
    getMembers,
    editMember,
    removeMember,
};