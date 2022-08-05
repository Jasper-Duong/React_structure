import React, { useState } from "react";
import "./index.scss";
export default function Seat(props) {
  const [isSelected, setIsSelected] = useState(false);
  const ghe = props.item;
  const populateClass = () => {
    let defaultClass = "ghe";
    if (ghe.loaiGhe === "Vip") {
      defaultClass += " gheVip";
    }
    if (isSelected) {
      defaultClass += " dangDat";
    }
    if (ghe.daDat) {
      defaultClass += " daDat";
    }
    return defaultClass;
  };

  return (
    <button
      disabled={ghe.daDat}
      className={`${populateClass()} `}
      onClick={() => {
        isSelected ? setIsSelected(false) : setIsSelected(true);
        props.handleSelect(ghe);
      }}
    >
      {ghe.tenGhe}
    </button>
  );
}
