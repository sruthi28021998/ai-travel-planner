"use client";

import Link
from "next/link";

import {
  useAuth
} from "../context/AuthContext";

export default function Navbar() {

  const {
    user,
    logout
  } = useAuth();

  return (

    <nav
      className="
      bg-blue-600
      text-white
      p-4
      flex
      justify-between"
    >

      <h1
        className="
        text-xl
        font-bold"
      >
        AI Travel Planner
      </h1>

      <div
        className="
        flex
        gap-5"
      >

        <Link href="/">
          Home
        </Link>

        {
          user ? (
            <>

              <Link
                href="/dashboard"
              >
                Dashboard
              </Link>

              <button
                onClick={
                  logout
                }
              >
                Logout
              </button>

            </>
          ) : (
            <>
              <Link
                href="/login"
              >
                Login
              </Link>

              <Link
                href="/register"
              >
                Register
              </Link>
            </>
          )
        }

      </div>

    </nav>

  );

}