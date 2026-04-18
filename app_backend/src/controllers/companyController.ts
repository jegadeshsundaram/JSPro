import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import logger from '../config/logger.js'
import { db } from '../config/db.js'
import { RowDataPacket } from 'mysql2/promise'

const getProfile = asyncHandler(async (req: Request, res: Response) => {

  logger.info(`populating company profile`);

  const [profile] = await db.execute<RowDataPacket[]>('SELECT * FROM company_profile');

  res.status(201).json({
    status: 'ok',
    profile,
  })

});

export { getProfile }