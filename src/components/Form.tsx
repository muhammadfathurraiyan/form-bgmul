"use client";
import { createData, verifyCaptcha } from "@/action/action";
import Input from "@/components/Input";
import { dataSchema } from "@/lib/types";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import Logo from "../../public/ayo.png";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import ReCAPTCHA from "react-google-recaptcha";

export default function Form({ datas }: { datas: number }) {
  const [error, setError] = useState("");
  const ref = useRef<HTMLFormElement>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isVerified, setIsverified] = useState<boolean>(false);

  const [dataTotal, setDataTotal] = useState(1);
  useEffect(() => {
    setDataTotal(datas)
  }, [dataTotal])
  

  async function handleCaptchaSubmission(token: string | null) {
    await verifyCaptcha(token)
      .then(() => setIsverified(true))
      .catch(() => setIsverified(false));
  }

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
      // Refresh();
      showSwal(newData);
    }

    const response = await createData(result.data);
    if (response?.error) {
      setError(response.error);
    }
  };

  return (
    <>
      <section
        id="form"
        className="px-24 max-lg:px-4 py-12 max-lg:py-6 flex flex-col items-center justify-center relative"
      >
        <Image
          className="bg-red-600 lg:hidden rounded-full absolute w-20 -top-4 left-10 p-1 shadow-[rgba(0,0,0,0.07)_0px_1px_2px,rgba(0,0,0,0.10)_0px_2px_4px,rgba(0,0,0,0.10)_0px_4px_8px,rgba(0,0,0,0.10)_0px_8px_16px,_rgba(0,0,0,0.10)_0px_16px_32px,rgba(0,0,0,0.10)_0px_32px_64px]"
          src={Logo}
          width={0}
          height={0}
          alt="logo"
          priority
        />
        <div className="w-[800px] max-lg:pt-8 max-lg:w-full flex  rounded-lg shadow-[rgba(0,0,0,0.07)_0px_1px_2px,rgba(0,0,0,0.10)_0px_2px_4px,rgba(0,0,0,0.10)_0px_4px_8px,rgba(0,0,0,0.10)_0px_8px_16px,_rgba(0,0,0,0.10)_0px_16px_32px,rgba(0,0,0,0.10)_0px_32px_64px]">
          <div className="lg:w-1/2 max-lg:hidden p-4 flex items-center justify-center rounded-l-lg bg-red-600">
            <Image
              className="bg-red-600 rounded-full shadow-[rgba(0,0,0,0.07)_0px_1px_2px,rgba(0,0,0,0.10)_0px_2px_4px,rgba(0,0,0,0.10)_0px_4px_8px,rgba(0,0,0,0.10)_0px_8px_16px,_rgba(0,0,0,0.10)_0px_16px_32px,rgba(0,0,0,0.10)_0px_32px_64px]"
              src={Logo}
              width={0}
              height={0}
              alt="logo"
              priority
            />
          </div>
          <div className="w-1/2 max-lg:w-full">
            <form
              ref={ref}
              className="w-full relative bg-white p-6 flex flex-col max-md:rounded-l-lg rounded-r-lg gap-3"
              action={clientAction}
            >
              <div>
                <h1 className="font-bold text-3xl">Ayo Gabung</h1>
                <p className="font-medium">
                  Daftar & ajak teman makin rame makin seru.
                </p>
              </div>
              <Input error={error} />
              <ReCAPTCHA
                ref={recaptchaRef}
                onChange={handleCaptchaSubmission}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
              />
              <p className="absolute bottom-[4.7rem] text-xs font-semibold">
                Form telah diisi sebanyak : {dataTotal}
              </p>
              <button
                disabled={!isVerified}
                className={`${
                  isVerified
                    ? "bg-red-600 border-red-700 hover:bg-red-700"
                    : "bg-red-600/80 border-red-400 cursor-default"
                } mt-5 py-2 px-4 cursor-pointer text-center text-white duration-300  border rounded-md shadow-[rgba(0,0,0,0.07)_0px_1px_2px,rgba(0,0,0,0.10)_0px_2px_4px,rgba(0,0,0,0.10)_0px_4px_8px,rgba(0,0,0,0.10)_0px_8px_16px,_rgba(0,0,0,0.10)_0px_16px_32px,rgba(0,0,0,0.10)_0px_32px_64px]`}
              >
                Siap Gabung!
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
