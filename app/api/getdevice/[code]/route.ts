import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { code: string } }
) {
  try {
    // const data = request.url.split("/")[5];
    // const data = params.code;
    // return NextResponse.json({ message: data });

    try {
      const device = await prisma.device.findUnique({
        where: {
          deviceCode: params.code,
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
      return NextResponse.json({ error: "device not found" }, { status: 404 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
