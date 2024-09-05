import TableTiang from "@/components/dashboard/tableTiang";

// import Table from "@/components/dashboard/table";
import { PrismaClient } from "@prisma/client";
import { Suspense } from "react";
const prisma = new PrismaClient();

async function getDataDevice() {
  const dataDevice = await prisma.device.findMany({
    orderBy: {
      id: "asc",
    },
  });

  const dataPenyesuaian = dataDevice.map((item, index) => ({
    id: Number(item.id),
    deviceCode: item.deviceCode,
    nama: item.nama,
    lat: item.lat,
    lng: item.lng,
  }));

  return dataPenyesuaian;
}
export default async function Tabel() {
  const data: DataTiang[] = await getDataDevice();
  return (
    <div className="relative  w-full bg-purple-50 p-5">
      <Suspense fallback={<div>Loading Table...</div>}>
        <TableTiang data={data} />
      </Suspense>
    </div>
  );
}
