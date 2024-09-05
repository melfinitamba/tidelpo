import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
type reqdevice = {
  deviceCode: string;
};

export async function POST(request: Request) {
  try {
    const body: reqdevice = await request.json();
    try {
      const device = await prisma.device.findUnique({
        where: {
          deviceCode: body.deviceCode,
        },
        select: {
          id: true,
          nama: true,
          lat: true,
          lng: true,
        },
      });
      return NextResponse.json(device);
    } catch (error) {
      return NextResponse.json({ error: "device not listed" }, { status: 500 });
    }

    // return NextResponse.json({ message: body.deviceCode });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
