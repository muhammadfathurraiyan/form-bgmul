"use client";
import { createData } from "@/action/action";
import Input from "@/components/Input";
import { dataSchema } from "@/lib/types";
import Image from "next/image";
import { useState, useRef } from "react";
import Logo from "../../public/logo.png";

export default function Home() {
  const [error, setError] = useState("");
  const ref = useRef<HTMLFormElement>(null);
  const clientAction = async (data: FormData) => {
    const prov = `,${data.get("provinsi")}`;
    const dataProv = prov.split(",");
    const kabKot = `,${data.get("kabupatenKota")}`;
    const dataKabKot = kabKot.split(",");
    const kec = `,${data.get("kecamatan")}`;
    const dataKec = kec.split(",");

    const wa = `${data.get("noWa")}`;
    let dataWa = "";
    if (wa.charAt(0) === "0") {
      dataWa = "+62" + wa.slice(1);
    } else {
      dataWa = wa;
    }

    const newData = {
      nama: data.get("nama"),
      noWa: dataWa,
      provinsi: dataProv[1],
      kabupatenKota: dataKabKot[1],
      kecamatan: dataKec[1],
    };

    const result = dataSchema.safeParse(newData);
    if (!result.success) {
      let error = "";
      result.error.issues.forEach((issue) => {
        error = error + issue.message;
      });
      setError(error);
      return;
    } else {
      ref.current?.reset();
      setError("");
      alert("terimakasih telah mengisi form, klik ok untuk lanjut");
    }

    const response = await createData(result.data);
    if (response?.error) {
      setError(response.error);
    }
  };
  return (
    <section className="p-4 min-h-screen flex flex-col items-center justify-center gap-4 relative">
      <div className="w-full h-full absolute bg-[url('../../public/bg.jpg')] bg-center bg-no-repeat bg-cover" />
      <div className="lg:w-[800px] z-10 flex  rounded-lg shadow-[rgba(0,0,0,0.07)_0px_1px_2px,rgba(0,0,0,0.10)_0px_2px_4px,rgba(0,0,0,0.10)_0px_4px_8px,rgba(0,0,0,0.10)_0px_8px_16px,_rgba(0,0,0,0.10)_0px_16px_32px,rgba(0,0,0,0.10)_0px_32px_64px]">
        <div className="lg:w-1/2 max-md:hidden flex items-center justify-center rounded-l-lg bg-[#ED1B24]">
          <Image className="" src={Logo} width={0} height={0} alt="" />
        </div>
        <div className="lg:w-1/2">
          <form
            ref={ref}
            className="w-full bg-neutral-50 p-6  flex flex-col max-md:rounded-l-lg rounded-r-lg gap-4"
            action={clientAction}
          >
            <div>
              <h1 className="font-bold text-3xl">Form Pemilu</h1>
              <p className="font-medium">
                Ayo kita sukseskan PEMILU serentak tahun 2024 !!! INGAT 14
                FEBRUARI 2024 !!!
              </p>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <Input />
          </form>
        </div>
      </div>
    </section>
  );
}
