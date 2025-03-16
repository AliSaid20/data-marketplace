import React from 'react'
import '../App/CardComponent.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/pagination";
// import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";


const CardComponent = ({ cardsData, onCardClick }) => {

  // const cardsData = [
  //   { title: 'AI', description: "Explore datasets designed for artificial intelligence, machine learning models, image recognition, NLP." },
  //   { title: 'Business', description: "Access business-related datasets for market analysis, customer insights, and financial performance tracking." },
  //   { title: 'Geographical', description: "Discover datasets covering maps, geospatial analytics and location-based insights for various regions."},
  //   { title: 'Healthcare', description: "Dive into datasets related to patient care, medical research, and healthcare system optimization." },
  //   { title: 'Scientific', description: "Browse datasets for academic research and scientific discoveries across multiple disciplines." },
  //   { title: 'Social & Cultural', description: "Gain insights into social trends, cultural behaviors, and demographic statistics." },
  //   { title: 'Educational', description: "Explore datasets for academic purposes, educational resources, and institutional performance." },
  //   { title: 'Industrial', description: "Analyze datasets for manufacturing, logistics, and industrial performance improvements." },
  //   { title: 'IoT', description: "Utilize datasets from IoT devices, including sensor data, smart home systems, and connected devices." },
  //   { title: 'Financial', description: "Access financial datasets for market trends, stock performance, and economic analysis." },
  // ];


  return (
    <div className="swiper-container">
       <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={20}
        slidesPerView={3}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {cardsData.map((card, index) => (
          <SwiperSlide key={index}>
            <div className="card">
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <button className="btn btn-primary" onClick={() => onCardClick(card.category)}>Explore</button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default CardComponent
