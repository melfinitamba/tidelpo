import TableSensor from "@/components/dashboard/tableSensor";
// import { dataSensor } from "@/lib/mock/mockSensor";
import { PrismaClient } from "@prisma/client";
import { Suspense } from "react";
const prisma = new PrismaClient();

async function getDataDevice(code: string) {
  const dataDevice = await prisma.sensor.findMany({
    where: {
      deviceCode: code,
    },
    orderBy: {
      timeStamp: "desc",
    },
  });

  const dataPenyesuaian = dataDevice.map((item, index) => ({
    id: index + 1,
    deviceCode: item.deviceCode,
    statusTiang: item.statusTiang,
    sensSoil: item.sensSoil,
    sensPressure: item.sensPressure,
    sensTilt: item.sensTilt,
    timeStamp: item.timeStamp.toString(),
  }));

  return dataPenyesuaian;
}

export default async function Page({ params }: { params: { code: string } }) {
  const data: DataSensor[] = await getDataDevice(params.code);
  // const data = dataSensor.filter((sensor) => sensor.deviceCode === params.code);
  return (
    <div className="  w-full  p-5">
      <Suspense fallback={<div>Loading Table...</div>}>
        <TableSensor data={data} />
      </Suspense>
    </div>
  );
}
