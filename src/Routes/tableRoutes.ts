import { Router } from "express";
import { GetTableBills } from "../Controllers/billController";
import { authentication } from "../Middlewares/authentication";
import {
  createTable,
  getAllTable,
  getTableByName,
} from "../Controllers/tableController";

const router = Router();

export const tableRouter = () => {
  router.post("", authentication, createTable);
  router.get("/:tableId/bills", GetTableBills);
  router.get("", getAllTable);
  router.get("/:tableidentifier", getTableByName);
  return router;
};
