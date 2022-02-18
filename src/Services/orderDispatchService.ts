import { getRepository } from "typeorm";
import { AppError } from "../Errors";
import { Order } from "../Entities/orderEntites";
import { OrderDispatched } from "../Entities/orderDispatched";
import { Table } from "../Entities/tableEntities";
import { OrderProduct } from "../Entities/orderProductEntites";

interface IDataProps {
  orderId: string;
  note?: string;
}

const getProductResponse = async (order: any) => {
  const orderProductRepository = getRepository(OrderProduct);
  let orderProduct = await orderProductRepository.find({
    where: { order },
    relations: ["product"],
  });

  let productsData = orderProduct.map((item) => {
    return {
      name: item.product.name,
      price: item.product.price,
      quantity: item.product_quantity,
    };
  });

  return productsData;
};

const getOrdersResponse = async (ordersList: any) => {
  let orderDispatchResponse = [];
  for (let index = 0; index < ordersList.length; index++) {
    let order = ordersList[index].order;
    let client = ordersList[index].order.client;
    let note = ordersList[index].note;
    let orderDispatchId = ordersList[index].id;
    let isProcessed = ordersList[index].processed;

    let productList = await getProductResponse(order);

    let orderDispatchData = {
      orderDispatchId,
      client,
      isProcessed,
      note,
      productList,
    };

    orderDispatchResponse.push(orderDispatchData);
  }

  return orderDispatchResponse;
};

const listDispactchedOrdersByTable = async (tableOrderList: any) => {
  const orderDispatchedRepository = getRepository(OrderDispatched);
  let orderDispatchListResponse = [];

  for (let index = 0; index < tableOrderList.length; index++) {
    let orderDispatched = await orderDispatchedRepository.find({
      where: { order: tableOrderList[index] },
      relations: ["order"],
    });
    let orderDispatchResponse = await getOrdersResponse(orderDispatched);

    if (orderDispatchResponse.length > 0) {
      orderDispatchListResponse.push({
        orderId: tableOrderList[index].id,
        content: orderDispatchResponse,
      });
    }
  }

  return orderDispatchListResponse;
};

export const createOrderDispatchService = async (data: IDataProps) => {
  const orderRepository = getRepository(Order);
  const orderDispatchedRepository = getRepository(OrderDispatched);

  const order = await orderRepository.findOne(data.orderId);

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

// export const getOrderDispatchPerOrderService = async (orderId: string) => {
//   const orderRepository = getRepository(Order);
//   const orderDispatchedRepository = getRepository(OrderDispatched);

//   const order = await orderRepository.findOne(orderId);

//   if (!order) {
//     throw new AppError("the order does not exist", 400);
//   }

//   let orderDispatched = await orderDispatchedRepository.find({
//     where: { order },
//     relations: ["order"],
//   });

//   return orderDispatched;
// };
