import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import logger from '../config/logger.js'
import { db } from '../config/db.js'
import { RowDataPacket } from 'mysql2/promise'
import { ResultSetHeader } from 'mysql2/promise';

const getClientByUENORName = asyncHandler(async (req: Request, res: Response) => {

   const { clientInput } = req.body;

   logger.info(`Client Input ${clientInput}`);

   const [rows] = await db.execute<RowDataPacket[]>('SELECT * FROM authorized_clients WHERE uen = ? || name = ?', [clientInput, clientInput]);

   if (rows.length > 0) {
      logger.info(`Found ${rows.length} clients.`);
      const client = rows[0];

      res.status(201).json({
         status: 'ok',
         client: clientInput,
      })

   } else {
      res.json({ status: "client_not_exist", message: 'Client not found' });
   }

});

const getAll = asyncHandler(async (req: Request, res: Response) => {

  logger.info(`populating all the authorized clients`);

  const [clients] = await db.execute<RowDataPacket[]>('SELECT * FROM authorized_clients WHERE active = 1 ORDER BY name ASC');

  if (clients.length > 0) {
    logger.info(`Found ${clients.length} clients.`);

    res.status(201).json({
      status: 'ok',
      clients,
    })

  } else {
    res.json({ status: "client_not_exist", message: 'Client not found' });
  }

});

const getDetail = asyncHandler(async (req: Request, res: Response) => {

  const { client_id } = req.body;

  logger.info(`>>>> Client ID ${client_id} >>>>`);

  const [client] = await db.execute<RowDataPacket[]>('SELECT * FROM authorized_clients WHERE cn_id = ?', [client_id]);

  if (client.length > 0) {

    logger.info(`>>>> populating users under selected Client  >>>>`);

    const [users] = await db.execute<RowDataPacket[]>('SELECT * FROM users WHERE client_uen = ?', [client[0].uen]);

    res.status(201).json({
      status: 'ok',
      client,
      users,
    })

  } else {
    res.json({ status: "client_not_exist", message: 'Client not found' });
  }

});

const updateClient = asyncHandler(async (req: Request, res: Response) => {

   const { client_id, name, uen } = req.body;

   const [results] = await db.query(
      "UPDATE authorized_clients SET uen = ?, name = ? WHERE cn_id = ?",
      [uen, name, client_id]
   );

   // Cast the result to ResultSetHeader
   const typedResult = results as ResultSetHeader;

   logger.info(`Updated ${typedResult.affectedRows} record(s)`);

   if (typedResult.affectedRows > 0) {
      res.json({ status: 'ok', message: 'Client Updated' });
   }

});

const deleteClient = asyncHandler(async (req: Request, res: Response) => {

   const { client_id } = req.body;

   const [results] = await db.query(
      "UPDATE authorized_clients SET active = 0 WHERE cn_id = ?",
      [client_id]
   );

   // Cast the result to ResultSetHeader
   const typedResult = results as ResultSetHeader;

   logger.info(`Updated ${typedResult.affectedRows} record(s)`);

   if (typedResult.affectedRows > 0) {
      res.json({ status: 'ok', message: 'Client Updated' });
   }

});

export { getClientByUENORName, getAll, getDetail, updateClient, deleteClient }