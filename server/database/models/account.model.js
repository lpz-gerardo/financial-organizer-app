import mongoose from 'mongoose';
import accountSchema from '../schemas/account.schema.js';

const Account = mongoose.model('Account', accountSchema);

export { Account };