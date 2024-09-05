import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(reqas: NextRequest) {
  const url = `https://api.telegram.org/bot${process.env.TELE_BOT_ID}/sendMessage`;
  //   const data = await reqas.json();

  try {
    const res = await axios.post(url, {
      chat_id: process.env.TELE_USER_ID,
      text: "data.text",
    });
    return NextResponse.json({ status: res.status });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
