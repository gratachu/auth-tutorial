"use client";

import {useSession} from "next-auth/react";
import {logout} from "@/actions/logout";

const SettingsPage = () => {
  const session = useSession();

  const onClick = () => {
    logout();
  }

  return (
    <div>
      <h1>{ JSON.stringify(session) }</h1>
        <button onClick={onClick} type="submit">
          Sign out
        </button>
    </div>
  );
}

export default SettingsPage;
