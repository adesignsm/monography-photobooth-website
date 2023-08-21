import React, { useEffect, useState } from "react";
import axios from "axios";
import $ from "jquery";
import "./index.css";

import INSTAGRAM from "../../Assets/Media/instagram.svg";
import TIKTOK from "../../Assets/Media/tiktok.svg";
import EMAIL from "../../Assets/Media/email.svg";

const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
}

const handleOpenMenu = () => {
    $("#menu-container").animate({
        right: ["0", "swing"]
    }, 700);
}

const handleCloseMenu = () => {
    $("#menu-container").animate({
        right: ["-500px", "swing"]
    }, 700);
}

const handleOpenDigitalFiles = () => {
    $("#digital-files").fadeIn(700);
}

const MenuContainer = () => {
    return (
        <>
            <div id="menu-container">
                <h1> Monography </h1>
                <nav>
                    <ul>
                        <li onClick={() => {
                             handleCloseMenu();
                            scrollToSection("featured-strips-container");
                        }}> Featured Strip </li>
                        <li onClick={() => {
                            handleCloseMenu();
                            scrollToSection("location-container");
                        }}> Locations </li>
                        <li onClick={() => {
                            handleCloseMenu();
                            scrollToSection("gift-cards-container");
                        }}> Gift Cards </li>
                    </ul>
                </nav>
                <div className="menu-footer">
                    <div className="column-1">
                        <p> Pay our main website a visit for more services </p>
                        <ul>
                            <li>
                                <a href="https://www.instagram.com/monography">
                                    <img src={INSTAGRAM} />
                                </a>
                            </li>
                            <li>
                                <a href="https://www.tiktok.com/@monographyto?lang=en">
                                    <img src={TIKTOK} />
                                </a>
                            </li>
                            <li>
                                <a href="mailto:info@monography.ca">
                                    <img src={EMAIL} />
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="column-2">
                        <button id="close-menu" onClick={handleCloseMenu}> Close </button>
                    </div>
                </div>
            </div>
        </>
    )
}

const DigitalFilesContainer = () => {
    const [digitalCode, setDigitalCode] = useState("");
    const [error, setError] = useState(false);

    const handleOpenInfo = () => {
        $("#info-container").animate({
            right: "20px"
        }, 700);
    }

    const handleCloseInfo = () => {
        $("#info-container").animate({
            right: "-500px"
        }, 700);
    }

    const handleCloseDigtialFiles = () => {
        $("#digital-files").fadeOut(700);
    }
    
    const handleCodeChange = (event) => {
        setDigitalCode(event.target.value);
    }
    
    const handleOnFocus = () => {
        setError(false);
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Code:', digitalCode);

        if (digitalCode) {
            axios.get(`https://monography.net/api/get-strip/${digitalCode.toUpperCase()}`).then(response => {
                if (response.data) {
                    console.log(response.data.data.downloadUrl);
                    window.open(response.data.data.downloadUrl, "_blank")
                }
            }).catch(error => {
                console.error(error);
                setError(true);
            });

            setDigitalCode("");
        }
    };

    return (
        <>
            <div id="digital-files">
                <section id="digital-files-container">
                    <div className="column-1">
                        <div className="description">
                            <h1> Retrieve your digital photo strips</h1>
                            <h3> Along with your 6 digit code, please enter your email so that our system can send you your photo strips </h3>
                        </div>
                    </div>
                    <div className="column-2">
                        <div className="digital-file-form">
                            <form onSubmit={handleSubmit} onFocus={handleOnFocus}>
                                <div className="code-input">
                                    <label htmlFor="code">8-Digit Code</label>
                                    <input type="text" id="code" maxLength={8} value={digitalCode} onChange={handleCodeChange} required />
                                </div>
                                {error &&
                                    <div id="error-container">
                                        <h3> 
                                            Sorry but the code provided is invalid. 
                                            Please try another code.
                                        </h3>
                                    </div>
                                }
                                <button type="submit">Retrieve Digital Files</button>
                            </form>
                        </div>
                    </div>
                </section>
                <div id="digital-files-button-container">
                    <button id="close-digital-file" onClick={handleCloseDigtialFiles}> Close </button>
                    <button id="open-info" onClick={handleOpenInfo}> ? </button>
                </div>
                <div id="info-container">
                    <h3>
                        You should have recieved a 6 digit unique code when you completed your
                        photobooth session. You will need that code in order to retrieve your
                        digital files. Please talk to the front desk if you cannot find your 
                        code.
                    </h3>
                    <button id="close-info" onClick={handleCloseInfo}> close </button>
                </div>
            </div>
        </>
    )
}

const Footer = ({data}) => {

    useEffect(() => {
        if (data) $("#fixed-footer").delay(1000).fadeIn(500);
    }, [data]);

    return (
        <>
            <footer id="fixed-footer">
                <nav>
                    <div id="navigation-button-container">
                        <button onClick={handleOpenDigitalFiles}> Digital Files</button>
                        <button id="open-menu" onClick={handleOpenMenu}> Menu </button>
                    </div>
                </nav>
                <MenuContainer />
                <DigitalFilesContainer />
            </footer>
        </>
    )
}

export default Footer;