"use server";
import prisma from "@/lib/prisma";
import { dataSchema } from "@/lib/types";
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
