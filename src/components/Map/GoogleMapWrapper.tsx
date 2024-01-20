import { FC, PropsWithChildren } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";

const GoogleMapWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="h-[70vh]">
      <APIProvider apiKey={process.env.REACT_APP_API_KEY!}>
        <Map
          zoom={5.8}
          center={{ lat: 49.0384, lng: 31.4513 }}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
        >
          {children}
        </Map>
      </APIProvider>
    </div>
  );
};

export default GoogleMapWrapper;
