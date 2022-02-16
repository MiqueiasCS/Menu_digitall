import { getRepository } from "typeorm";
import { AppError } from "../Errors";
import { Bill } from "../Entities/billEntities";
import { Order } from "../Entities/orderEntites";

interface IBillProps {
  orderId: string;
  formOfPayment: string;
}

export const createBillService = async (data: IBillProps) => {
  const { orderId } = data;

  try {
    const orderRepository = getRepository(Order);
    let billOrder = await orderRepository.findOne({
      where: { id: orderId },
      //   relations: ["table", "dispatched", "order_product"],
    });

    if (!billOrder) {
      throw new AppError("The Order does not exist", 404);
    }
    billOrder.order_product[0];
    //   let finalPrice = billOrder.order_product.reduce((ac, item) => {
    //     return ac + item.product.price * item.product_quantity;
    //   }, 0);

    //   let billData = {
    //     form_of_payment: data.formOfPayment,
    //     final_price: finalPrice,
    //     order: billOrder,
    //   };

    //   const billRepository = getRepository(Bill);
    //   let bill = await billRepository.create(billData);

    //   await billRepository.save(bill);

    //   return bill;
  } catch (err) {
    throw new AppError((err as any).message, 400);
  }
};
