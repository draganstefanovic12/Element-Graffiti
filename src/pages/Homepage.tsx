import axios from "../api/backendApi";
import { Graffitis } from "../components/Graffitis/Graffitis";
import { PlaceGraffiti } from "../components/PlaceGraffiti/PlaceGraffiti";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

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
      const data = await axios.get("/graffiti/get");
      setData(data.data[0]);
    };

    gsap.to(divRef.current, {
      duration: 2,
      x: 30,
      delay: 0.5,
      ease: "bounce",
    });

    gsap.to(pRef.current, {
      duration: 1,
      rotate: 0,
      delay: 3,
      ease: "bounce",
    });

    handleGraffiti();
  }, []);

  const handleNewGraffiti = (newCont: Content) => {
    setData({ ...data, content: [...data!.content, newCont] });
  };

  const divRef = useRef<HTMLDivElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);

  return (
    <div className="main__wrapper">
      <div ref={divRef} className="header__wrapper">
        <h1>Welcome to Element Graffiti</h1>
        <p ref={pRef}>click anywhere to create an element</p>
      </div>
      <PlaceGraffiti handleNewGraffiti={handleNewGraffiti} />
      <Graffitis data={data} />
    </div>
  );
};
