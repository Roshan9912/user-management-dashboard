export const mapUser = (user) => {
  const names = user.name.split(" ");

  const departments = [
    "IT",
    "Engineering",
    "HR",
    "Finance",
    "Sales",
  ];

  return {
    id: user.id,
    firstName: names[0] || "",
    lastName: names.slice(1).join(" "),
    email: user.email,
    department:
      departments[user.id % departments.length],
  };
};