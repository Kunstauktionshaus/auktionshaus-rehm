"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const AuthButtonsContainer = () => {
  const { data: session } = useSession();
  return (
    <>
      {session ? (
        <>
          <div className="flex space-x-4">
            <h1>Welcome {session.user?.name}</h1>
            <h1>{session.user?.email}</h1>
            <p>Profile</p>
            <button
              onClick={() => signOut({ callbackUrl: "/", redirect: true })}
            >
              Log Out
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex space-x-4">
            <Link href="/login" className="p-2 border">
              Log In
            </Link>
            <Link href="/register" className="p-2 border">
              Sing Up
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default AuthButtonsContainer;
