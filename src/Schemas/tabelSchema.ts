import * as yup from 'yup'

export const tableSchema = yup.object().shape({
  tableidentifier: yup.string().required("table name obrigatory"),
})