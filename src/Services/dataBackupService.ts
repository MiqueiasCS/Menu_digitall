import { getRepository } from "typeorm";
import { BillBackup } from "../Entities/billsBackupEntities";

export const getBackupList = async () => {
  const billBackupRepository = getRepository(BillBackup);

  let billBackup = await billBackupRepository.find({ relations: ["orders"] });

  return billBackup;
};
