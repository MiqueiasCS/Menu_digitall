import { getRepository } from "typeorm";
import { Table } from "../Entities/tableEntities";
import { AppError } from "../Errors";

export const createTableService = async (tableIdentifier: string) => {
  const tableRepository = getRepository(Table);

  try {
    let table = tableRepository.create({ tableidentifier: tableIdentifier });
    table.tableidentifier = tableIdentifier.toLowerCase();

    await tableRepository.save(table);

    return table;
  } catch (err) {
    throw new AppError((err as any).message, 400);
  }
};

export const getAllTableService = async () => {
  const tableRepository = getRepository(Table);
  const tables = await tableRepository.find({ relations: ["orders"] });

  return tables;
};

export const getTableByNameService = async (tableIdentifier: string) => {
  const tableRepository = getRepository(Table);
  tableIdentifier = tableIdentifier.toLowerCase();

  const table = await tableRepository.findOne({
    where: { tableidentifier: tableIdentifier },
    relations: ["orders"],
  });

  if (!table) {
    throw new AppError("Table not found", 404);
  }

  return table;
};
