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
                alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src={picTwo}
                alt="Second slide"
                />

                <Carousel.Caption>
                <h1>Easy</h1>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src={picThree}
                alt="Third slide"
                />

                <Carousel.Caption>
                <h1>Effective</h1>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}

export default HomeCarousel;
