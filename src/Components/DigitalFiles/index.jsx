import React, { useEffect, useState } from "react";
import axios from "axios";
import $ from "jquery";
import "./index.css";

const DigitalFiles = () => {
    const [digitalCode, setDigitalCode] = useState("");
    const [error, setError] = useState(false);

    const handleOpenInfo = () => {
        $("#info-container").animate({
            right: "20px"
        }, 700);
    }

    const handleCloseInfo = () => {
        $("#info-container").animate({
            right: "-550px"
        }, 700);
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
            <section id="digital-files-container" className="section">
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
                    <div id="digital-files-button-container">
                        <h3 onClick={handleOpenInfo}> Need help? </h3>
                    </div>
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
            </section>

        </>
    )
}

export default DigitalFiles;