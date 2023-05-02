import React from "react";

const Avatar = ({ user }) => {
  return <>{user ? user.Avatar : <i className="fa-solid fa-user-large"></i>}</>;
};

export default Avatar;
