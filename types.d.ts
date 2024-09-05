type MyLocation = {
  lat: number;
  lng: number;
};

interface DataMap {
  id: number;
  deviceCode: string;
  nama: string;
  lat: number;
  lng: number;
  sensSoil: number;
  sensPressure: number;
  sensTilt: number;
  statusTiang: string;
  timeStamp: string;
}

type DataTiang = {
  id: number;
  deviceCode: string;
  nama: string;
  lat: number;
  lng: number;
};

type DataSensor = {
  id: number;
  deviceCode: string;
  statusTiang: string;
  sensSoil: number;
  sensPressure: number;
  sensTilt: number;
  timeStamp: string;
};
