import { Router } from "express";
import { GetTableBills } from "../Controllers/billController";
import { createTable } from "../Controllers/tableController";

const router = Router();

export const tableRouter = () => {
  router.post(
    "",

    createTable
  );
  router.get("/:tableId/bills", GetTableBills);
  return router;
};
