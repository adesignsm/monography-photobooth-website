import React, {useEffect, useState} from "react";
import $ from "jquery";

import Tracker from "./Components/Tracker";
import FeaturedStrips from "./Components/FeaturedStrips";
import Location from "./Components/Location";
import DigitalFiles from "./Components/DigitalFiles";
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
        document.title = "Featured";

        document.getElementById("main-screens").addEventListener('scroll', handleScroll);

        return () => {
            document.getElementById("main-screens").removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <main id="mono-main">
                <div id="main-screens">
                    <Tracker currentSection={currentSection}/>
                    <FeaturedStrips />
                    <DigitalFiles />
                    <GiftCards />
                    <Location />
                </div>
                <Footer data={footer}/>
            </main>
        </>
    )
}

export default App;