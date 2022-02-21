import * as yup from "yup";

export const userSchema = yup.object().shape({
  username: yup.string().required("Username obrigatory"),
  email: yup.string().email("Wrong email type").required("Email obrigatory"),
  password: yup.string().min(4).required("Password obrigatory"),
  isAdm: yup.bool(),
});
