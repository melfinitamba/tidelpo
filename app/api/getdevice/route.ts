import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const device = await prisma.device.findMany();
    return NextResponse.json(device);
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
