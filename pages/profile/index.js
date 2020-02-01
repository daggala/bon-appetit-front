import React, { useContext } from "react";
import { UserContext } from "../../utils/context";

const Profile = () => {
  const { logoutUser } = useContext(UserContext);

  return (
    <>
      <div>Profile</div>

      <button onClick={logoutUser}>Logout</button>
    </>
  );
};

export default Profile;
