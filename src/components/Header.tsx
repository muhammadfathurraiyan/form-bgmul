"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Header = () => {
  const path = usePathname()
  return (
    <nav className="w-full fixed top-0 left-0 z-10 py-3 px-24 max-lg:px-4 flex items-center text-neutral-50 justify-between bg-red-600">
      <div className="flex items-center">
        <h1 className="text-lg font-bold">JanganGolput.</h1>
      </div>
      <div className="flex items-center max-sm:gap-4 gap-8">
        <Link href={path === "/fakrullahmaulana" ? "/" : "#beranda"}>Beranda</Link>
        <Link
          href={path === "/fakrullahmaulana" ? "/#form" : "#form"}
          className="py-2 px-4 hover:bg-red-700 hover:text-white duration-300 bg-red-600 border border-red-700 rounded-md block w-fit shadow-[rgba(0,0,0,0.07)_0px_1px_2px,rgba(0,0,0,0.10)_0px_2px_4px,rgba(0,0,0,0.10)_0px_4px_8px,rgba(0,0,0,0.10)_0px_8px_16px,_rgba(0,0,0,0.10)_0px_16px_32px,rgba(0,0,0,0.10)_0px_32px_64px]"
        >
          Ayo Dukung
        </Link>
      </div>
    </nav>
  );
};

export default Header;
