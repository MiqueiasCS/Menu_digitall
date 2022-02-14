import * as yup from 'yup'

export const productSchema = yup.object().shape({
  name: yup.string().required("Name obrigatory").lowercase(),
  price: yup.number().required("Price obrigatory").positive("Invalid Price")
})
