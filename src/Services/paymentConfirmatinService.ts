import { getRepository } from "typeorm";
import { Table } from "../Entities/tableEntities";
import { AppError } from "../Errors";
import { listBills, list_orders, registerBillsBackupList } from "../utils";
import { clearOrderDataList } from "../utils";
import { mailOptions, transport } from "./emailService";

export const createPaymentConfirmationService = async (
  tableidentifier: string
) => {
  const tableRepository = getRepository(Table);

  tableidentifier = tableidentifier.toLowerCase();

  try {
    let table = await tableRepository.findOne({
      where: { tableidentifier: tableidentifier },
      relations: ["orders"],
    });

    if (!table) {
      throw new AppError("Table not registered", 400);
    }

    if (table.orders.length === 0) {
      throw new AppError("There are no orders registered for this table", 400);
    }

    let orderList = await list_orders(table.orders);

    let bills = await listBills(orderList);

    let unpaidList = bills.filter((item) => item.hasOwnProperty("message"));

    if (unpaidList.length > 0) {
      return unpaidList;
    }
    bills = bills.filter((item) => !item.hasOwnProperty("message"));

    const billData = await registerBillsBackupList(bills);

    await clearOrderDataList(orderList);

    billData.map(el => {
      const options = mailOptions(
        [`${el?.client}@mail.com`],
        'Confirmação de pagamento',
        'email',
        {
          name: el?.client,
          total: el?.totalPaid,
          nota_fiscal: el?.id,
          orders: JSON.stringify(el?.orders)
        }
      )

      transport.sendMail(options, (err, info) => {
        if (err) {
          return console.log(err)
        } else {
          console.log(info)
        }
      })
    })

    return { message: "payment confirmed!" };
  } catch (err) {
    throw new AppError((err as any).message, 400);
  }
};
