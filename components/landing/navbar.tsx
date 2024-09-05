"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

export default function Navbar() {
  const { isSignedIn, user, isLoaded } = useUser();
  return (
    <nav className="relative h-[80px] bg-black flex items-center justify-between px-14">
      <div id="logo" className="h-[55px] w-[213px] relative pl-10">
        <Image
          src={`/newlogo.png`}
          alt="Next.js logo"
          height={55}
          width={55}
          style={{ objectFit: "contain" }}
          priority
        />
      </div>

      <div>
        <ul className=" text-white flex items-center gap-4 font-grenze text-xl">
          <li>
            <a href="#beranda">Beranda</a>
          </li>
          <li>
            <a href="#layanan">Layanan</a>
          </li>
          <li>
            <a href="#tentang">Hubungi Kami</a>
          </li>
          {!isSignedIn && (
            <li>
              <a href="/sign-up">Daftar</a>
            </li>
          )}

          <li>
            <Link
              href={"/sign-in"}
              className="text-black py-3 px-7 bg-accentyellow rounded-sm"
            >
              {isSignedIn ? "Dashboard" : "Masuk"}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
