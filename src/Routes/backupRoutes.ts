import { Router } from "express";
import { getAllData } from "../Controllers/dataBackupController";
import { authentication } from "../Middlewares/authentication";

const router = Router();

export const backupRouter = () => {
  router.get("", authentication, getAllData);

  return router;
};
