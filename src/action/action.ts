"use server";
import prisma from "@/lib/prisma";
import { dataSchema } from "@/lib/types";
import axios from "axios";
import { revalidatePath } from "next/cache";

export const createData = async (newData: unknown) => {
  const result = dataSchema.safeParse(newData);
  if (!result.success) {
    let error = "";
    result.error.issues.forEach((issue) => {
      error = error + issue.message;
    });

    return { error: error };
  }

  await prisma.data.create({
    data: result.data,
  });
  revalidatePath("/");
};

export async function verifyCaptcha(token: string | null) {
  const res = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
  )
  if (res.data.success) {
    return "success!"
  } else {
    throw new Error("Failed Captcha")
  }
}
