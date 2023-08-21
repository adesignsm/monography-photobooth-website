import React, {useState, useEffect} from "react";
import $ from "jquery";
import "./index.css";

const Loading = () => {
    const [timer, setTimer] = useState(3);

    useEffect(() => {
        let loadingInterval = setInterval(() => {
            setTimer((prevCounter) => prevCounter - 1);
        }, 1000);

        return () => {
            clearInterval(loadingInterval);
        }
    }, [])

    if (timer <= 0) {
        $("#loading-screen").fadeOut(1000);
        $("#featured-strips-container").delay(1000).fadeIn(1000);
        $("#tracker-line").delay(1000).fadeIn(1000);

        document.title = "Featured Strips";
    }

    return (
        <>
            <section id="loading-screen">
                <div className="snippet" data-title="dot-spin">
                    <div className="stage">
                        <div className="dot-spin"></div>
                        <h5>{timer}</h5>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Loading;