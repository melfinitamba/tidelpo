"use client";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { MobileSidebar } from "@/components/dashboard/sideBarMobbile";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const pathName = usePathname();
  // const currentPage = router.pathname;

  // bg-[#E4EFE7]
  return (
    <div className="sticky flex top-0 justify-between z-20 h-16 p-4 shadow-lg bg-white ">
      <div className="h-5 w-5 bg-white ">
        <MobileSidebar />
      </div>
      <h1>{getPageDecription(pathName)}</h1>
      <div className="">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;

function getPageDecription(path: string) {
  switch (path) {
    case "/":
      return "Home";
    case "/dashboard":
      return "Dashboard";
    case "/tabel":
      return "Tabel";
    case "/tabel/[code]":
      return "Detail Tabel";
    case "/setting":
      return "Setting";
    default:
      return "";
  }
}
