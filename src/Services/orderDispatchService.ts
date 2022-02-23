import { getRepository } from "typeorm";
import { AppError } from "../Errors";
import { Order } from "../Entities/orderEntites";
import { OrderDispatched } from "../Entities/orderDispatched";
import { Table } from "../Entities/tableEntities";
import { IDispatchProps } from "../Types";
import { getOrdersResponse, listDispactchedOrdersByTable } from "../utils";

export const createOrderDispatchService = async (data: IDispatchProps) => {
  const orderRepository = getRepository(Order);
  const orderDispatchedRepository = getRepository(OrderDispatched);

  const order = await orderRepository.findOne({
    where: { id: data.orderId },
    relations: ["table", "dispatched"],
  });

  if (!order) {
    throw new AppError("the order does not exist", 404);
  }

  if (order.dispatched.length > 0) {
    throw new AppError("the order already registered", 400);
  }

  if (order.table.tableidentifier !== data.tableidentifier.toLowerCase()) {
    throw new AppError(
      `The order does not belong to ${data.tableidentifier}`,
      400
    );
  }

  let orderDispatched = orderDispatchedRepository.create({
    order: order,
    note: data.note,
    tableidentifier: data.tableidentifier.toLowerCase(),
  });

  await orderDispatchedRepository.save(orderDispatched);

  return orderDispatched;
};

export const updateOrderDispatchService = async (
  orderDispatchId: string,
  orderStatus: boolean
) => {
  const orderDispatchedRepository = getRepository(OrderDispatched);
  let orderDispatch = await orderDispatchedRepository.findOne(orderDispatchId);
  if (!orderDispatch) {
    throw new AppError("the order dispatch id does not exist", 404);
  } else {
    orderDispatch.processed = orderStatus;
    await orderDispatchedRepository.save(orderDispatch);
    return orderDispatch;
  }
};

export const getAllOrderDispatchListService = async () => {
  const orderDispatchedRepository = getRepository(OrderDispatched);
  let orderDispatched = await orderDispatchedRepository.find({
    relations: ["order"],
  });

  let orderDispatchResponse = await getOrdersResponse(orderDispatched);

  return orderDispatchResponse;
};

export const getUnprocessedOrderDispatchListService = async () => {
  const orderDispatchedRepository = getRepository(OrderDispatched);
  let orderDispatched = await orderDispatchedRepository.find({
    relations: ["order"],
  });

  let notProcessedOrders = orderDispatched.filter((item) => !item.processed);

  let orderDispatchResponse = await getOrdersResponse(notProcessedOrders);

  return orderDispatchResponse;
};

export const getProcessedOrderDispatchListService = async () => {
  const orderDispatchedRepository = getRepository(OrderDispatched);
  let orderDispatched = await orderDispatchedRepository.find({
    relations: ["order"],
  });

  let processedOrders = orderDispatched.filter((item) => item.processed);

  let orderDispatchResponse = await getOrdersResponse(processedOrders);

  return orderDispatchResponse;
};

export const getOrderDispatchListByTableService = async (tableId: string) => {
  const tableRepository = getRepository(Table);

  let table = await tableRepository.findOne({
    where: { id: tableId },
    relations: ["orders"],
  });

  if (!table) {
    throw new AppError("the tableId does not exist", 400);
  }

  let responseData = listDispactchedOrdersByTable(table.orders);

  return responseData;
};
