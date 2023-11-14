import { z } from "zod";

export const dataSchema = z.object({
  nama: z
    .string()
    .min(1, { message: "Harap isi nama. " })
    .max(50, { message: "Nama tidak boleh melampaui 50 karakter. " }),
  noWa: z.string().min(11, { message: "Nomor WA tidak valid. " }),
  provinsi: z.string().min(1, { message: "Provinsi tidak valid. " }),
  kabupatenKota: z.string().min(1, { message: "Kabupaten/Kota tidak valid. " }),
  kecamatan: z.string().min(1, { message: "Kecamatan tidak valid. " }),
});
