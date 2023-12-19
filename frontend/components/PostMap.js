import { useState, useEffect } from "react";
import ReactMapGl, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Geocode from "react-geocode";
import styles from "@/styles/Post.module.css";

export default function PostMap({ post }) {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    width: "100%",
    height: "100%",
    zoom: 8,
  });

  useEffect(() => {
    Geocode.fromAddress(post.place).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setLat(lat);
        setLng(lng);
        setViewport({ ...viewport, latitude: lat, longitude: lng });
        setLoading(false);
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY);

  if (loading) return false;

  const mapbox_api_key =
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN_DEV
      : process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN_PROD;

  return (
    <div className={styles.post_map}>
      <ReactMapGl
        {...viewport}
        mapboxApiAccessToken={mapbox_api_key}
        onViewportChange={(vp) => setViewport(vp)}
      >
        <Marker key={post.id} latitude={lat} longitude={lng}>
          <img src="/pin.svg" width={30} height={30} />
        </Marker>
      </ReactMapGl>
    </div>
  );
}
