import { useEffect } from "react";
import { Content, Graffiti } from "../../pages/Homepage";

type Data = {
  data: Graffiti | undefined;
};

export const Graffitis = ({ data }: Data) => {
  useEffect(() => {
    //Using data as a dependency here to get elements and add innerHTML to them
    //If i rendered them while mapping they'd be just normal strings
    const handleInnerHTML = () => {
      data?.content.map(
        (graffiti: Content) =>
          (document.getElementById(
            `${graffiti.rotate}${graffiti.left}${graffiti.top}`
          )!.innerHTML = graffiti.text)
      );
    };
    handleInnerHTML();
  }, [data]);

  return (
    <>
      {data?.content.map((graffiti: Content) => (
        <div
          id={`${graffiti.rotate}${graffiti.left}${graffiti.top}`}
          style={{
            position: "absolute",
            left: `${graffiti.left}%`,
            top: `${graffiti.top}%`,
            transform: `rotate(${graffiti.rotate}deg)`,
          }}
        ></div>
      ))}
    </>
  );
};
