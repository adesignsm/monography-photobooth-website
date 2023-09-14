import React, {useState, useEffect} from "react";
import "./index.css";

const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
}

const Tracker = ({currentSection}) => {
    const [stepOn, setStepOn] = useState(-1);

    useEffect(() => {
        if (currentSection === "featured-strips-container") {
            setStepOn(2);
        } else if (currentSection === "digital-files-container") {
            setStepOn(3);
        } else if (currentSection === "gift-cards-container") {
            setStepOn(4);
        }
    }, [currentSection]);

    return (
        <>
            <header id="header">
                <div id="tracker-line">
                    <ul id="stepper">
                        <li className={stepOn > 1 ? 'completed-step' : "active-step"} onClick={() => scrollToSection("featured-strips-container")}>
                            <span> Featured </span>
                        </li>
                        <li className={"line " + (stepOn > 1 ? 'active-line' : "inactive-line")}></li>
                        <li className={stepOn > 2 ? 'completed-step' : stepOn === 2 ? "active-step" : "inactive-step"} onClick={() => scrollToSection("digital-files-container")}>
                            <span> Files </span>
                        </li>
                        
                        <li className={"line " + (stepOn > 2 ? 'active-line' : "inactive-line")}></li>
                        <li className={stepOn > 3 ? 'completed-step' : stepOn === 3 ? "active-step" : "inactive-step"} onClick={() => scrollToSection("gift-cards-container")}>
                            <span> Coupons </span>
                        </li>
                        
                        <li className={"line " + (stepOn > 3 ? 'active-line' : "inactive-line")}></li>
                        <li className={stepOn > 4 ? 'completed-step' : stepOn === 4 ? "active-step" : "inactive-step"} onClick={() => scrollToSection("location-container")}>
                            <span> Location </span>
                        </li>
                    </ul>
                </div>
            </header>
        </>
    )
}

export default Tracker;