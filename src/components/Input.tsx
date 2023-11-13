"use client";
import { useState, useEffect, useRef } from "react";

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

const Input = () => {
  const [datasProv, setDataProv] = useState<ProvinceType>();
  const [provId, setProvId] = useState("");
  const refProv = useRef<HTMLSelectElement>(null);
  const [datasReg, setDataReg] = useState<RegencyType>();
  const [regId, setRegId] = useState("");
  const refReg = useRef<HTMLSelectElement>(null);
  const [datasDis, setDataDis] = useState<DistrictType>();

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

  const OptionsProv = () => {
    if (datasProv) {
      return datasProv.map((data: ProvinceType) => (
        <option key={data.id} id={data.id} value={data.id}>
          {data.name}
        </option>
      ));
    }
  };

  const handleProvId = () => {
    if (refProv.current) {
      setProvId(refProv.current.value);
    }
  };

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

  const OptionsReg = () => {
    if (datasReg) {
      return datasReg.map((data: ProvinceType) => (
        <option key={data.id} id={data.id} value={data.id}>
          {data.name}
        </option>
      ));
    }
  };

  const handleRegId = () => {
    if (refReg.current) {
      setRegId(refReg.current.value);
    }
  };

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

  const OptionsDis = () => {
    if (datasDis) {
      return datasDis.map((data: DistrictType) => (
        <option key={data.id} id={data.id} value={data.id}>
          {data.name}
        </option>
      ));
    }
  };

  return (
    <>
      <div className="flex flex-col w-full">
        <label className="text-xs font-medium" htmlFor="">
          Nama:
        </label>
        <input
          className="p-1 border rounded border-neutral-500 bg-inherit"
          type="text"
        />
      </div>
      <div className="flex flex-col w-full">
        <label className="text-xs font-medium" htmlFor="">
          Nomor Whatsapp:
        </label>
        <input
          className="p-1 border rounded border-neutral-500 bg-inherit"
          type="number"
        />
      </div>
      <div className="flex flex-col w-full">
        <label className="text-xs font-medium" htmlFor="">
          Provinsi
        </label>
        <select
          value={provId}
          ref={refProv}
          onChange={handleProvId}
          className="p-1 border rounded border-neutral-500 bg-inherit"
        >
          <option value="provId">--Pilih Provinsi--</option>
          <OptionsProv />
        </select>
      </div>
      <div className="flex flex-col w-full">
        <label className="text-xs font-medium" htmlFor="">
          Kabupaten/Kota
        </label>
        <select
          value={regId}
          ref={refReg}
          onChange={handleRegId}
          className="p-1 border rounded border-neutral-500 bg-inherit"
        >
          <option value="regId">--Pilih Kabupaten/Kota--</option>
          <OptionsReg />
        </select>
      </div>
      <div className="flex flex-col w-full">
        <label className="text-xs font-medium" htmlFor="">
          Kecamatan
        </label>
        <select
          defaultValue="disId"
          className="p-1 border rounded border-neutral-500 bg-inherit"
        >
          <option value="disId">--Pilih Kecamatan--</option>
          <OptionsDis />
        </select>
      </div>
      <button className="p-1 mt-2 rounded bg-orange-600 text-neutral-50">
        Submit
      </button>
    </>
  );
};

export default Input;
