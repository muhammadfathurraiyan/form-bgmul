"use client";
import { createData } from "@/action/action";
import Input from "@/components/Input";
import { dataSchema } from "@/lib/types";
import { useState, useRef } from "react";

export default function Home() {
  const [error, setError] = useState("");
  const ref = useRef<HTMLFormElement>(null);
  const clientAction = async (data: FormData) => {
    const prov = `,${data.get("provinsi")}`
    const dataProv = prov.split(",")
    const kabKot = `,${data.get("kabupatenKota")}`
    const dataKabKot = kabKot.split(",")
    const kec = `,${data.get("kecamatan")}`
    const dataKec = kec.split(",")
    
    const newData = {
      nama: data.get("nama"),
      noWa: data.get("noWa"),
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
    }

    const response = await createData(result.data);
    if (response?.error) {
      setError(response.error);
    }
  };
  return (
    <section className="p-4 h-screen flex items-center justify-center">
      <form
        ref={ref}
        className="bg-neutral-50 p-4 flex flex-col border border-neutral-600 gap-4 max-w-md"
        action={clientAction}
      >
        {error && <p className="text-red-500">{error}</p>}
        <Input />
      </form>
    </section>
  );
}
