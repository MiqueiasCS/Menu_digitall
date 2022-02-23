import * as yup from "yup";

export const dispatchSchema = yup.object().shape({
  note: yup.string().lowercase(),
  orderId: yup.string().required("Order id obrigatory"),
  tableidentifier: yup.string().required("Table name obrigatory"),
});

export const updateDispatchSchema = yup.object().shape({
  orderStatus: yup.bool().required("Order status obrigatory"),
});
