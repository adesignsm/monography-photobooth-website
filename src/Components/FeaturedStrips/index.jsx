import React, { useEffect, useState, useRef } from "react";
import $ from "jquery";
import axios from "axios";
import "./index.css";

const FeaturedStrips = () => {
    const [month, setMonth] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [stripArray, setStripArray] = useState();

    useEffect(() => {
        const currentDate = new Date();
        const currentMonthIndex = currentDate.getMonth();
        const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        const currentMonth = monthNames[currentMonthIndex];
        setMonth(currentMonth);

        axios.get('https://monography.net/template-strips').then(response => {
            const slicedData = response.data.slice(-2);
            setStripArray([slicedData[1].path, slicedData[1].fullPath]);
        }).catch(error => {
            console.error(error);
        });
    }, []);

    useEffect(() => {
        let indexInterval = setInterval(() => {
            $("#featured-strip-image").animate({ opacity: "1" }, 1000);
            setCurrentIndex((prevIndex) => (prevIndex + 1) % stripArray.length);
            $("#featured-strip-image").delay(1000).animate({ opacity: "0" }, 1000);
        }, 4000);

        return () => clearInterval(indexInterval);
    }, [stripArray]);

    return (
        <>
            <section id="featured-strips-container" className="section">
                <div className="column-1">
                    <div className="description">
                        <h1> Featured Frame for the month of {month}</h1>
                        <h3> Lorem Ipsum is simply dummy text of the printing and typesetting industry. </h3>
                    </div>
                </div>
                <div className="column-2">
                    <div className="featured-strip">
                        {stripArray && stripArray.length > 0 && (
                            <img id="featured-strip-image" src={stripArray[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}

export default FeaturedStrips;
