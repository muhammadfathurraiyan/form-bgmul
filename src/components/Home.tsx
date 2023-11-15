import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/logo.png"

const Home = () => {
  return (
    <section className="px-24 gap-8 flex items-center justify-between min-h-screen">
      <div className="w-1/2 flex flex-col gap-1">
        <h1 className="text-5xl font-bold uppercase">Ayo kita sukseskan PEMILU 2024 <span className="text-red-600">tanpa golput!</span></h1>
        <p className=" ">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam quis, saepe ipsa perferendis quam quae officia repellendus dolorem dolorum, ducimus consectetur itaque necessitatibus error magni? Magni et natus ullam quisquam!</p>
        <Link href="#" className="py-2 px-4 text-lg font-medium hover:bg-red-700 hover:text-white duration-300 bg-red-600 rounded-md mt-4 block w-fit text-neutral-100">Ayo Dukung</Link>
      </div>
      <div>
        <Image src={Logo} alt="foto" width={0} height={0} />
      </div>
    </section>
  );
};

export default Home;
