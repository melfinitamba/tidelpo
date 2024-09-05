import Image from "next/image";

interface CardLayananProps {
  url: string;
  title: string;
  description: string;
}

const cardLayanan: CardLayananProps[] = [
  {
    url: "/icon/map.png",
    title: "Lokasi",
    description: "Pemantauan lokasi yang akurat menggunkana saltelit",
  },
  {
    url: "/icon/tilt.png",
    title: "Kemiringan",
    description: "Pemantauan kemiringan tiang listrik secara akurat",
  },
  {
    url: "/icon/pressure.png",
    title: "Tekanan Udara ",
    description: "Pemantauan tekanan udara  secara akurat",
  },
  {
    url: "/icon/humidity.png",
    title: "Kelembaban Tanah",
    description: "Pemantauan kelembaban tanah  secara akurat",
  },
];

export default function Home() {
  return (
    <div className="relative ">
      <div id="hero" className="h-screen relative">
        {/* <div className="absolute bottom-1/2 z-10 pl-20 text-white">
          <h3 className="text-xl ">Cermati Alur Dari Hulu Ke Hilir</h3>
          <h1 className=" text-5xl  font-black">
            Monitor Tiang Listrik dengan Mudah dan Efisien
          </h1>
        </div> */}
        <div className="absolute bottom-1/2 z-10 pl-20 text-white  text-5xl  font-black flex flex-col gap-3">
          <h1 className="">TILT DETECTION of POLE</h1>
          <h1 className="">(DETEKSI KEMIRINGAN TIANG LISTRIK)</h1>
        </div>
        <Image
          src={`${process.env.NEXT_PUBLIC_MEDIA_URL}landing%2Fhero.jpg`}
          alt="Next.js logo"
          fill
          style={{ objectFit: "cover" }}
          priority
          className=""
        />
      </div>

      <div id="layanan" className="flex flex-col  items-center mt-20 gap-10">
        <h2 className=" font-bold text-4xl">Layanan</h2>
        <div className=" flex gap-5 ">
          {cardLayanan.map((card, index) => (
            <CardLayanan key={index} {...card} />
          ))}
        </div>
      </div>

      <div
        id="tentang"
        className="flex  relative w-full justify-center gap-10 my-20"
      >
        <div className=" w-2/5 h-[503px] relative">
          <Image
            src={"https://tidelpo.auziqni.com/landing/alattidelpo.jpg"}
            alt="Next.js logo"
            fill
            style={{ objectFit: "contain" }}
            className=""
          />
        </div>
        <div className=" w-2/5 h-[503px] my-10 ">
          <h2 className="font-bold text-4xl mb-5 ">TENTANG KAMI</h2>
          <p className=" text-justify">
            TIDELPO adalah solusi inovatif dalam dunia Internet of Things (IoT)
            yang dirancang khusus untuk memantau kemiringan tiang listrik.
            Dengan menggabungkan teknologi canggih, TIDELPO memberikan kontrol
            penuh dan infirmasi real-time untuk memastikan keadaan aman tiang
            listrik. Ini adalah langkah maju dalam memastikan efisiennya
            penyaluran listrik dan keamanan lingkungan dari bahaya miringnya
            tiang listrik.
          </p>
          <p className=" text-justify">
            TIDELPO hadir dengan fitur canggih untuk memantau kemiringan tiang
            listrik secara akurat. Sensor yang sensitif dan sistem analitik yang
            cerdas mendeteksi parameter penting, seperti derajat kemiringan,
            tekanan udara, dan kelembapan tanah. Ketika parameter-parameter ini
            berada diluar kisaran yang aman, TIDELPO akan memberikan informasi
            kepada pemilik, memungkinkan tindakan cepat untuk melakukan
            perbaikan sebelum tiang listrik semakin miring.
          </p>
          <div className="grid grid-cols-2 px-10 mt-10">
            <div className="col-span-1">
              <h3 className="font-bold">Tim</h3>
              <p className="hover:text-yellow-600">Frikles Lumbantoruan</p>
              <p className="hover:text-yellow-600">Melfini Tamba</p>
              <p className="hover:text-yellow-600">082183401772</p>
            </div>
            <div className="col-span-1">
              <h3 className="font-bold">alamat</h3>
              <p>
                Alamat Jl. Terusan Ryacudu, Way Huwi, Kec. Jati Agung, Kabupaten
                Lampung Selatan, Lampung 35365
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardLayanan({ url, title, description }: CardLayananProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-[244px] h-[330px] flex flex-col gap-8 items-center">
      <Image src={url} alt={title} width={120} height={120} />
      <div className="flex flex-col gap-1 items-center">
        <h3 className="text-xl text-center font-semibold">{title}</h3>
        <p className=" text-center">{description}</p>
      </div>
    </div>
  );
}
