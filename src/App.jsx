import React, {useEffect, useState} from "react";
import $ from "jquery";

import Tracker from "./Components/Tracker";
import Loading from "./Components/Loading";
import FeaturedStrips from "./Components/FeaturedStrips";
import Location from "./Components/Location";
import GiftCards from "./Components/Giftcards";
import Footer from "./Components/Footer";

const App = () => {
    const [loadingScreen, setLoadingScreen] = useState(false);
    const [currentSection, setCurrentSection] = useState(null);
    const [footer, setFooter] = useState(false);

    const handleScroll = (e) => {
        const sections = document.querySelectorAll('.section'); // Replace with your actual class name or element selector
        const scrollPosition = e.target.scrollTop;
    
        let newCurrentSection = null;
    
        sections.forEach((section) => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
    
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            newCurrentSection = section.getAttribute('id');
          }
        });
    
        setCurrentSection(newCurrentSection);
    };

    useEffect(() => {
        document.title = "Start";

        document.getElementById("main-screens").addEventListener('scroll', handleScroll);

        return () => {
            document.getElementById("main-screens").removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleEnterWebsite = () => {
        setLoadingScreen(true);
        setFooter(true);
    }

    const handlePhotoRetrieval = () => {
        $("#digital-files").fadeIn(700);
        setLoadingScreen(true);
        setFooter(true);
    }

    return (
        <>
            <main id="mono-main">
                <Tracker currentSection={currentSection}/>
                {loadingScreen === true ? <Loading /> : 
                    <section className="start-screen-container">
                        <div className="start-screen-content">
                            <h1> Monography Photobooth </h1>
                            <div className="button-container">
                                <button id="enter-website-button" onClick={handleEnterWebsite}> Enter Website </button>
                                <button id="photo-retreival-button" onClick={handlePhotoRetrieval}> Retrieve Digital <br/> Photos </button>
                            </div>
                        </div>
                    </section>
                }
                <div id="main-screens">
                    <FeaturedStrips />
                    <Location />
                    <GiftCards />
                </div>
                <Footer data={footer}/>
            </main>
        </>
    )
}

export default App;