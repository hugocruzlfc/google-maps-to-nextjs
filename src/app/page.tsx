"use client";

import GoogleMaps from "../components/GoogleMaps";
import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    address: "",
    latitude: 41.32313027546416,
    longitude: 2.086369011186136,
    radius: 500,
  });
  const [latitude, setLatitude] = useState<number>(41.32313027546416);
  const [longitude, setLongitude] = useState<number>(2.086369011186136);
  const [address, setAddress] = useState<string>("Barcelona, Spain");

  return (
    <main>
      <div className="w-full h-screen flex  flex-col items-center justify-center bg-gradient-to-b from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
        <div className="flex flex-col w-full items-center gap-y-4">
          <span className="text-4xl font-bold text-white">
            Google Maps in Nextjs!
          </span>
          <GoogleMaps
            style={{
              width: "100%",
              height: "300px",
              padding: "1rem",
              borderBottom: "1px solid #EFF2F7",
            }}
            address={address}
            setAddress={setAddress}
            radius={form.radius}
            setLatitude={setLatitude}
            setLongitude={setLongitude}
            latitude={latitude}
            longitude={longitude}
          />
        </div>
        <div className="flex flex-col">
          <span className="text-4xl font-bold text-white">
            Address: {address}
          </span>
          <span className="text-4xl font-bold text-white">
            Latitude: {latitude}
          </span>
          <span className="text-4xl font-bold text-white">
            Longitude: {longitude}
          </span>
        </div>
      </div>
    </main>
  );
}
