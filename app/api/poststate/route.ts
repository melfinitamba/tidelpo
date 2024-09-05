import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Status_tiang } from "@prisma/client";
const prisma = new PrismaClient();
import axios from "axios";

type reqstate = {
  deviceCode: string;
  lat: number;
  lng: number;
  statusTiang: "aman" | "waspada" | "bahaya";
  sensSoil: number;
  sensPressure: number;
  sensTilt: number;
};

export async function POST(request: Request) {
  try {
    const body: reqstate = await request.json();

    try {
      const editlocation = await prisma.device.update({
        where: {
          deviceCode: body.deviceCode,
        },
        data: {
          lat: body.lat,
          lng: body.lng,
        },
      });

      if (editlocation) {
        const writestate = await prisma.sensor.create({
          data: {
            deviceCode: body.deviceCode,
            statusTiang: body.statusTiang as Status_tiang,
            sensSoil: body.sensSoil,
            sensPressure: body.sensPressure,
            sensTilt: body.sensTilt,
          },
        });
        return NextResponse.json({ message: writestate }, { status: 200 });

        // try {
        //   if (process.env.SEND_TELE_YES === "yes") {
        //     const url = `https://api.telegram.org/bot${process.env.TELE_BOT_ID}/sendMessage`;
        //     const res = await axios.post(url, {
        //       chat_id: process.env.TELE_USER_ID,
        //       text: `Device Code : ${body.deviceCode} \nStatus Tiang : ${body.statusTiang} \nKelembaban Tanah : ${body.sensSoil} \nTekanan Udara : ${body.sensPressure} \nKemiringan : ${body.sensTilt}`,
        //     });
        //     // return NextResponse.json({ status: res }, { status: 200 });
        //   }
        //   return NextResponse.json({ status: "writestate" }, { status: 200 });
        // } catch (error) {
        //   return NextResponse.json({ error: error }, { status: 302 });
        // }
      }
    } catch (error) {
      return NextResponse.json({ dataerror: error }, { status: 404 });
    }
  } catch (e) {
    return NextResponse.json({ reqerror: e }, { status: 406 });
  }
}
