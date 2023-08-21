import React, { useState, useEffect } from "react";

import "./index.css";

const Location = () => {
    const [switchMap, setSwitchMap] = useState("BLOOR");

    const handleMapToggle = (e) => {
        if (e.target.id === "mono-bloor-trigger") {
            setSwitchMap("BLOOR");
            document.getElementById("mono-bloor-trigger").style.backgroundColor = "#000"
            document.getElementById("mono-bloor-trigger").style.color = "#fff";

            document.getElementById("mono-north-trigger").style.backgroundColor = "#fff"
            document.getElementById("mono-north-trigger").style.color = "#000";
        } else if (e.target.id === "mono-north-trigger") {
            setSwitchMap("NORTHYORK");

            document.getElementById("mono-bloor-trigger").style.backgroundColor = "#fff"
            document.getElementById("mono-bloor-trigger").style.color = "#000";

            document.getElementById("mono-north-trigger").style.backgroundColor = "#000"
            document.getElementById("mono-north-trigger").style.color = "#fff";
        }
    }

    return (
        <>
            <section id="location-container" className="section">
                <div className="column-1">
                    <div className="description">
                        <h1> Find one of our photobooths near you</h1>
                        <h3> Lorem Ipsum is simply dummy text of the printing and typesetting industry. </h3>
                    </div>
                </div>
                <div className="column-2">
                    <ul>
                        <li id="mono-bloor-trigger" className="selected-map" onClick={handleMapToggle}> Monography Bloor </li>
                        <li id="mono-north-trigger" onClick={handleMapToggle}> Monography North York </li>
                    </ul>
                    <div className="map">
                        {switchMap === "NORTHYORK" ? 
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2881.4440098414293!2d-79.41383212335981!3d43.763641245280084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b2dc2ca1d4cf9%3A0xac38d5acd0cf8c32!2sMONOGRAPHY%20(NORTH%20YORK)!5e0!3m2!1sen!2sca!4v1689116931334!5m2!1sen!2sca" 
                                width="450" 
                                height="550" 
                                allowfullscreen="" 
                                loading="lazy" 
                                referrerpolicy="no-referrer-when-downgrade">
                            </iframe>

                            :

                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.222304102346!2d-79.41665322336375!3d43.66434625170913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b35fbed0439bf%3A0x24a5f8d25154cd5e!2sMONOGRAPHY!5e0!3m2!1sen!2sca!4v1689117972062!5m2!1sen!2sca" 
                                width="450" 
                                height="550" 
                                allowfullscreen="" 
                                loading="lazy" 
                                referrerpolicy="no-referrer-when-downgrade">
                            </iframe>
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default Location;