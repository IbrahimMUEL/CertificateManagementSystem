import { Request, Response } from "express";
import { saveData } from "../helpers/helper.js";

export const createCertificate = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const result = await saveData(body);
    res.status(200).send({ ...result, ...body });
  } catch (error) {
    // If there is an error, we will log it and send a 500 status code
    res.status(500).send("Error creating data");
  }
};
