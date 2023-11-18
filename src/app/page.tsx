"use client";
import Form from "@/components/Form";
import Home from "@/components/Home";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();
  const refresh = () => {
    router.refresh();
  };
  return (
    <>
      <Home />
      <Form refresh={refresh} />
    </>
  );
}
