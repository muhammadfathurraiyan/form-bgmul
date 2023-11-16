"use client";
import { useState, useEffect, useRef } from "react";
import Select from "react-select";
// @ts-ignore
import { ValueType } from "react-select";
import { FaUser, FaWhatsapp } from "react-icons/fa";

type ProvinceType = {
  map: any;
  id: string;
  name: string;
};

type RegencyType = {
  map: any;
  id: string;
  province_id: string;
  name: string;
};

type DistrictType = {
  map: any;
  id: string;
  regency_id: string;
  name: string;
};

type Option = {
  value: string;
  label: string;
};

const Input = ({ error }: { error: string }) => {
  const [datasProv, setDataProv] = useState<ProvinceType>();
  const [provId, setProvId] = useState("");
  const [selectedProvOption, setSelectedProvOption] =
    useState<ValueType<Option>>(null);
  const [datasReg, setDataReg] = useState<RegencyType>();
  const [regId, setRegId] = useState("");
  const [selectedRegOption, setSelectedRegOption] =
    useState<ValueType<Option>>(null);
  const [datasDis, setDataDis] = useState<DistrictType>();
  const [selectedDisOption, setSelectedDisOption] =
    useState<ValueType<Option>>(null);
  const [button, setButton] = useState(false);

  const [nama, setNama] = useState("");
  const namaRef = useRef<HTMLInputElement>(null);
  const [wa, setWa] = useState("");
  const waRef = useRef<HTMLInputElement>(null);

  const apiProv = async () => {
    const api = await fetch(
      `https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json`
    );
    const response = await api.json();
    const data = response.map((res: ProvinceType) => ({
      id: res.id,
      name: res.name,
    }));
    setDataProv(
      data.sort((a: ProvinceType, b: ProvinceType) =>
        a.name.localeCompare(b.name)
      )
    );
  };

  useEffect(() => {
    apiProv();
  }, []);

  const OptionsProv = datasProv?.map((data: ProvinceType) => ({
    label: data.name,
    value: `${data.name},${data.id}`,
  }));

  const handleProvId = () => {
    if (selectedProvOption) {
      const data = selectedProvOption.value.split(",");
      setProvId(data[1]);
    }
  };

  useEffect(() => {
    handleProvId();
  }, [selectedProvOption]);

  const apiReg = async () => {
    const api = await fetch(
      `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provId}.json`
    );
    const response = await api.json();
    const data = response.map((res: RegencyType) => ({
      id: res.id,
      province_id: res.province_id,
      name: res.name,
    }));
    setDataReg(
      data.sort((a: RegencyType, b: RegencyType) =>
        a.name.localeCompare(b.name)
      )
    );
  };

  useEffect(() => {
    if (provId) {
      apiReg();
    }
  }, [provId]);

  const OptionsReg = datasReg?.map((data: RegencyType) => ({
    label: data.name,
    value: `${data.name},${data.id}`,
  }));

  const handleRegId = () => {
    if (selectedRegOption) {
      const data = selectedRegOption.value.split(",");
      setRegId(data[1]);
    }
  };

  useEffect(() => {
    handleRegId();
  }, [selectedRegOption]);

  const apiDis = async () => {
    const api = await fetch(
      `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${regId}.json`
    );
    const response = await api.json();
    const data = response.map((res: DistrictType) => ({
      id: res.id,
      regency_id: res.regency_id,
      name: res.name,
    }));
    setDataDis(
      data.sort((a: DistrictType, b: DistrictType) =>
        a.name.localeCompare(b.name)
      )
    );
  };

  useEffect(() => {
    if (regId) {
      apiDis();
    }
  }, [regId]);

  const OptionsDis = datasDis?.map((data: DistrictType) => ({
    label: data.name,
    value: `${data.name},${data.id}`,
  }));

  return (
    <>
      <div className="relative flex flex-col w-full">
        <label className="text-xs font-medium" htmlFor="">
          Nama:
        </label>
        <FaUser className="absolute top-7 text-lg text-neutral-400 left-3" />
        <input
          autoFocus
          placeholder="Budiman"
          name="nama"
          className="py-2 pl-9 pr-2 border rounded border-neutral-500"
          type="text"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />
        {error.includes("Harap isi nama.") && (
          <p className="text-sm text-red-600">Harap isi nama.</p>
        )}
        {error.includes("Nama tidak boleh melampaui 50 karakter.") && (
          <p className="text-sm text-red-600">
            Nama tidak boleh melampaui 50 karakter.
          </p>
        )}
      </div>
      <div className="relative flex flex-col w-full">
        <label className="text-xs font-medium" htmlFor="">
          Nomor Whatsapp:
        </label>
        <FaWhatsapp className="absolute top-6 text-2xl text-neutral-400 left-2" />
        <input
          placeholder="08765432123"
          name="noWa"
          className="py-2 pl-9 pr-2 border rounded border-neutral-500"
          type="number"
          value={wa}
          onChange={(e) => setWa(e.target.value)}
        />
        {error.includes("Nomor WA tidak valid.") && (
          <p className="text-sm text-red-600">Nomor WA tidak valid.</p>
        )}
      </div>
      <div className="flex flex-col w-full">
        <label className="text-xs font-medium" htmlFor="">
          Provinsi :
        </label>
        <Select
          placeholder="Provinsi"
          name="provinsi"
          value={selectedProvOption}
          options={OptionsProv}
          onChange={(e) => setSelectedProvOption(e)}
          className=" border rounded border-neutral-500 bg-inherit"
        />
        {error.includes("Provinsi tidak valid.") && (
          <p className="text-sm text-red-600">Provinsi tidak valid.</p>
        )}
      </div>
      <div className="flex flex-col w-full">
        <label className="text-xs font-medium" htmlFor="">
          Kabupaten/Kota :
        </label>
        <Select
          placeholder="Kabupaten / Kota"
          name="kabupatenKota"
          value={selectedRegOption}
          options={OptionsReg}
          onChange={(e) => setSelectedRegOption(e)}
          className=" border rounded border-neutral-500 bg-inherit"
        />
        {error.includes("Kabupaten/Kota tidak valid.") && (
          <p className="text-sm text-red-600">Kabupaten/Kota tidak valid.</p>
        )}
      </div>
      <div className="flex flex-col w-full">
        <label className="text-xs font-medium" htmlFor="">
          Kecamatan :
        </label>
        <Select
          placeholder="Kecamatan"
          name="kecamatan"
          value={selectedDisOption}
          options={OptionsDis}
          onChange={(e) => setSelectedDisOption(e)}
          className=" border rounded border-neutral-500 bg-inherit"
        />
        {error.includes("Kecamatan tidak valid.") && (
          <p className="text-sm text-red-600">Kecamatan tidak valid.</p>
        )}
      </div>
      <div className="flex flex-col w-full">
        <div className="gap-2 flex items-center">
          <input required type="checkbox" />
          <label htmlFor="" className="text-sm font-medium">
            Saya siap untuk tidak golput.
          </label>
        </div>
        <div className="gap-2 flex items-center">
          <input required type="checkbox" />
          <label htmlFor="" className="text-sm font-medium">
            Saya siap memilih berdasarkan hati nurani.
          </label>
        </div>
        <div className="gap-2 flex items-center">
          <input required type="checkbox" />
          <label htmlFor="" className="text-sm font-medium">
            Saya siap untuk menolak politik uang.
          </label>
        </div>
        <div className="gap-2 flex items-center">
          <input required type="checkbox" />
          <label htmlFor="" className="text-sm font-medium">
            Saya siap untuk menanggkal hoax yang ada.
          </label>
        </div>
      </div>
      <button className="py-2 px-4 cursor-pointer hover:bg-red-700 text-center text-white duration-300 bg-red-600 border border-red-700 rounded-md shadow-[rgba(0,0,0,0.07)_0px_1px_2px,rgba(0,0,0,0.10)_0px_2px_4px,rgba(0,0,0,0.10)_0px_4px_8px,rgba(0,0,0,0.10)_0px_8px_16px,_rgba(0,0,0,0.10)_0px_16px_32px,rgba(0,0,0,0.10)_0px_32px_64px]">
        Siap Gabung!
      </button>
    </>
  );
};

export default Input;
