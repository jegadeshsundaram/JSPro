import jwt from 'jsonwebtoken';
import logger from '../config/logger.js';
import dotenv from 'dotenv';
dotenv.config();
// generate token that expires in 12 hours
const generateToken = (id) => {
    logger.info(`User Id for Generating Token ${id}`);
    logger.info(`JWT Secret for Generating Token ${process.env.JWT_SECRET}`);
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '12h' });
};
export default generateToken;
//# sourceMappingURL=generateToken.js.map