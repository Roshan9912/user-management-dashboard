export const validateUser = (data) => {
  const errors = {};

  if (!data.firstName.trim())
    errors.firstName = "Required";

  if (!data.lastName.trim())
    errors.lastName = "Required";

  if (!data.email.trim())
    errors.email = "Required";
  else if (
    !/\S+@\S+\.\S+/.test(data.email)
  )
    errors.email = "Invalid Email";

  if (!data.department.trim())
    errors.department = "Required";

  return errors;
};