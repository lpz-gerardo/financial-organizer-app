import mongoose from 'mongoose';
import memberSchema from '../schemas/member.schema.js';

const Member = mongoose.model('Member', memberSchema);

export { Member };