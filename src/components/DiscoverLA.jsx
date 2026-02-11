import React from 'react';
import { motion } from 'framer-motion';

const rows = [
    {
        title: "From Spanish Pueblo to Global Metropolis",
        label: "Est. 1781",
        text: "On September 4, 1781, forty-four settlers — a diverse assembly of Indigenous, African, and Spanish descent — founded El Pueblo de Nuestra Señora la Reina de los Ángeles del Río Porciúncula. From that humble congregation on the banks of the Los Angeles River, a city emerged that would come to shape the imagination of the entire world.",
        image: "/assets/olvera.png",
        reverse: false,
    },
    {
        title: "The Capital of Dreams",
        label: "The Silver Screen",
        text: "When early filmmakers fled Edison's patent monopolies in the East and arrived in the sun-drenched foothills of Hollywood in the 1910s, they did not merely build an industry — they constructed a mythology. The Hollywood Sign, erected in 1923 as a real estate advertisement for \"Hollywoodland,\" became an accidental monument to aspiration itself.",
        image: "/assets/hero.png",
        reverse: true,
    },
    {
        title: "Where Art Meets the Horizon",
        label: "The Living Canvas",
        text: "The cultural landscape of Los Angeles stretches from the ancient to the avant-garde. Frank Gehry's Walt Disney Concert Hall catches the California sun in billowing steel, a cathedral of sound that redefined what architecture could be. The Broad museum houses masterworks of contemporary art behind a honeycomb facade they call \"the veil and the vault.\"",
        image: "/assets/disney_hall.png",
        reverse: false,
    },
];

const rowVariants = {
    hidden: (reverse) => ({
        opacity: 0,
        x: reverse ? 60 : -60,
    }),
    visible: {
        opacity: 1,
        x: 0,
    },
};

const DiscoverLA = () => {
    return (
        <div className="discover-section" id="discover">
            <motion.div
                className="discover-container"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
            >
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    The City of Angels
                </motion.h2>

                <motion.p
                    className="discover-subtitle"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    A Tapestry Woven Across Centuries
                </motion.p>

                <div className="discover-content">
                    {rows.map((row, i) => (
                        <motion.div
                            key={i}
                            className={`discover-row${row.reverse ? ' reverse' : ''}`}
                            custom={row.reverse}
                            variants={rowVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="discover-text">
                                <div className="discover-block-icon">{row.label}</div>
                                <h3>{row.title}</h3>
                                <p>{row.text}</p>
                            </div>
                            <div
                                className="discover-image"
                                style={{ backgroundImage: `url('${row.image}')` }}
                            />
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default DiscoverLA;
