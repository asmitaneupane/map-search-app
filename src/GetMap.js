import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

const icon = L.icon({
  iconUrl: "./pointer.png",
  iconSize: [38, 38],
});

const position = [51.505, -0.09];

function ResetCenterView({selectPosition}) {
    const map = useMap();

    useEffect(()=> {
        if(selectPosition) {
            map.setView(
                L.latLng(selectPosition.lat, selectPosition.lon),
                map.getZoom(),
                {
                    animate: true
                }
            )
        }
    },[selectPosition]);
    
    return null;
}

export default function GetMap({ selectPosition }) {
  const locationSelection = [selectPosition?.lat, selectPosition?.lon];
  console.log(locationSelection);

  return (
    <MapContainer
      center={position}
      zoom={8}
      style={{ width: "100%", height: "100%" }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=2SvZWDO7gjDWzsnbdf7C"
      />
      {selectPosition && (
        <Marker position={locationSelection} icon={icon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      )}
      <ResetCenterView selectPosition={selectPosition} />
    </MapContainer>
  );
}
