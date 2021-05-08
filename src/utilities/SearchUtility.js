export const searchInUsers = (search, users) => {
  let tempSearch = search.toLowerCase();
  return users.filter((user) => {
    return (
      user.name.toLowerCase().includes(tempSearch) ||
      user.email.toLowerCase().includes(tempSearch) ||
      user.role.toLowerCase().includes(tempSearch)
    );
  });
};
