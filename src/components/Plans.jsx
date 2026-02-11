import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const plans = [
    {
        id: 1,
        title: "The Local Vibe",
        price: "$1,000",
        days: "1 Day",
        desc: "A sun-drenched pilgrimage along the Pacific shore — from the storied timbers of Santa Monica Pier to the bohemian canals of Venice",
        image: "/assets/plan1.png",
        color: "var(--color-sunset-orange)",
        location: "Santa Monica Pier",
        time: "6:30 PM",
        itinerary: [
            {
                time: "09:00 AM",
                title: "Morning at Santa Monica Pier",
                details: "Your journey begins where America's most legendary highway draws its final breath. The Santa Monica Pier, constructed in 1909, stands as the western terminus of Route 66 — that storied ribbon of asphalt that once carried the hopes of Dust Bowl migrants and the wanderlust of an entire nation from Chicago to the Pacific. Walk beneath the Looff Hippodrome, a 1922 carousel pavilion designated as a National Historic Landmark, its hand-carved horses still turning to the sound of a Wurlitzer organ. The pier has served as a backdrop to countless films — from The Sting to Forrest Gump — and its Pacific Park amusement rides glow against the ocean like a fever dream of the American boardwalk tradition."
            },
            {
                time: "12:00 PM",
                title: "Lunch at The Lobster",
                details: "Perched at the entrance to the pier with floor-to-ceiling windows framing the vast Pacific, The Lobster has been a culinary institution since 1923 — a year that also saw the erection of the original Hollywoodland sign in the hills above. Here, the ocean-to-table tradition of the California coast reaches its finest expression. Savor wild-caught Maine lobster, Santa Barbara uni, and sustainably sourced Pacific halibut as you gaze out at the same horizon that drew the Tongva people to these shores thousands of years ago, and later beckoned Spanish missionaries, Gold Rush prospectors, and dreamers of every description."
            },
            {
                time: "02:00 PM",
                title: "Venice Canals Walk",
                details: "In 1905, tobacco magnate Abbot Kinney stood on a stretch of marshland south of Santa Monica and envisioned something extraordinary: a cultural resort modeled after Venice, Italy, complete with gondola-navigated waterways, colonnaded arcades, and a grand amusement pier. He called it 'Venice of America,' and for a brief, luminous period, gondoliers imported from Italy poled visitors along the canals while orchestras played beneath Venetian arches. Though most of the original canals were paved over in 1929 to make way for automobiles, six waterways survived — and today they form one of the most enchanting neighborhoods in all of Los Angeles. Ducks glide beneath footbridges, bougainvillea cascades over garden walls, and the gentle silence feels almost impossible this close to the boardwalk's carnival energy."
            },
            {
                time: "05:00 PM",
                title: "Sunset at Venice Beach",
                details: "As the afternoon light turns golden, make your way to the Venice Beach Boardwalk — the famed Ocean Front Walk that has been the spiritual home of Southern California's counterculture since the Beat poets gathered here in the 1950s. The original Muscle Beach, established in the 1930s, launched the physical fitness movement in America; legends like Jack LaLanne and later Arnold Schwarzenegger sculpted not just their bodies but an entire cultural phenomenon on these sands. Today, the boardwalk thrums with street performers, muralists, and skateboarders carving the legendary Venice Skatepark. Find a place on the sand and watch the sun descend into the Pacific — that same eternal spectacle that the Tongva called home, that Kinney tried to bottle, and that still, after all these years, stops every passerby in their tracks."
            }
        ]
    },
    {
        id: 2,
        title: "Hollywood Glamour",
        price: "$3,000",
        days: "2 Days",
        desc: "An intimate passage through the mythology of Hollywood — from the gilded stages where Oscar legends are crowned to the sun-kissed heights of the Getty",
        image: "/assets/plan2.png",
        color: "var(--color-ocean-blue)",
        location: "Hollywood Boulevard",
        time: "1:00 PM",
        itinerary: [
            {
                day: "Day 1 — The Boulevard of Stars", events: [
                    {
                        time: "10:00 AM",
                        title: "Private Tour of Dolby Theatre & the Walk of Fame",
                        details: "Step inside the Dolby Theatre, the permanent home of the Academy Awards since 2001, and walk the same stage where Halle Berry, Sidney Poitier, and Meryl Streep made history. Originally named the Kodak Theatre, this 3,400-seat marvel was purpose-built for Hollywood's grandest night. Outside, the Hollywood Walk of Fame stretches along 1.3 miles of Hollywood Boulevard — over 2,700 terrazzo-and-brass stars honoring legends of film, television, music, radio, and theater. The tradition began in 1960, with the first star laid for director Stanley Kramer. As you walk these storied blocks, your guide will share the tales behind the names — from the silent film pioneers who built this neighborhood into the entertainment capital of the world to the contemporary icons who continue its legacy."
                    },
                    {
                        time: "01:00 PM",
                        title: "Lunch at The Ivy",
                        details: "Nestled on Robertson Boulevard behind a white picket fence draped in climbing roses, The Ivy has been the intersection of cuisine and celebrity since 1983. Its flower-laden patio is among the most photographed dining spots in America — a place where power lunches, deal-making, and star sightings are as much a part of the menu as the famed grilled vegetable salad and Cajun prime rib. The restaurant's New American cuisine, rooted in Southern comfort and California freshness, mirrors the city itself: a place where tradition and reinvention sit comfortably at the same table."
                    },
                    {
                        time: "03:00 PM",
                        title: "Beverly Hills & Rodeo Drive",
                        details: "The city of Beverly Hills was incorporated in 1914 on what was once the Rancho Rodeo de las Aguas — 'the ranch of the gathering of waters' — a Mexican land grant dating to 1838. By the 1920s, the arrival of Douglas Fairbanks and Mary Pickford, who built their legendary estate 'Pickfair,' transformed these rolling hills into the most coveted address in the world. Rodeo Drive, the three-block stretch synonymous with luxury, evolved from a modest bridle path into a global symbol of elegance. Your personal shopper will guide you through the flagship boutiques — Gucci, Chanel, Harry Winston — housed in architecture ranging from Mediterranean Revival to striking modernism. The Beverly Wilshire hotel, where Pretty Woman was filmed, anchors one end; the other opens onto the residential streets where the golden age of Hollywood still lingers in every manicured garden."
                    }
                ]
            },
            {
                day: "Day 2 — Art, Architecture & the Legendary Strip", events: [
                    {
                        time: "10:00 AM",
                        title: "The Getty Center",
                        details: "Perched atop the Santa Monica Mountains like a modernist acropolis, the Getty Center is one of the great cultural achievements of the twentieth century. Designed by Pritzker Prize-winning architect Richard Meier and opened in 1997 after fourteen years of construction, the campus consists of gleaming white travertine pavilions set among Robert Irwin's 134,000-square-foot Central Garden — a living work of art that changes with the seasons. The collection spans eight centuries of Western art, from medieval illuminated manuscripts to Impressionist masterpieces by Monet, Renoir, and Van Gogh. Your private docent will lead you through galleries housing Rembrandt's haunting self-portraits, the delicate furniture of the French ancien régime, and one of the finest photograph collections in the world. From the terraces, the panoramic vista stretches from the Pacific Ocean to the San Gabriel Mountains — a reminder that Los Angeles is a city cradled between the wilderness and the sea."
                    },
                    {
                        time: "05:00 PM",
                        title: "Sunset Boulevard Convertible Drive",
                        details: "As the late afternoon light paints the city in amber and rose, settle into a classic convertible for a drive down Sunset Boulevard — the twenty-two-mile artery that has given its name to an entire mythology of Los Angeles. Your route traces the legendary Sunset Strip, the 1.6-mile stretch between Crescent Heights and Doheny Drive that gave birth to rock and roll as we know it. Pass the Whisky a Go Go, where The Doors were the house band in 1966 and where go-go dancing was born. Glide past the Chateau Marmont, the 1929 Gothic Revival hotel where Greta Garbo hid from the press and where Hollywood's most intimate secrets still reside behind its fortress-like walls. Pass the Rainbow Bar & Grill, the Comedy Store, and the Viper Room — each venue a chapter in the story of American popular culture."
                    }
                ]
            }
        ]
    },
    {
        id: 3,
        title: "Urban Sophistication",
        price: "$5,000",
        days: "3 Days",
        desc: "A three-day immersion in the cultural renaissance of Downtown LA — where century-old landmarks meet the cutting edge of contemporary art, architecture, and cuisine",
        image: "/assets/plan3.png",
        color: "#9C27B0",
        location: "DTLA Skyline",
        time: "8:00 PM",
        itinerary: [
            {
                day: "Day 1 — The Cultural Corridor", events: [
                    {
                        time: "09:00 AM",
                        title: "The Broad Museum — VIP Early Access",
                        details: "Before the doors open to the public, you will enter The Broad — the crown jewel of Downtown LA's cultural renaissance. Built by philanthropists Eli and Edythe Broad and designed by Diller Scofidio + Renfro, the museum is an architectural marvel: a porous, honeycomb-like exterior they call 'the veil' wraps around a concrete inner structure known as 'the vault,' creating an interplay of light and mystery that mirrors the art within. The collection is staggering — over two thousand works spanning five decades of postwar and contemporary art. Stand before Jeff Koons' towering Balloon Dog, lose yourself in the infinite reflections of Yayoi Kusama's Infinity Mirrored Room, and contemplate the monumental canvases of Jean-Michel Basquiat, whose raw, urgent brushstrokes channeled the energy of the streets into the permanent lexicon of fine art."
                    },
                    {
                        time: "12:00 PM",
                        title: "Lunch at Grand Central Market",
                        details: "Step through the arched entrance of Grand Central Market and enter a living monument to the culinary soul of Los Angeles. Opened in 1917 on the ground floor of the Homer Laughlin Building — one of Downtown's first steel-reinforced concrete structures — the market was originally a European-style provisions hall serving the city's early twentieth-century elite. Over the decades, as successive waves of immigration reshaped the neighborhood, the market evolved into a kaleidoscope of flavors: handmade pupusas from El Salvador, steaming bowls of Thai boat noodles, artisanal egg sandwiches, and tacos al pastor carved from a rotating trompo. The market's revival became a symbol of Downtown LA's own rebirth — a place where the city's past and future share a communal table."
                    },
                    {
                        time: "03:00 PM",
                        title: "Walt Disney Concert Hall",
                        details: "Rising from Grand Avenue like a ship of brushed stainless steel frozen mid-sail, the Walt Disney Concert Hall is the magnum opus of Frank Gehry — the Toronto-born, Los Angeles-raised architect who redefined the possibilities of form. Completed in 2003 after sixteen years of development, the hall was funded by a $50 million gift from Lillian Disney, widow of Walt, who wished to create something 'that my husband would have been proud of.' The exterior's swooping, organic curves were modeled on the petals of a rose and engineered using aerospace software. Inside, the 2,265-seat auditorium is lined in Douglas fir and designed by acoustician Yasuhisa Toyota to produce what critics have called 'the finest concert sound in the world.' Your tour will reveal the hidden gardens, the rooftop amphitheater, and the story of how this building became the defining landmark of the new Downtown."
                    }
                ]
            },
            {
                day: "Day 2 — The Creative Underground", events: [
                    {
                        time: "10:00 AM",
                        title: "Arts District Mural & Street Art Tour",
                        details: "East of the Los Angeles River, in a neighborhood of repurposed warehouses and former industrial buildings, lies the Arts District — a quarter-square-mile testament to the transformative power of creative communities. In the 1970s and 1980s, artists priced out of Venice and Silver Lake began converting abandoned cold-storage facilities into live-work studios, drawn by vast, light-filled spaces. Today, the district's walls serve as an open-air gallery of staggering scale: encounter the works of Shepard Fairey, creator of the iconic Obama 'Hope' poster; the photorealistic murals of Robert Vargas, whose 'Angelus' — a 150-foot portrait — is the tallest mural in Downtown LA; and the kaleidoscopic geometries of RETNA, whose private alphabet of symbols has been exhibited worldwide. A local artist-guide will reveal how street art in LA carries on the tradition of the great Chicano muralists — including David Alfaro Siqueiros, who painted 'América Tropical' on Olvera Street in 1932, only to have it whitewashed by authorities who deemed its political message too dangerous."
                    },
                    {
                        time: "07:00 PM",
                        title: "Dinner at Bestia",
                        details: "As evening settles over the Arts District, you will be welcomed into Bestia — the restaurant that, more than any other, signaled the arrival of Downtown Los Angeles as a culinary destination of world-class caliber. Opened in 2012 by chef Ori Menashe and pastry chef Genevieve Gergis inside a converted turn-of-the-century warehouse, Bestia is a study in rustic Italian cooking elevated by California's extraordinary produce. Every pasta is made by hand — the saffron chitarra, the orecchiette with pork sausage, the uni-topped cacio e pepe that has become one of the most celebrated dishes in the city. The wood-fired pizzas emerge blistered and fragrant. The charcuterie is cured in-house. And the legendary butterscotch budino alone is worth the reservation — which remains among the most coveted in all of Los Angeles."
                    }
                ]
            },
            {
                day: "Day 3 — The Observatory & the Skyline", events: [
                    {
                        time: "04:00 PM",
                        title: "Griffith Observatory — Private Astronomical Tour",
                        details: "High on the southern slope of Mount Hollywood, overlooking the vast basin of Los Angeles from the Hollywood Sign to the Pacific, stands the Griffith Observatory — a temple of science built by a man seeking redemption. Colonel Griffith J. Griffith, a Welsh-born mining tycoon who donated the parkland in 1896, channeled his fortune into a public observatory and a Greek Theatre, hoping that the wonder of the cosmos might restore his legacy. The observatory opened on May 14, 1935, and on its very first night, so many Angelenos lined up to peer through its Zeiss refracting telescope that police were called to manage the crowds. Since then, it has appeared in more films than perhaps any other building in Los Angeles — most iconically in Rebel Without a Cause (1955), where James Dean stood beneath the planetarium dome in a scene that would define teenage alienation for a generation. Your private astronomer will guide you through the Samuel Oschin Planetarium, the Tesla coil demonstrations, and the Foucault pendulum."
                    },
                    {
                        time: "08:00 PM",
                        title: "Helicopter Night Tour of Los Angeles",
                        details: "Your three-day journey culminates in the air — a private helicopter lifting off as the city transforms beneath you into a glittering constellation of light. From above, Los Angeles reveals its true nature: not the sprawling, centerless expanse of popular imagination, but a breathtaking tapestry of communities, each illuminated and alive. Trace the Pacific coastline from Malibu to Long Beach, the surf breaking silver in the moonlight. Soar over the Hollywood Sign, lit from below like a beacon on its hillside. Downtown's glass towers will rise toward you — the US Bank Tower and Wilshire Grand Center piercing the night sky. The grid of the city, those endless luminous boulevards laid out by the dreamers and schemers of a century ago, will stretch to every horizon, and for a moment you will understand why they called this the City of Angels."
                    }
                ]
            }
        ]
    }
];

