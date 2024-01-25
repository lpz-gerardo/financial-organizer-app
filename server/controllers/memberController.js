import {
    createMember,
    memberExists,
} from '../database/models/member.model.js';

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
        }

        const result = createMember(newMember);
        return response.status(201).send(result);
    } catch (error) {
        console.log(error);
        return response.status(500).send({ message: error.message });
    }
}

export { addMember };