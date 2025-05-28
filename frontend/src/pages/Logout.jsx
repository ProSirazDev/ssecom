import React from "react";
import { getAuth, signOut } from "firebase/auth";
const Logout = () => {
  const auth = getAuth();

  signOut(auth)
    .then(() => {
      console.log("✅ User signed out");
      // Redirect to login or home
    })
    .catch((error) => {
      console.error("❌ Logout failed:", error);
    });

  return <button onClick={() => signOut()}>Log Out</button>;
};

export default Logout;
