"use client";

import { signOut, useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faRightToBracket,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AuthButtonsContainer = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const t = useTranslations("Auth");

  return (
    <div className="p-2">
      {session ? (
        <>
          <div className="flex gap-4 items-center">
            <Link
              href={"/my-account"}
              className="px-4 py-2 flex gap-4 items-center justify-end items-center  text-navy "
            >
              <FontAwesomeIcon icon={faUser} className="text-2xl" />
              <p className="hidden lg:block ">
                {session.user?.name} {session.user?.surname}
              </p>
            </Link>

            <button
              onClick={() => signOut({ callbackUrl: "/", redirect: true })}
            >
              Sign Out
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex gap-6 items-center">
            <Link href={`/login?redirect=${encodeURIComponent(pathname)}`}>
              <p className="hidden md:block  border-2 border-navy px-4 py-2 text-lg text-navy hover:bg-navy hover:text-white ">
                Login
              </p>
              <FontAwesomeIcon
                icon={faRightToBracket}
                className="md:hidden text-2xl text-navy hover:text-teal"
              />
            </Link>

            <Link href={`/register?redirect=${encodeURIComponent(pathname)}`}>
              <p className="hidden md:block border-2 border-navy p-2 text-lg text-navy hover:bg-navy hover:text-white">
                Sign Up
              </p>
              <FontAwesomeIcon
                icon={faUserPlus}
                className="md:hidden text-2xl text-navy hover:text-teal"
              />
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default AuthButtonsContainer;
