import { getRepository } from "typeorm";
import { OrderProduct } from "../Entities/orderProductEntites";
import { OrderDispatched } from "../Entities/orderDispatched";

export const getOrderProductList = async (list: any) => {
  const orderProductRepository = getRepository(OrderProduct);

  const orderProductlist = [];

  for (let i = 0; i < list.length; i++) {
    let orderProductsaved = await orderProductRepository.save(list[i]);

    orderProductlist.push(orderProductsaved);
  }

  return orderProductlist;
};

export const getOrderProductListResponse = async (order: any) => {
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

export const getOrdersResponse = async (ordersList: any) => {
  let orderDispatchResponse = [];
  for (let index = 0; index < ordersList.length; index++) {
    let order = ordersList[index].order;
    let mesa = ordersList[index].tableidentifier;
    let client = ordersList[index].order.client;
    let note = ordersList[index].note;
    let orderDispatchId = ordersList[index].id;
    let isProcessed = ordersList[index].processed;

    let productList = await getOrderProductListResponse(order);

    let orderDispatchData = {
      orderDispatchId,
      mesa,
      client,
      isProcessed,
      note,
      productList,
    };

    orderDispatchResponse.push(orderDispatchData);
  }

  return orderDispatchResponse;
};

export const listDispactchedOrdersByTable = async (tableOrderList: any) => {
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
