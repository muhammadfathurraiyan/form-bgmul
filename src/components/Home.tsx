import Image from "next/image";
import Logo from "../../public/presiden.webp";

const Home = () => {
  return (
    <section
      id="beranda"
      className="px-24 max-lg:px-4 max-lg:py-24 max-lg:mt-8 gap-8 max-lg:gap-4 flex max-lg:flex-col items-center justify-between max-lg:justify-center lg:min-h-screen"
    >
      <div className="w-1/2 max-lg:w-full flex flex-col gap-1">
        <h1 className="text-5xl max-lg:text-3xl font-bold uppercase max-lg:text-center">
          Ayo kita sukseskan PEMILU 2024 tanpa{" "}
          <span className="text-red-600">golput!</span>
        </h1>
        <i className="max-lg:text-center">
        &quot;Ayo semua masyarakat indonesia kita bergabung dalam 1 barisan untuk
          indonesia yang lebih baik, dan hasilkan uang 500.000 setelah memilih
          tanpa syarat. (Suara anda adalah penentu masa depan bangsa)&quot;
        </i>
      </div>
      <div className="max-lg:-order-1">
        <Image
          className="rounded-2xl"
          src={Logo}
          alt="foto"
          width={500}
          height={0}
        />
      </div>
    </section>
  );
};

export default Home;
