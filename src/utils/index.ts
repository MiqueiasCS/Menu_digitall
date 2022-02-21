import { getRepository } from "typeorm";
import { OrderProduct } from "../Entities/orderProductEntites";
import { OrderDispatched } from "../Entities/orderDispatched";
import { Bill } from "../Entities/billEntities";
import { Order } from "../Entities/orderEntites";
import { AppError } from "../Errors";

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

export const formattedOrders = (orderProductlist: any) => {
  let orderProductList = [];
  for (let i = 0; i < orderProductlist.length; i++) {
    let productResponse = {
      productId: orderProductlist[i].product.id,
      product: orderProductlist[i].product.name,
      price: orderProductlist[i].product.price,
      quantity: orderProductlist[i].product_quantity,
    };
    orderProductList.push(productResponse);
  }
  return orderProductList;
};

export const findBill = async (order: any, getASingleBill: boolean = false) => {
  const billRepository = getRepository(Bill);
  const ordersProductRepository = getRepository(OrderProduct);

  let bill = await billRepository.findOne({
    where: { order },
    relations: ["order"],
  });

  if (!bill) {
    if (getASingleBill) {
      throw new AppError("There is no bill for this table", 400);
    } else {
      return {
        orderID: order.id,
        message: "There is no bill registered for this order",
      };
    }
  }

  let orderProductlist = await ordersProductRepository.find({
    where: { order },
    relations: ["product"],
    select: ["product", "product_quantity"],
  });

  const billResponse = {
    billId: bill.id,
    date: bill.bill_date,
    orderId: order.id,
    client: order.client,
    finalPrice: bill.final_price,
    formOfPayment: bill.form_of_payment,
    orders: formattedOrders(orderProductlist),
  };

  return billResponse;
};

export const listBills = async (orderList: any) => {
  let billsList = [];
  for (let index = 0; index < orderList.length; index++) {
    let bill = await findBill(orderList[index]);
    billsList.push(bill);
  }
  return billsList;
};

export const getOrder = async (orderId: string) => {
  const orderRepository = getRepository(Order);

  let order = await orderRepository.findOne({
    where: { id: orderId },
    relations: ["table", "dispatched", "order_product"],
  });

  if (!order) {
    throw new AppError("The Order does not exist", 404);
  }

  return order;
};

export const getFinalPrice = async (order: any) => {
  const ordersProductRepository = getRepository(OrderProduct);
  const orderProductlist = await ordersProductRepository.find({
    where: { order },
    relations: ["product"],
  });

  let finalPrice = orderProductlist.reduce((ac, item) => {
    return ac + item.product.price * item.product_quantity;
  }, 0);

  return finalPrice;
};