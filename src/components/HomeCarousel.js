import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import picOne from '../assets/Inventory.jpg';
import picTwo from '../assets/Inventory-sec.jpeg';
import picThree from '../assets/Inventory-thi.jpg';

const HomeCarousel = () => {
    return (
        <Carousel fade>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src={picOne}
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src={picTwo}
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src={picThree}
                />
            </Carousel.Item>
        </Carousel>
    )
}

export default HomeCarousel;
