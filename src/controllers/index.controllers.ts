import { Request, Response } from "express";
import { pool } from "../database/DB";

export const getCompany = async (req: Request, res: Response):Promise<Response> => {
  const { rows } = await pool.query(`SELECT * FROM employees;`);
  return res.json(rows);
};

export const saveCompany = async (req: Request, res: Response):Promise<Response> => {
  const { name, lastname, age, rol, photo, description, email } = req.body;
  const consult = `INSERT INTO employees(name,lastname,age, rol, photo, description, email) VALUES ($1,$2,$3,$4,$5,$6,$7)`;
  const values = [name, lastname, age, rol, photo, description, email];
  const response = await pool.query(consult, values);
  console.log(response);
  return res.json({
    "save succesfuly": "User saving succesfuly",
  });
};

export const userById = async (req: Request, res: Response):Promise<Response> => {
  const id = req.params.id;
  const consult = `SELECT * FROM employees WHERE id = $1`;
  const { rows } = await pool.query(consult, [id]);
  return res.json(rows);
};
