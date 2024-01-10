import express from 'express';
import { Member } from '../database/models/member.model.js';

const router = express.Router();

router.post('/', async (request, response) => {
    try {
        if (!request.body.name) {
            return response.status(400).send({
                message: 'Missing name'
            });
        }

        if (await Member.exists({ name: request.body.name })) {
            return response.status(400).send({
                message: 'Name already exists.'
            });
        }

        const newMember = {
            name: request.body.name,
            accounts: [],
        };

        const member = await Member.create(newMember);
        return response.status(201).send(member);

    } catch (error) {
        console.log(error);
        response.status(500).send({ message: error.message });
    }
})

export default router;