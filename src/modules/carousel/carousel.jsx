import React from "react";
import { Carousel as CarouselAntd } from "antd";
const contentStyle = {
  width: "100vw",
  objectFit: 'cover',
  textAlign: "center",
};

export default function Carousel() {
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  return (
    <CarouselAntd afterChange={onChange}>
      <div>
        <img
          style={contentStyle}
          src="https://fandom.vn/wp-content/uploads/2019/06/got-tro-choi-vuong-quyen-6-1.jpg"
          alt=""
        />
      </div>
      <div>
        <img
          style={contentStyle}
          src="https://static2.vieon.vn/vieplay-image/carousel_web_v4_ntc/2021/03/29/2xkgnj4i_1920x1080-gameofthrones8-carousel_1920_1080.webp"
          alt=""
        />
      </div>
      <div>
        <img
          style={contentStyle}
          src="https://fandom.vn/wp-content/uploads/2019/06/got-tro-choi-vuong-quyen-6-1.jpg"
          alt=""
        />
      </div>
      <div>
        <img
          style={contentStyle}
          src="https://static2.vieon.vn/vieplay-image/carousel_web_v4_ntc/2021/03/29/2xkgnj4i_1920x1080-gameofthrones8-carousel_1920_1080.webp"
          alt=""
        />
      </div>
    </CarouselAntd>
  );
}
