import { getRepository } from "typeorm";
import { Table } from "../Entities/tableEntities";

interface IdataProps {
  tableidentifier: string;
}

export const createTableService = async (data: IdataProps) => {
  const tableRepository = getRepository(Table);

  let table = tableRepository.create({ tableidentifier: data.tableidentifier });

  await tableRepository.save(table);

  return table;
};
