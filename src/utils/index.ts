import { getRepository } from "typeorm";
import { OrderProduct } from "../Entities/orderProductEntites";
import { OrderDispatched } from "../Entities/orderDispatched";
import { Bill } from "../Entities/billEntities";
import { Order } from "../Entities/orderEntites";
import { BillBackup } from "../Entities/billsBackupEntities";
import { OrdersBackup } from "../Entities/ordersBackupEntities";
import { AppError } from "../Errors";
import { IBill, IOrdersBackup, ISellableQuantityProps } from "../Types";

export const saveOrderProductList = async (list: OrderProduct[]) => {
  const orderProductRepository = getRepository(OrderProduct);

  const orderProductlist = [];

  for (let i = 0; i < list.length; i++) {
    let orderProductsaved = await orderProductRepository.save(list[i]);

    orderProductlist.push(orderProductsaved);
  }

  return orderProductlist;
};

export const getOrderProductListResponse = async (order: Order) => {
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

export const getOrdersResponse = async (ordersList: OrderDispatched[]) => {
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

export const listDispactchedOrdersByTable = async (tableOrderList: Order[]) => {
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

export const formattedOrders = (orderProductlist: OrderProduct[]) => {
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

export const findBill = async (
  order: Order,
  getASingleBill: boolean = false
) => {
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

export const listBills = async (orderList: Order[]) => {
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

export const getFinalPrice = async (order: Order) => {
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

export const list_orders = async (orders: Order[]) => {
  let orderList = [];

  for (let index = 0; index < orders.length; index++) {
    let order = await getOrder(orders[index].id);
    orderList.push(order);
  }
  return orderList;
};

export const ordersBackup = async (order: IOrdersBackup) => {
  const orderBackupRepository = getRepository(OrdersBackup);
  let orderData = {
    product: order.product,
    price: order.price,
    quantity: order.quantity,
  };
  let orderBackup = orderBackupRepository.create(orderData);

  await orderBackupRepository.save(orderBackup);

  return orderBackup;
};

export const getOrdersBackupList = async (billOrdersList: IOrdersBackup[]) => {
  let ordersBackupList = [];

  for (let index = 0; index < billOrdersList.length; index++) {
    let order = await ordersBackup(billOrdersList[index]);

    ordersBackupList.push(order);
  }
  return ordersBackupList;
};

export const registerBillBackup = async (bill: IBill) => {
  const billBackupRepository = getRepository(BillBackup);

  let orders = await getOrdersBackupList(bill.orders);

  let billData = {
    billDate: bill.date,
    client: bill.client,
    formOfPayment: bill.formOfPayment,
    totalPaid: bill.finalPrice,
    orders: orders,
  };
  let billBackup = billBackupRepository.create(billData);

  await billBackupRepository.save(billBackup);

  return billBackup;
};

export const registerBillsBackupList = async (bills: IBill[] | any) => {
  let billsBackupList = [];

  for (let index = 0; index < bills.length; index++) {
    let bill = await registerBillBackup(bills[index] as IBill);

    billsBackupList.push(bill);
  }
  return billsBackupList;
};

export const clearOrderDataList = async (orderList: Order[]) => {
  const orderRepository = getRepository(Order);

  for (let index = 0; index < orderList.length; index++) {
    let orderId = orderList[index].id;

    await orderRepository.delete(orderId);
  }

  return "successfully deleted";
};

export const getMostSellableProduct = (obj: ISellableQuantityProps) => {
  var mostSellable = Object.keys(obj).sort((a,b) => {
    return obj[a] > obj[b] ? -1 :
           obj[b] > obj[a] ? 1 : 0;
  })[0];

  return mostSellable
}