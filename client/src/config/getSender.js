export const getSender = (loggedUser, users) => {
  if (!users || users.length === 0) {
    console.log("users is empty");
    return "";
  }
  return users[0]._id === loggedUser._id ? users[0]?.name : users[1]?.name;
};

export const getSenderFull = (loggedUser, users) => {
  console.log("logges", loggedUser);
  console.log("userssssssss", users);
  if (!users || users.length === 0) {
    console.log("users is empty");
    return "";
  }
  return users[0]._id === loggedUser._id ? users[0].email : users[1].email;
};
