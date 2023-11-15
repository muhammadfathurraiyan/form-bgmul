import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "../../public/logo.png";

const Header = () => {
  return (
    <nav className="w-full py-3 px-24 max-sm:px-8 flex items-center text-neutral-50 justify-between bg-red-600">
      <div className="flex items-center gap-2">
        <Image src={Logo} alt="logo" width={32} height={0} />
        <h1 className="text-lg font-bold">KPU.</h1>
      </div>
      <div className="flex items-center max-sm:gap-4 gap-8">
        <Link href="#">Beranda</Link>
        <Link href="#">Form</Link>
        <Link
          href="#"
          className="py-2 px-4 hover:bg-red-700 hover:text-white duration-300 bg-red-600 border border-red-700 rounded-md block w-fit shadow-[rgba(0,0,0,0.07)_0px_1px_2px,rgba(0,0,0,0.10)_0px_2px_4px,rgba(0,0,0,0.10)_0px_4px_8px,rgba(0,0,0,0.10)_0px_8px_16px,_rgba(0,0,0,0.10)_0px_16px_32px,rgba(0,0,0,0.10)_0px_32px_64px]"
        >
          Ayo Dukung
        </Link>
      </div>
    </nav>
  );
};

export default Header;
