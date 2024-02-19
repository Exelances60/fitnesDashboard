"use client";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { ProgressCircle } from "@tremor/react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
const params = {
  q: "",
  format: "json",
  addressdetails: "addressdetails",
};

interface MapProps {
  address: string;
}

const Map = ({ address }: MapProps) => {
  const [cordinat, setCordinat] = useState([0, 0]);
  useEffect(() => {
    const fetchCordinat = async (e: string) => {
      params.q = e;
      const url = new URLSearchParams(params).toString();
      const res = await fetch(`${NOMINATIM_BASE_URL}${url}`);
      const data = await res.json();
      setCordinat(
        data[0] ? [+data[0]?.boundingbox[0], +data[0].boundingbox[2]] : [1, 1]
      );
    };
    fetchCordinat(address);
  }, [address]);

  if (cordinat[0] === 0 && cordinat[1] === 0) return <ProgressCircle />;

  const marker = new L.Icon({
    iconUrl:
      "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  L.Marker.prototype.options.icon = marker;

  return (
    <>
      <MapContainer
        center={[cordinat[0], cordinat[1]]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[cordinat[0], cordinat[1]]} icon={marker}>
          <Popup>
            <span>{address}</span>
          </Popup>
        </Marker>
      </MapContainer>
    </>
  );
};

export default Map;
