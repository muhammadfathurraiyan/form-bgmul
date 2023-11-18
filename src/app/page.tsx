"use client";
import Form from "@/components/Form";
import Home from "@/components/Home";
import { useRouter } from "next/navigation";

export default function Page() {
  const Router = useRouter();
  const Refresh = () => {
    Router.refresh();
  };
  return (
    <>
      <Home />
      <Form Refresh={Refresh} />
    </>
  );
}
