import { getRepository } from "typeorm";
import { AppError } from "../Errors";
import { Order } from "../Entities/orderEntites";
import { OrderDispatched } from "../Entities/orderDispatched";

interface IDataProps {
  ordeId: string;
  note?: string;
}

export const createOrderDispatchService = async (data: IDataProps) => {
  const orderRepository = getRepository(Order);
  const orderDispatchedRepository = getRepository(OrderDispatched);

  const order = await orderRepository.findOne(data.ordeId);

  if (!order) {
    throw new AppError("the order does not exist", 400);
  }

  let orderDispatched = orderDispatchedRepository.create({
    order: order,
    note: data.note,
  });

  await orderDispatchedRepository.save(orderDispatched);

  return orderDispatched;
};
