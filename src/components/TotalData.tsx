
import prisma from "@/lib/prisma";

const TotalData = async () => {
  let datas = await prisma.data.findMany();

  return (
    <p className="absolute bottom-[4.7rem] text-xs font-semibold">
      Form telah diisi sebanyak : {datas.length}
    </p>
  );
};

export default TotalData;
