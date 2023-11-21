// "use client";
import Form from "@/components/Form";
import Home from "@/components/Home";
import prisma from "@/lib/prisma";
// import { useRouter } from "next/navigation";

export default async function Page() {
  let data = await prisma.data.findMany();
  let datas = data.length;
  // const Router = useRouter();
  // const Refresh = () => {
  //   Router.refresh();
  // };
  return (
    <>
      <Home />
      <Form datas={datas} />
    </>
  );
}
