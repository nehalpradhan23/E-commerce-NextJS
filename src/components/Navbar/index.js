"use client";
import { GlobalContext } from "@/context";
import { adminNavOptions, navOptions } from "@/utils";
import React, { useContext, useEffect } from "react";
import CommonModal from "../CommonModal";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import CartModal from "../CartModal";

function NavItems({
  isModalView = false,
  isAdminView,
  router,
  pathname,
  setShowCartModal,
}) {
  // console.log(pathname);
  let currentPath = pathname;
  return (
    <div
      className={`items-center justify-between w-full md:flex md:w-auto ${
        isModalView ? "" : "hidden"
      }`}
      id="nav-items"
    >
      <ul
        className={`flex p-4 flex-col md:p-0 mt-4 font-medium rounded-lg md:flex-row md:space-x-3 md:mt-0 md:border-0 bg-white ${
          isModalView ? "border-none" : "border border-gray-100"
        }`}
      >
        {isAdminView
          ? adminNavOptions.map((item) => (
              <li
                className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0"
                key={item.id}
                onClick={() => {
                  router.push(item.path);
                }}
              >
                {item.label}
              </li>
            ))
          : navOptions.map((item) => (
              <li
                className={`cursor-pointer block p-2 text-center text-gray-900 rounded hover:bg-black hover:text-white ${
                  currentPath === item.path ? "bg-black text-white" : ""
                }`}
                key={item.id}
                onClick={() => {
                  router.push(item.path);
                  setShowCartModal(false);
                }}
              >
                {item.label}
              </li>
            ))}
      </ul>
    </div>
  );
}

// ==============================================================================
export default function Navbar() {
  const {
    showNavModal,
    setShowNavModal,
    user,
    setUser,
    isAuthUser,
    setIsAuthUser,
    currentUpdatedProduct,
    setCurrentUpdatedProduct,
    showCartModal,
    setShowCartModal,
  } = useContext(GlobalContext);

  const router = useRouter();
  const pathname = usePathname();
  // console.log(pathname);

  useEffect(() => {
    if (
      pathname !== "/admin-view/add-product" &&
      currentUpdatedProduct !== null
    )
      setCurrentUpdatedProduct(null);
  }, [pathname]);

  function handleLogout() {
    setIsAuthUser(false);
    setUser(null);
    Cookies.remove("token");
    localStorage.clear();
    router.push("/");
  }

  const isAdminView = pathname.includes("admin-view");

  // =============================================================================
  return (
    <>
      <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {/* left side ================================== */}
          <div
            onClick={() => router.push("/")}
            className="flex items-center cursor-pointer"
          >
            <span className="slef-center text-2xl font-semibold whitespace-nowrap">
              Ecommercery
            </span>
          </div>
          {/* middle section ==================================== */}
          <div className="flex md:order-2 gap-3">
            {!isAdminView && isAuthUser ? (
              <>
                <Link
                  href={"/account"}
                  className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white hover:bg-gray-500"
                >
                  Account
                </Link>
                <button
                  onClick={() => setShowCartModal(true)}
                  className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white hover:bg-gray-500"
                >
                  Cart
                </button>
              </>
            ) : null}
            {/* switch user admin/client ======================================== */}
            {user?.role === "admin" ? (
              isAdminView ? (
                <button
                  onClick={() => router.push("/")}
                  className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white hover:bg-gray-500"
                >
                  Client View
                </button>
              ) : (
                <Link
                  href={"/admin-view"}
                  // onClick={() => router.push("admin-view")}
                  className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white hover:bg-gray-500"
                >
                  Admin view
                </Link>
              )
            ) : null}
            {/* log in/out button ======================================== */}
            {isAuthUser ? (
              <button
                onClick={handleLogout}
                className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white hover:bg-gray-500"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => router.push("/login")}
                className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
              >
                Login
              </button>
            )}
            {/* small screen nav open button ====================================================== */}
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
              onClick={() => setShowNavModal(true)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  // fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  // clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <NavItems
            isAdminView={isAdminView}
            router={router}
            pathname={pathname}
            setShowCartModal={setShowCartModal}
          />
        </div>
      </nav>
      {/* for mobile view */}
      <CommonModal
        showModalTitle={false}
        mainContent={
          <NavItems
            router={router}
            isModalView={true}
            isAdminView={isAdminView}
          />
        }
        show={showNavModal}
        setShow={setShowNavModal}
      />
      {showCartModal && <CartModal />}
    </>
  );
}
