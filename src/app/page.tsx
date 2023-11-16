import Footer from "@/components/Footer";
import Form from "@/components/Form";
import Header from "@/components/Header";
import Home from "@/components/Home";

export default function page() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <Home />
        <Form />
      </main>
      <Footer />
    </>
  );
}
