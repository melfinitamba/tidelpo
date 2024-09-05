import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";
import {
  getDatabase,
  Database,
  ref,
  get,
  onValue,
  DataSnapshot,
} from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

interface SensorData {
  lat: number;
  lng: number;
  sensPressure: number;
  sensSoil: number;
  sensTilt: number;
  statusTiang: string;
}

//   type SensorsArray = [SensorData, SensorData, SensorData];
// type SensorsArray = SensorData;

const listenToSensorsData = (callback: (data: SensorData) => void) => {
  const dbRef = ref(database, "1xmmtha");
  onValue(dbRef, (snapshot: DataSnapshot) => {
    const data = snapshot.val();
    callback(data);
  });
};

const getDeviceData = async (deviceId: string): Promise<SensorData> => {
  const dbRef = ref(database, deviceId);
  const snapshot: DataSnapshot = await get(dbRef);
  if (snapshot.exists()) {
    return snapshot.val() as SensorData;
  } else {
    throw new Error(`No data available for device: ${deviceId}`);
  }
};

export { database, listenToSensorsData, getDeviceData };
