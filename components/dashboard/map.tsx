"use client";
import { useState, useEffect, useCallback, useRef } from "react";
// import React from "react";
import Image from "next/image";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
  Circle,
  Polyline,
} from "@react-google-maps/api";
import { mapContainerStyle, options, centerItera } from "@/lib/mapSetting";
import { twMerge } from "tailwind-merge";

import { Divide, Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// const dataTiang: DataMap[] = datamock;

export default function Map({
  className,
  dataMap,
}: {
  className?: string;
  dataMap: DataMap[];
}) {
  // const [myLocation, setMyLocation] = useState<MyLocation | null>(null);
  const [selectedPole, setSelectedPole] = useState<DataMap | null>(null);
  const [openComboBox, setOpenComboBox] = useState(false);
  const [valueSearched, setValueSearched] = useState("");
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!,
  });

  //todo : ini harunsya bukan any
  const mapRef = useRef<any | null>(null);

  const onMapLoad = useCallback((map: any) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }: MyLocation) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(17);
    // setMyLocation({ lat, lng });
  }, []);

  function onSelectPole(tiang: DataMap) {
    setSelectedPole(tiang);
    setValueSearched(tiang.nama);
  }
  function onCloseInfoWindow() {
    setSelectedPole(null);
    setValueSearched("");
  }

  if (loadError) return <div>Error . . .</div>;
  if (!isLoaded) return <div>Loading . . .</div>;
  return (
    <div className={twMerge("relative", className)}>
      <LocateMe panTo={panTo} />

      <div
        id="search-tiang"
        className="absolute top-0 left-1/2 z-10 -translate-x-1/2 pt-2"
      >
        <Popover open={openComboBox} onOpenChange={setOpenComboBox}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openComboBox}
              className="w-[200px] justify-between"
            >
              {valueSearched
                ? dataMap.find((tiang) => tiang.nama === valueSearched)?.nama
                : "Cari Tiang"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Nama Tiang" />
              <CommandEmpty>Tiang Tidak Ada.</CommandEmpty>
              <CommandGroup>
                <CommandList>
                  {dataMap.map((tiang) => (
                    <CommandItem
                      key={tiang.nama}
                      value={tiang.nama}
                      onSelect={(currentValueSearced: string) => {
                        setValueSearched(
                          currentValueSearced === valueSearched
                            ? ""
                            : currentValueSearced
                        );
                        setSelectedPole(
                          currentValueSearced !== valueSearched ? tiang : null
                        );
                        setOpenComboBox(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          valueSearched === tiang.nama
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {tiang.nama}
                    </CommandItem>
                  ))}
                </CommandList>
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <GoogleMap
        id="google-map"
        mapContainerStyle={mapContainerStyle}
        options={options}
        center={centerItera}
        zoom={17}
        onLoad={onMapLoad}
      >
        {dataMap.map((tiang) => (
          <Marker
            key={tiang.id}
            position={{ lat: tiang.lat, lng: tiang.lng }}
            onClick={() => onSelectPole(tiang)}
            icon={{
              url: `${getIconURL(tiang.statusTiang)}`,
              // origin: new window.google.maps.Point(0, 0),
              // anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(45, 45),
            }}
          />
        ))}

        {selectedPole ? (
          <InfoWindow
            position={{ lat: selectedPole.lat, lng: selectedPole.lng }}
            options={{ pixelOffset: new google.maps.Size(0, -40) }}
            onCloseClick={() => {
              onCloseInfoWindow();
            }}
          >
            <div>
              <div
                className={twMerge(
                  "w-full h-10 flex bg-red-50 items-center",
                  StyleStatusInfoWindow(selectedPole.statusTiang)
                )}
              >
                <p className="font-bold  w-full text-center uppercase text-white">
                  {selectedPole.statusTiang}
                </p>
              </div>

              <h5 className="text-2xl font-bold mb-3">{selectedPole.nama}</h5>
              <div className="grid grid-cols-2 gap-2">
                <div className="border ">
                  <h6 className="text-xs font-medium p-1">Kelembaban Tanah</h6>
                  <p className=" text-xl font-semibold text-center">
                    {selectedPole.sensSoil}
                  </p>
                </div>
                <div className="border ">
                  <h6 className="text-xs font-medium p-1">Tekanan Udara</h6>
                  <p className=" text-xl font-semibold text-center">
                    {selectedPole.sensPressure}
                  </p>
                </div>
                <div className="border col-span-2 p-1">
                  <h6 className="text-xs font-medium">Kemiringan</h6>
                  <p className=" text-xl font-semibold text-center">
                    {selectedPole.sensTilt}
                  </p>
                </div>
              </div>
            </div>
          </InfoWindow>
        ) : null}

        {/* <Marker
          key={0}
          position={{ lat: -6.2088, lng: 106.8456 }}
          icon={{
            url: "/icon/poleBlack.png",
            // scaledSize: new google.maps.Size(30, 30),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15),
            scaledSize: new window.google.maps.Size(45, 45),
          }}
        /> */}

        {/* <Circle
          center={{ lat: -6.2088, lng: 106.8456 }}
          radius={1000}
          options={{ fillColor: "#FF0000", strokeColor: "#FF0000" }}
        /> */}
      </GoogleMap>
    </div>
  );
}

function LocateMe({ panTo }: { panTo: (location: MyLocation) => void }) {
  const onClicka = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      panTo({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  };

  return (
    <button
      className="z-10 bg-transparent border-none absolute top-20 right-4  h-8 w-8 bg-red-300"
      onClick={onClicka}
    >
      {/* <Image src="/compass.svg" alt="compass" height={20} width={20} /> */}
    </button>
  );
}

function getIconURL(status: string) {
  switch (status) {
    case "aman":
      return "/icon/poleGreen.png";

    case "waspada":
      return "/icon/poleYellow.png";

    case "bahaya":
      return "/icon/poleRed.png";

    default:
      return "/icon/poleBlack.png";
  }
}

function StyleStatusInfoWindow(status: string) {
  switch (status) {
    case "aman":
      return "bg-aman";

    case "waspada":
      return "bg-waspada";

    case "bahaya":
      return "bg-bahaya";

    default:
      return "bg-black";
  }
}
