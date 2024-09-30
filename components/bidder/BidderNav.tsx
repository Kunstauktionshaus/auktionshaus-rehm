"use client";

import { useLocale } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BidderNav = () => {
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <></>
    // <nav className="w-full flex-col justify-center gap-2 md:gap-4 md:text-lg  font-montserrat">
    //   <Link
    //     href="/bidder/dashboard"
    //     className={`flex items-center gap-2 p-2 rounded ${
    //       pathname === `/${locale}/bidder/dashboard`
    //         ? "bg-beige text-grafit"
    //         : ""
    //     }`}
    //   >
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       fill="none"
    //       viewBox="0 0 24 24"
    //       strokeWidth="1.5"
    //       stroke="currentColor"
    //       className="w-5 h-5"
    //     >
    //       <path
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         d="M3.75 9v11.25A2.25 2.25 0 006 22.5h12a2.25 2.25 0 002.25-2.25V9m-16.5 0L12 3l8.25 6M9.75 22.5V12h4.5v10.5"
    //       />
    //     </svg>
    //     Main
    //   </Link>

    //   <Link
    //     href="/bidder/dashboard/items"
    //     className={`flex items-center gap-2 p-2 rounded ${
    //       pathname === `/${locale}/bidder/dashboard/items`
    //         ? "bg-beige text-grafit"
    //         : ""
    //     }`}
    //   >
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       fill="none"
    //       viewBox="0 0 24 24"
    //       strokeWidth="1.5"
    //       stroke="currentColor"
    //       className="w-5 h-5"
    //     >
    //       <path
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         d="M19.5 6h-15m3 6h9m-9 6h9"
    //       />
    //     </svg>
    //     Items
    //   </Link>

    //   <Link
    //     href="/bidder/dashboard/invoices"
    //     className={`flex items-center gap-2 p-2 rounded ${
    //       pathname === `/${locale}/bidder/dashboard/invoices`
    //         ? "bg-beige text-grafit"
    //         : ""
    //     }`}
    //   >
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       fill="none"
    //       viewBox="0 0 24 24"
    //       strokeWidth="1.5"
    //       stroke="currentColor"
    //       className="w-5 h-5"
    //     >
    //       <path
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         d="M3 7.5V6a3 3 0 013-3h12a3 3 0 013 3v1.5M9 12h6M9 16.5h6m-8.25 3.75h10.5a2.25 2.25 0 002.25-2.25v-9A2.25 2.25 0 0017.25 6H6.75A2.25 2.25 0 004.5 8.25v9a2.25 2.25 0 002.25 2.25z"
    //       />
    //     </svg>
    //     Invoices
    //   </Link>

    //   <Link
    //     href="/bidder/dashboard/delivery"
    //     className={`flex items-center gap-2 p-2 rounded ${
    //       pathname === `/${locale}/bidder/dashboard/delivery`
    //         ? "bg-beige text-grafit"
    //         : ""
    //     }`}
    //   >
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       fill="none"
    //       viewBox="0 0 24 24"
    //       strokeWidth="1.5"
    //       stroke="currentColor"
    //       className="w-5 h-5"
    //     >
    //       <path
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         d="M3.375 7.5l8.25-4.5 8.25 4.5m-16.5 0v9l8.25 4.5v-9m-8.25-4.5L12 12m0 9l8.25-4.5v-9M12 12l8.25-4.5"
    //       />
    //     </svg>
    //     Delivery
    //   </Link>
    // </nav>
  );
};

export default BidderNav;
