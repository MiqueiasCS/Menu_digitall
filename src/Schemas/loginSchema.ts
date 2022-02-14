import * as yup from 'yup'

export const loginSchema = yup.object().shape({
  email: yup.string().email("Wrong email type").required("Email obrigatory"),
  password: yup.string().min(4).required("Password obrigatory")
})
