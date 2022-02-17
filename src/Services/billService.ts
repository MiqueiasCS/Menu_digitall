import { getRepository } from "typeorm";
import { AppError } from "../Errors";
import { Bill } from "../Entities/billEntities";
import { Order } from "../Entities/orderEntites";
import { OrderProduct } from "../Entities/orderProductEntites";

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
      relations: ["table", "dispatched", "order_product"],
    });

    if (!billOrder) {
      throw new AppError("The Order does not exist", 404);
    }

    const ordersProductRepository = getRepository(OrderProduct);
    const orderProductlist = await ordersProductRepository.find({
      where: { order: billOrder },
      relations: ["product"],
    });

    let finalPrice = orderProductlist.reduce((ac, item) => {
      return ac + item.product.price * item.product_quantity;
    }, 0);

    let billData = {
      form_of_payment: data.formOfPayment,
      final_price: finalPrice,
      order: billOrder,
    };

    const billRepository = getRepository(Bill);
    let bill = billRepository.create(billData);
    await billRepository.save(bill);

    console.log(bill);

    return bill;
  } catch (err) {
    throw new AppError((err as any).message, 400);
  }
};

export const GetBillService = async (data: IBillProps) => {
  const { orderId } = data;
  const billRepository = getRepository(Bill);
  const orderRepository = getRepository(Order);
  const ordersProductRepository = getRepository(OrderProduct);

  try {
    let order = await orderRepository.findOne({
      where: { id: orderId },
      relations: ["table", "dispatched", "order_product"],
    });

    if (!order) {
      throw new AppError("The Order does not exist", 404);
    }

    let bill = await billRepository.findOne({ order });

    if (!bill) {
      throw new AppError("There is no bill for this table", 400);
    }

    let orderProductlist = await ordersProductRepository.find({
      where: { order },
      relations: ["product"],
    });

    const billResponse = {
      billId: bill.id,
      date: bill.bill_date,
      orderId: order.id,
      client: order.client,
      finalPrice: bill.final_price,
      formOfPayment: bill.form_of_payment,
      products: orderProductlist,
    };

    return bill;
  } catch (err) {
    throw new AppError((err as any).message, 400);
  }
};
