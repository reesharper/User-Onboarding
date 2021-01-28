import * as Yup from 'yup'

export default Yup.object().shape({
  name: Yup
    .string()
    .required("Name is required"),
  email: Yup
    .string()
    .email("Must be a valid email address.")
    .required("Must include email address."),
  password: Yup
  .string()
    .required("Password is Required")
    .min(6, "Passwords must be at least 6 characters long."),
  terms: Yup
  .boolean().oneOf([true], "You must accept Terms and Conditions"),
});