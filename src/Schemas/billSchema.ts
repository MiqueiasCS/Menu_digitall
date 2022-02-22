import * as yup from 'yup'

export const billSchema = yup.object().shape({
  orderId: yup.string().required("Order id obrigatory"),
  formOfPayment: yup.string().required("Form of payment obrigatory")
})
