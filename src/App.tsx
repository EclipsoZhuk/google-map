import { FC, useState } from "react";
import { notification } from "antd";
import { useTranslation } from "react-i18next";
import { Marker } from "@vis.gl/react-google-maps";

// Data
import { mockData } from "./db/mockData";
import type { IMockData } from "./db/data.interface";

// Components
import Header from "./components/Header";
import BaseButton from "./components/UI/BaseButton";
import MapLocationCard from "./components/Map/MapLocationCard";
import GoogleMapWrapper from "./components/Map/GoogleMapWrapper";
import NewLocationModal from "./components/Map/NewLocationModal";

const App: FC = () => {
  const { t } = useTranslation();

  const [data, setData] = useState([] as IMockData[]);
  const [isVisibleNewLocationModal, setIsVisibleNewLocationModal] =
    useState(false);

  const removeLocation = (id: number) => {
    setData((prevData) => {
      const newData = prevData.filter((item) => item.id !== id);
      return newData;
    });
  };

  const editLocation = (id: number) => {
    setData((prevData) => {
      const updatedData = prevData.map((record, index) =>
        index === id ? { ...record, isEdit: true } : record
      );
      return updatedData;
    });
  };

  const saveLocation = (id: number, { lat, lon, name }: IMockData) => {
    setData((prevData) => {
      return prevData.map((record, index) =>
        index === id ? { ...record, name, lat, lon, isEdit: false } : record
      );
    });
  };

  const saveNewLocation = ({ name, lat, lon }: any) => {
    setData((prevData: any) => [
      ...prevData,
      {
        id: prevData.length,
        lat,
        lon,
        name,
      },
    ]);
    setIsVisibleNewLocationModal(false);
    notification.open({
      duration: 2,
      message: t("done"),
      description: t("successfully"),
    });
  };
  return (
    <>
      <Header />
      <main className="flex flex-row flex-wrap p-4">
        <section className="flex-[250] py-4 pl-4 mr-4">
          <GoogleMapWrapper>
            {data.map((item, i) => (
              <Marker
                key={i}
                position={{ lat: +item.lat, lng: +item.lon }}
                title={item.name}
              />
            ))}
          </GoogleMapWrapper>
        </section>

        <section className="flex-[250]">
          <BaseButton
            type="primary"
            className="bg-blue-500"
            onClick={() => setIsVisibleNewLocationModal(true)}
          >
            {t("btnAddLocation")}
          </BaseButton>

          <BaseButton type="default" onClick={() => setData(mockData)}>
            {t("btnLoadMockData")}
          </BaseButton>

          <BaseButton type="default" danger ghost onClick={() => setData([])}>
            {t("btnRemoveAll")}
          </BaseButton>

          <NewLocationModal
            visible={isVisibleNewLocationModal}
            onCancel={() => setIsVisibleNewLocationModal(false)}
            onCreate={saveNewLocation}
          />

          <div className="flex flex-row flex-wrap">
            {data.map((item) => (
              <MapLocationCard
                key={item.id}
                name={item.name}
                lon={item.lon}
                lat={item.lat}
                onDelete={() => removeLocation(item.id)}
                isEdit={item.isEdit}
                onEdit={() => editLocation(item.id)}
                onSave={(values: IMockData) => saveLocation(item.id, values)}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default App;
