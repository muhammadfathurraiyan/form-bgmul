"use client";
import { useState, useEffect } from "react";
import Select from "react-select";
// @ts-ignore
import { ValueType } from "react-select";

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

const Input = () => {
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
      <div className="flex flex-col w-full">
        <label className="text-xs font-medium" htmlFor="">
          Nama:
        </label>
        <input
          placeholder="John Doe"
          name="nama"
          className="p-2 border rounded border-neutral-500 bg-inherit"
          type="text"
        />
      </div>
      <div className="flex flex-col w-full">
        <label className="text-xs font-medium" htmlFor="">
          Nomor Whatsapp:
        </label>
        <input
          placeholder="08765432123"
          name="noWa"
          className="p-2 border rounded border-neutral-500 bg-inherit"
          type="number"
        />
      </div>
      <div className="flex flex-col w-full">
        <label className="text-xs font-medium" htmlFor="">
          Provinsi
        </label>
        <Select
          placeholder="Pilih Provinsi"
          name="provinsi"
          value={selectedProvOption}
          options={OptionsProv}
          onChange={(e) => setSelectedProvOption(e)}
          className=" border rounded border-neutral-500 bg-inherit"
        />
      </div>
      <div className="flex flex-col w-full">
        <label className="text-xs font-medium" htmlFor="">
          Kabupaten/Kota :
        </label>
        <Select
          placeholder="Pilih Kabupaten/Kota"
          name="kabupatenKota"
          value={selectedRegOption}
          options={OptionsReg}
          onChange={(e) => setSelectedRegOption(e)}
          className=" border rounded border-neutral-500 bg-inherit"
        />
      </div>
      <div className="flex flex-col w-full">
        <label className="text-xs font-medium" htmlFor="">
          Kecamatan :
        </label>
        <Select
          placeholder="Pilih Kecamatan"
          name="kecamatan"
          value={selectedDisOption}
          options={OptionsDis}
          onChange={(e) => setSelectedDisOption(e)}
          className=" border rounded border-neutral-500 bg-inherit"
        />
      </div>
      <div className="flex flex-col w-full"></div>
      <button className="p-2 mt-2 rounded bg-[#ED1B24] text-neutral-50">
        Submit
      </button>
    </>
  );
};

export default Input;
