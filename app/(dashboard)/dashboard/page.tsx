import Map from "@/components/dashboard/map";
import React, { Suspense } from "react";
// import datamock from "@/lib/mock/alatMock.json";
// import { PrismaClient } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function getTiang() {
  const tiang = await prisma.device.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      sensors: {
        take: 1,
        select: {
          sensSoil: true,
          sensPressure: true,
          sensTilt: true,
          statusTiang: true,
          timeStamp: true,
        },
        orderBy: {
          timeStamp: "desc",
        },
      },
    },
  });

  const dataPenyesuaian = tiang.map((item, index) => ({
    id: Number(item.id),
    deviceCode: item.deviceCode,
    nama: item.nama,
    lat: item.lat,
    lng: item.lng,
    sensSoil: item.sensors[0].sensSoil,
    sensPressure: item.sensors[0].sensPressure,
    sensTilt: item.sensors[0].sensTilt,
    statusTiang: item.sensors[0].statusTiang,
    timeStamp: item.sensors[0].timeStamp.toString(),
  }));

  return dataPenyesuaian;
}

export default async function Dashboard() {
  const dataTiang: DataMap[] = await getTiang();
  return (
    <div className="relative">
      <Suspense fallback={<div>Loading Map...</div>}>
        <Map dataMap={dataTiang} />
      </Suspense>
    </div>
  );
}
