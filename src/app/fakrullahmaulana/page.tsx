import prisma from "@/lib/prisma";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export default async function page() {
  const data = await prisma.data.findMany();
  return (
    <section className="px-24 mt-16 py-12">
      <h1 className="text-center text-2xl font-bold mb-2">Total Data</h1>
      <div className="relative overflow-x-auto shadow-[rgba(0,0,0,0.07)_0px_1px_2px,rgba(0,0,0,0.10)_0px_2px_4px,rgba(0,0,0,0.10)_0px_4px_8px,rgba(0,0,0,0.10)_0px_8px_16px,_rgba(0,0,0,0.10)_0px_16px_32px,rgba(0,0,0,0.10)_0px_32px_64px] rounded-lg border border-neutral-500">
        <table className="w-full text-xs text-left rounded-t-lg">
          <thead className="bg-red-600 text-white ">
            <tr>
              <th className="px-6 py-2 border-r border-white text-center">No</th>
              <th className="px-6 py-2 border-r border-white">Nama</th>
              <th className="px-6 py-2 border-r border-white">No WA</th>
              <th className="px-6 py-2 border-r border-white">Provinsi</th>
              <th className="px-6 py-2 border-r border-white">Kabupaten / Kota</th>
              <th className="px-6 py-2 border-r border-white">Kecamatan</th>
              <th className="px-6 py-2 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-neutral-100">
            {data.map((data, index) => (
              <tr className="border-t border-neutral-500" key={index}>
                <td className="px-6 py-2 border-r border-neutral-500 text-center">{++index}</td>
                <td className="px-6 py-2 border-r border-neutral-500">{data.nama}</td>
                <td className="px-6 py-2 border-r border-neutral-500">{data.noWa}</td>
                <td className="px-6 py-2 border-r border-neutral-500">{data.provinsi}</td>
                <td className="px-6 py-2 border-r border-neutral-500">{data.kabupatenKota}</td>
                <td className="px-6 py-2 border-r border-neutral-500">{data.kecamatan}</td>
                <td className="px-6 py-2 text-center"><Link target="_blank" href={`https://wa.me/${data.noWa}`}><FaWhatsapp size={20} /></Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
