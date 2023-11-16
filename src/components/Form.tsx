"use client";
import { createData } from "@/action/action";
import Input from "@/components/Input";
import { dataSchema } from "@/lib/types";
import Image from "next/image";
import { useState, useRef } from "react";
import Logo from "../../public/ayo.png";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

export default function Form() {
  const [error, setError] = useState("");
  const ref = useRef<HTMLFormElement>(null);

  const showSwal = (data: any) => {
    withReactContent(Swal).fire({
      title: "Terimakasih",
      text: `Terimakasih ${data.nama} telah bersedia untuk mendaftar admin akan segera melakukan kontak pada nomor ${data.noWa} untuk pemberian biaya operasional berupa syarat sebesar Rp. 500.000`,
      confirmButtonText: "Siap Bergabung!",
      confirmButtonColor: "#DC2626",
    });
  };

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
      showSwal(newData);
    }

    const response = await createData(result.data);
    if (response?.error) {
      setError(response.error);
    }
  };
  return (
    <section
      id="form"
      className="px-24 max-lg:px-4 py-12 max-lg:py-6 flex flex-col items-center justify-center relative"
    >
      <Image
        className="bg-red-600 lg:hidden rounded-full absolute w-20 -top-4 left-10 p-1 shadow-[rgba(0,0,0,0.07)_0px_1px_2px,rgba(0,0,0,0.10)_0px_2px_4px,rgba(0,0,0,0.10)_0px_4px_8px,rgba(0,0,0,0.10)_0px_8px_16px,_rgba(0,0,0,0.10)_0px_16px_32px,rgba(0,0,0,0.10)_0px_32px_64px]"
        src={Logo}
        width={0}
        height={0}
        alt=""
      />
      <div className="w-[800px] max-lg:pt-8 max-lg:w-full flex  rounded-lg shadow-[rgba(0,0,0,0.07)_0px_1px_2px,rgba(0,0,0,0.10)_0px_2px_4px,rgba(0,0,0,0.10)_0px_4px_8px,rgba(0,0,0,0.10)_0px_8px_16px,_rgba(0,0,0,0.10)_0px_16px_32px,rgba(0,0,0,0.10)_0px_32px_64px]">
        <div className="lg:w-1/2 max-lg:hidden p-4 flex items-center justify-center rounded-l-lg bg-red-600">
          <Image
            className="bg-red-600 rounded-full shadow-[rgba(0,0,0,0.07)_0px_1px_2px,rgba(0,0,0,0.10)_0px_2px_4px,rgba(0,0,0,0.10)_0px_4px_8px,rgba(0,0,0,0.10)_0px_8px_16px,_rgba(0,0,0,0.10)_0px_16px_32px,rgba(0,0,0,0.10)_0px_32px_64px]"
            src={Logo}
            width={0}
            height={0}
            alt=""
          />
        </div>
        <div className="w-1/2 max-lg:w-full">
          <form
            ref={ref}
            className="w-full bg-white p-6 flex flex-col max-md:rounded-l-lg rounded-r-lg gap-3"
            action={clientAction}
          >
            <div>
              <h1 className="font-bold text-3xl">Ayo Gabung</h1>
              <p className="font-medium">
                Daftar & ajak teman makin rame makin seru.
              </p>
            </div>
            <Input error={error} />
          </form>
        </div>
      </div>
    </section>
  );
}
