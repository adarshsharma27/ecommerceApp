import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
const BannerSlider = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <div className="dark:bg-slate-700">
        <section className="container px-5 pt-6 mx-auto md:mt-0 mt-8 ">
          <Slider {...settings}>
            <div className="">
              <img
                alt=""
                src="https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                className="w-full h-[200px] md:h-[400px]  object-cover rounded-2xl"
                loading="lazy"
              />
            </div>
            <div className="">
              <img
                alt=""
                src="https://images.unsplash.com/photo-1479219136056-56bb6495a005?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="w-full h-[200px] md:h-[400px]  object-cover rounded-2xl"
                loading="lazy"
              />
            </div>
            <div className="">
              <img
                alt=""
                src="https://images.unsplash.com/photo-1554967665-10343ae87a13?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="w-full h-[200px] md:h-[400px]  object-cover rounded-2xl"
                loading="lazy"
              />
            </div>
          </Slider>
        </section>
      </div>
    </>
  );
};

export default BannerSlider;
