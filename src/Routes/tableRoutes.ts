import { Router } from "express";
import { createTable } from "../Controllers/tableController";

const router = Router();

export const tableRouter = () => {
  router.post(
    "",

    createTable
  );

  return router;
};
