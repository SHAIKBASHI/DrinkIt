import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import "../styles/Splash.css";

function Splash() {

    const navigate = useNavigate();

    useEffect(() => {

        const timer = setTimeout(() => {
            navigate("/home", { replace: true });
        }, 2500);

        return () => clearTimeout(timer);

    }, [navigate]);


    return (

        <motion.div
            className="splash"

            initial={{ opacity: 0 }}

            animate={{ opacity: 1 }}

            transition={{ duration: 0.8 }}
        >

            {/* =====================================
                BACKGROUND DECORATIONS
            ====================================== */}

            <div className="splash-bottle splash-bottle-left">
                <div className="bottle-neck"></div>
                <div className="bottle-label">
                    DRINKIT
                </div>
            </div>


            <div className="splash-bottle splash-bottle-right">
                <div className="bottle-neck"></div>
            </div>


            <div className="splash-glass">
                <div className="glass-liquid"></div>
            </div>


            {/* =====================================
                MAIN LOGO
            ====================================== */}

            <div className="logoCircle">

                🍻

            </div>


            {/* =====================================
                BRAND
            ====================================== */}

            <h1>

                Drink<span>It</span>

            </h1>


            <p>

                Drink Smart. Recover Better.

            </p>


            <div className="splash-loading">

                <span></span>
                <span></span>
                <span></span>

            </div>

        </motion.div>

    );

}

export default Splash;