const TimelineItem = ({ item, index }) => (
    <motion.div
        className="timeline-item"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
        <div className="timeline-time">{item.time}</div>
        <div className="timeline-content">
            <h4>{item.title}</h4>
            <p>{item.details}</p>
        </div>
    </motion.div>
);

const Plans = () => {
    const [selectedPlan, setSelectedPlan] = useState(null);

    return (
        <div className="plans-section" id="plans">
            <div className="bg-loc-tag">Beverly Hills &#x2022; 4:20 PM</div>
            <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                Curated Experiences
            </motion.h2>
            <motion.p
                className="section-subtitle"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
            >
                Each journey is a carefully composed narrative — tracing the arc from LA&#39;s Spanish colonial origins
                through its golden age of cinema, its culinary revolution, and its thriving contemporary arts scene.
            </motion.p>
            <div className="plans-grid">
                {plans.map((plan, index) => (
                    <motion.div
                        key={plan.id}
                        className="plan-card"
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="plan-image">
                            <div className="plan-image-inner" style={{ backgroundImage: `url(${plan.image})` }} />
                            <div className="plan-overlay" />
                            <div className="card-location-tag">
                                {plan.location} &#x2022; {plan.time}
                            </div>
                        </div>
                        <div className="plan-content">
                            <h3>{plan.title}</h3>
                            <p className="plan-days">{plan.days}</p>
                            <p className="plan-desc">{plan.desc}</p>
                            <div className="plan-price" style={{ color: plan.color }}>{plan.price}</div>
                            <button className="plan-btn" onClick={() => setSelectedPlan(plan)}>View Itinerary</button>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedPlan && (
                    <motion.div
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setSelectedPlan(null)}
                    >
                        <motion.div
                            className="modal-content"
                            initial={{ y: 80, opacity: 0, scale: 0.95 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 40, opacity: 0, scale: 0.98 }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="close-btn" onClick={() => setSelectedPlan(null)}>&#x2715;</button>
                            <div className="modal-header" style={{ backgroundImage: `url(${selectedPlan.image})` }}>
                                <div className="modal-title-container">
                                    <motion.h2
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2, duration: 0.6 }}
                                    >
                                        {selectedPlan.title}
                                    </motion.h2>
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.35, duration: 0.5 }}
                                    >
                                        {selectedPlan.days} &#x2014; {selectedPlan.price}
                                    </motion.p>
                                </div>
                            </div>
                            <div className="modal-body">
                                <h3>Detailed Itinerary</h3>
                                <div className="timeline">
                                    {selectedPlan.id === 1 ? (
                                        selectedPlan.itinerary.map((item, i) => (
                                            <TimelineItem key={i} item={item} index={i} />
                                        ))
                                    ) : (
                                        selectedPlan.itinerary.map((day, d) => (
                                            <div key={d} className="timeline-day">
                                                <motion.h4
                                                    className="day-header"
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.2 + d * 0.15 }}
                                                >
                                                    {day.day}
                                                </motion.h4>
                                                {day.events.map((item, i) => (
                                                    <TimelineItem key={i} item={item} index={d * 3 + i} />
                                                ))}
                                            </div>
                                        ))
                                    )}
                                </div>
                                <motion.button
                                    className="book-btn"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                >
                                    Book This Experience
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Plans;
