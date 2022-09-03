import axios from "axios";
import { Graffitis } from "../components/Graffitis/Graffitis";
import { PlaceGraffiti } from "../components/PlaceGraffiti/PlaceGraffiti";
import { useEffect, useState } from "react";

export type Graffiti = {
  content: Content[];
};

export type Content = {
  left: number;
  top: number;
  rotate: number;
  text: string;
};

export const Homepage = () => {
  const [data, setData] = useState<Graffiti>();

  useEffect(() => {
    const handleGraffiti = async () => {
      const data = await axios.get("/api/graffiti/get");
      setData(data.data[0]);
    };

    handleGraffiti();
  }, []);

  const handleNewGraffiti = (newCont: Content) => {
    setData({ ...data, content: [...data!.content, newCont] });
  };

  return (
    <div className="main__wrapper">
      <h1>Welcome to Element Graffiti</h1>
      <p>click anywhere to create an element</p>
      <PlaceGraffiti handleNewGraffiti={handleNewGraffiti} />
      <Graffitis data={data} />
    </div>
  );
};
