import * as yup from 'yup'

export const orderSchema = yup.object().shape({
  client: yup.string().required("Name obrigatory"),
  tableId: yup.string().required("tableId obrigatory"),
  products: yup.array().required("All ordened products")
})
