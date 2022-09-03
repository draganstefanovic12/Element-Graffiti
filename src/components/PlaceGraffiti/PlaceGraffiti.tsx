import axios from "axios";
import { Button } from "../Button/Button";
import { Content } from "../../pages/Homepage";
import { useEffect, useRef, useState } from "react";

type GraffitiProps = {
  handleNewGraffiti: (graffiti: Content) => void;
};

export const PlaceGraffiti = ({ handleNewGraffiti }: GraffitiProps) => {
  const [value, setValue] = useState("");
  const [top, setTop] = useState<number>(0);
  const [left, setLeft] = useState<number>(0);
  const [wheel, setWheel] = useState<number>(0);
  const [clicked, setClicked] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    //Rotating element on scroll
    window.addEventListener("wheel", (e: WheelEvent) => {
      e.deltaY < 0 ? setWheel(wheel - 5) : setWheel(wheel + 5);
    });

    document.addEventListener("keydown", (e) => {
      e.key === "Escape" && setClicked(false);
    });

    document.querySelector(".div__wrapper")!.innerHTML = value;

    document.addEventListener("click", (e) => {
      //Preventing element to recreate if textarea is clicked
      if (textRef.current && !textRef.current!.contains(e.target as Node)) {
        setClicked(true);

        //Calculating percentage to scale with resolutions
        setLeft((e.offsetX * 100) / window.innerWidth);
        setTop((e.offsetY * 100) / window.innerHeight);
      }
    });
  });

  const handleSubmit = async () => {
    setValue("");
    setClicked(false);
    handleNewGraffiti(content);
    await axios.post(`/api/graffiti/new`, {
      data: content,
    });
  };

  const content = { text: value, left: left, top: top, rotate: wheel };
  //Styles for the element that's being made
  const divStyles = {
    left: `${left}%`,
    top: `${top}%`,
    transform: `rotate(${wheel}deg)`,
  };

  //Making the textarea invisible until clicked
  const textAreaStyles = { opacity: clicked ? "1" : "0" };

  const guideText =
    "Start typing! You can write HTML elements to create them. If you want to style them with CSS, you have to use inline styling. Use scrollwheel to rotate the element.";

  return (
    <div>
      <div style={divStyles} className="div__wrapper"></div>
      <div ref={textRef} className="textarea__wrapper" style={textAreaStyles}>
        <textarea
          value={value}
          placeholder={guideText}
          onChange={handleChange}
        />
        <Button onClick={handleSubmit}>Save</Button>
      </div>
    </div>
  );
};
