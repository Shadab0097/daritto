import React, { useState, useEffect, useRef } from 'react';
import {
    Zap,
    Layers,
    Box,
    ArrowRight,
    Menu,
    X,
    Activity,
    Mail,
    Phone,
    Hexagon,
    Factory,
    CheckCircle2,
    Gauge,
    Globe,
    ChevronRight,
    Scan,
    MessageSquare,
    Send,
    Settings,
    ShieldCheck,
    Cpu,
    Target,
    Lightbulb,
    HelpCircle,
    ChevronDown,
    Play,
    Hammer,
    MapPin
} from 'lucide-react';

import carbon from "./assets/daritto_carbon.png"
import electrodes from "./assets/daritto_electrodes.png"
import graphite from "./assets/daritto_graphite.png"
import daritto from "./assets/daritto.png"
import industrialVideo from "./assets/DaRiiTO_INDIA.mp4"

/* DARITTO: Professional Light Edition 3.2
  Theme: "Corporate & Clean"
  Features: 
  - Optimized Image Heights
  - Enhanced Premium "About Us" Styling
  - Reordered Sections
  - Alternating Backgrounds
  - "Cloud Electric" Click Effects
  - 3D Interactive Product Grid
*/

// --- HOOKS ---

const useScrollReveal = () => {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('reveal-active');
                    }
                });
            },
            { threshold: 0.1 }
        );

        const elements = document.querySelectorAll('.reveal');
        elements.forEach((el) => observer.observe(el));

        return () => elements.forEach((el) => observer.unobserve(el));
    }, []);
};

// --- CLICK EFFECTS COMPONENT ---

const ClickEffects = () => {
    const canvasRef = useRef(null);
    const effects = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width = window.innerWidth;
        let height = window.innerHeight;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        window.addEventListener('resize', resize);
        resize();

        class PowderParticle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 3 + 1;
                this.vx = Math.cos(angle) * speed;
                this.vy = Math.sin(angle) * speed;
                this.life = 1.0;
                this.decay = Math.random() * 0.02 + 0.015;
                this.size = Math.random() * 2 + 1;
                this.colorVal = Math.floor(Math.random() * 50 + 50);
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.vx *= 0.94;
                this.vy *= 0.94;
                this.vy += 0.1;
                this.life -= this.decay;
            }
            draw(ctx) {
                ctx.fillStyle = `rgba(${this.colorVal}, ${this.colorVal}, ${this.colorVal}, ${this.life})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        class ElectricWave {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.life = 1.0;
                this.decay = 0.05;
                this.tendrils = [];
                const count = Math.floor(Math.random() * 4) + 5;
                for (let i = 0; i < count; i++) {
                    this.tendrils.push({
                        angle: (Math.PI * 2 / count) * i + (Math.random() * 0.5 - 0.25),
                        length: Math.random() * 80 + 40
                    });
                }
            }
            update() {
                this.life -= this.decay;
            }
            draw(ctx) {
                const opacity = this.life;
                const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, 100);
                grad.addColorStop(0, `rgba(186, 230, 253, ${opacity * 0.6})`);
                grad.addColorStop(1, `rgba(186, 230, 253, 0)`);
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(this.x, this.y, 100, 0, Math.PI * 2);
                ctx.fill();

                ctx.strokeStyle = `rgba(14, 165, 233, ${opacity})`;
                ctx.lineWidth = 1.5;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                ctx.shadowColor = 'rgba(56, 189, 248, 0.8)';
                ctx.shadowBlur = 10;

                this.tendrils.forEach(t => {
                    ctx.beginPath();
                    let cx = this.x;
                    let cy = this.y;
                    ctx.moveTo(cx, cy);
                    const segments = 8;
                    const segLen = t.length / segments;
                    for (let j = 0; j < segments; j++) {
                        const jitter = (Math.random() - 0.5) * 15 * opacity;
                        cx += Math.cos(t.angle) * segLen;
                        cy += Math.sin(t.angle) * segLen;
                        const px = cx + Math.cos(t.angle + Math.PI / 2) * jitter;
                        const py = cy + Math.sin(t.angle + Math.PI / 2) * jitter;
                        ctx.lineTo(px, py);
                    }
                    ctx.stroke();
                });
                ctx.shadowBlur = 0;
            }
        }

        const loop = () => {
            ctx.clearRect(0, 0, width, height);
            for (let i = effects.current.length - 1; i >= 0; i--) {
                const effect = effects.current[i];
                effect.update();
                effect.draw(ctx);
                if (effect.life <= 0) {
                    effects.current.splice(i, 1);
                }
            }
            requestAnimationFrame(loop);
        };
        loop();

        const onClick = (e) => {
            for (let i = 0; i < 15; i++) {
                effects.current.push(new PowderParticle(e.clientX, e.clientY));
            }
            effects.current.push(new ElectricWave(e.clientX, e.clientY));
        };

        window.addEventListener('mousedown', onClick);
        return () => {
            window.removeEventListener('mousedown', onClick);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 z-[9999] pointer-events-none" />;
};

// --- DATA ---

const PRODUCT_DATA = [
    {
        id: "01",
        name: "Carbon Powder",
        tagline: "Ultra-Fine Conductive",
        desc: "Premium industrial grade material known for exceptional adsorption, conductivity, and thermal stability.",
        icon: <Layers className="w-6 h-6" />,
        image: carbon,
        specs: ["99.9% Purity", "Micronized", "High Conductivity"],
        details: {
            intro: "Carbon powder is a fine black material composed primarily of elemental carbon (C), known for its exceptional adsorption capability, electrical conductivity, high temperature stability, and chemical inertness.",
            types: [
                { title: "Standard Carbon Powder", desc: "Used in general industrial applications such as metal casting and coatings. Offers good conductivity." },
                { title: "Activated Carbon Powder", desc: "Highly porous form optimized for adsorption. Ideal for filtration and purification." },
                { title: "Graphite Powder", desc: "Crystalline carbon with excellent lubricity and electrical performance. Used in batteries and electrodes." },
                { title: "Carbon Black", desc: "Fine particulate carbon used as a reinforcing agent and pigment in polymers and paints." }
            ],
            features: [
                "High Adsorption Capacity",
                "Excellent Electrical Conductivity",
                "Thermal Stability",
                "Chemical Inertness",
                "Versatile Particle Size Options"
            ],
            applications: [
                "Industrial & Manufacturing (Steel, Foundry)",
                "Filtration & Purification (Water, Air)",
                "Electronics & Energy (Batteries, Capacitors)",
                "Chemical Processing (Catalyst Support)"
            ],
            technicalSpecs: [
                { label: "Carbon Content", value: "High purity (90%+ depending on grade)" },
                { label: "Particle Size", value: "0.1–100+ microns (varies by application)" },
                { label: "Color", value: "Black" },
                { label: "Conductivity", value: "Varies by grade and type" }
            ]
        }
    },
    {
        id: "02",
        name: "EDM Electrodes",
        tagline: "Precision Spark Erosion",
        desc: "Bespoke EDM graphite and metal electrode design services for complex mold and die making.",
        icon: <Zap className="w-6 h-6" />,
        image: electrodes,
        specs: ["High Density", "Complex Geometry", "Wear Resistant"],
        details: {
            intro: "EDM (Electrical Discharge Machining) electrodes are crucial components in a non-traditional machining process that uses electrical sparks to erode complex shapes in hard, electrically conductive materials.",
            types: [
                { title: "Graphite", desc: "Provides cleaning action at low speeds. Amorphous structure, excellent for general EDM." },
                { title: "Copper", desc: "Better wear resistance than brass, ideal for fine finishes and tungsten carbide machining." },
                { title: "Copper Tungsten", desc: "Composite material useful for deep slots under poor flushing conditions." },
                { title: "Silver Tungsten", desc: "High electrical conductivity and excellent erosion resistance for high-power applications." },
                { title: "Molybdenum", desc: "High tensile strength, ideal for small diameter wire applications." }
            ],
            features: [
                "Custom CAD/CAM Design Services",
                "High Wear Resistance",
                "Intricate Shape Capabilities",
                "Wide Material Selection"
            ],
            applications: [
                "Mold and Die Making",
                "Aerospace Components",
                "Medical Device Manufacturing",
                "Automotive Parts"
            ],
            technicalSpecs: [
                { label: "Electrical Resistivity", value: "<13 μΩm (for good performance)" },
                { label: "Bulk Density", value: "~1.78 Mg/m³" },
                { label: "Hardness (Shore)", value: "76-90 Shore" },
                { label: "Particle Size", value: "Ultra-fine (<4 µm) to Coarse" }
            ]
        }
    },
    {
        id: "03",
        name: "Graphite Blocks",
        tagline: "Solid Carbon Engineering",
        desc: "Solid carbon-based components engineered to perform reliably in extreme industrial environments.",
        icon: <Box className="w-6 h-6" />,
        image: graphite,
        specs: ["High Density", "Thermal Shock", "Machinable"],
        details: {
            intro: "Graphite blocks are solid carbon-based components engineered to perform reliably in extreme industrial environments. Known for their ability to withstand high temperatures, resist chemical attack, and conduct heat and electricity efficiently, they are widely used in heavy industries. DaRiiTO INDIA supplies high-quality blocks manufactured using selected materials to ensure structural stability even under high thermal loads.",
            types: [
                { title: "Molded Graphite Blocks", desc: "Standard blocks suitable for general industrial applications." },
                { title: "Extruded Graphite Blocks", desc: "Cost-effective solutions often used for electrodes and furnace linings." },
                { title: "Isostatic Graphite Blocks", desc: "High-density blocks with uniform structure for precision applications." },
                { title: "Custom-Machined", desc: "Blocks shaped to specific drawings or specifications for unique needs." }
            ],
            features: [
                "Excellent resistance to high temperatures",
                "Strong thermal shock resistance",
                "High thermal and electrical conductivity",
                "Chemically stable in aggressive environments",
                "Easy to machine into precise shapes"
            ],
            applications: [
                "Metallurgical: Furnace components & Casting molds",
                "Electrical: EDM electrodes & Heating elements",
                "Chemical: Corrosion-resistant structural parts",
                "Manufacturing: Precision machined parts & Seals"
            ],
            technicalSpecs: [
                { label: "Density", value: "1.70 - 1.88 g/cm³" },
                { label: "Flexural Strength", value: "40 - 75 MPa" },
                { label: "Thermal Conductivity", value: "120 - 160 W/m·K" },
                { label: "Supply Form", value: "Standard/Custom Dimensions" }
            ]
        }
    },
    {
        id: "04",
        name: "Tungsten Copper Rods",
        tagline: "High-Performance Composite",
        desc: "A robust composite combining the high melting point of tungsten with the high conductivity of copper.",
        icon: <Hammer className="w-6 h-6" />,
        image: "https://media.istockphoto.com/id/598919998/photo/copper-pipes.webp?a=1&b=1&s=612x612&w=0&k=20&c=77SyyRNaMhEaycECIh5Z_HhVNBjYl0sr-zuRJ3-xB14=",
        specs: ["High Density", "Arc Resistant", "High Conductivity"],
        details: {
            intro: "Tungsten copper rods are composite materials made by combining tungsten (W) and copper (Cu)—typically through powder metallurgy (sintering and copper infiltration). They are not true alloys (the metals don’t fully dissolve into each other) but a two-phase composite, which gives them a unique balance of properties.",
            types: [
                { title: "W70–Cu30", desc: "Higher conductivity, easier machining." },
                { title: "W75–Cu25", desc: "Standard grade for general applications." },
                { title: "W80–Cu20", desc: "Balanced strength and conductivity." },
                { title: "W90–Cu10", desc: "Maximum heat and wear resistance." }
            ],
            features: [
                "High melting resistance (Tungsten core)",
                "High thermal & electrical conductivity (Copper matrix)",
                "Low thermal expansion",
                "Good arc erosion resistance",
                "High density & strength"
            ],
            applications: [
                "Electrical contacts & electrodes (circuit breakers)",
                "Heat sinks & thermal spreaders (electronics)",
                "EDM electrodes",
                "Aerospace & defense components",
                "High-voltage devices"
            ],
            technicalSpecs: [
                { label: "Density", value: "11.8 – 16.7 g/cm³" },
                { label: "Electrical Conductivity", value: "30–55% IACS" },
                { label: "Thermal Conductivity", value: "180–260 W/m·K" },
                { label: "Forms", value: "Round rods, square rods, custom profiles" }
            ]
        }
    }
];

const FAQS = [
    {
        question: "What industries does DaRiiTO INDIA serve?",
        answer: "We serve a wide range of industrial and commercial sectors, including metallurgy, engineering, manufacturing, chemical processing, and electrical applications. Our products are designed to meet the rigorous demands of these modern industries."
    },
    {
        question: "Do you offer customization for graphite blocks?",
        answer: "Yes, we understand that every application has unique needs. We offer flexible supply options, including customized sizes, shapes, and application-specific grades to support your specific production goals."
    },
    {
        question: "What ensures the quality of your products?",
        answer: "Our products are sourced and processed with a strong focus on quality consistency, reliability, and compliance with industry standards. We prioritize consistent performance and durability in all our carbon and graphite solutions."
    },
    {
        question: "Can you supply in bulk?",
        answer: "Absolutely. We are equipped for bulk and project-based supply options, ensuring timely delivery and dependable service to become a reliable link in your supply chain."
    },
    {
        question: "What are the key benefits of your Carbon Powder?",
        answer: "Our Carbon Powder is a premium industrial-grade material known for exceptional adsorption capability, high electrical conductivity, thermal stability, and versatile particle size options suitable for everything from filtration to electronics."
    }
];

// --- COMPONENTS ---

const ProductModal = ({ product, onClose }) => {
    if (!product) return null;

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}></div>

            <div className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl animate-in slide-in-from-bottom-10 duration-500">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-white/50 hover:bg-slate-100 rounded-full transition-colors z-20"
                >
                    <X className="w-6 h-6 text-slate-600" />
                </button>

                {/* Header Image */}
                <div className="relative h-48 sm:h-64 overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 sm:left-10 text-white">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="p-2 bg-blue-600 rounded-lg">{product.icon}</span>
                            <span className="text-sm font-mono text-blue-200 uppercase tracking-widest">{product.tagline}</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold">{product.name}</h2>
                    </div>
                </div>

                <div className="p-6 sm:p-10 space-y-10">

                    {/* Introduction */}
                    <div className="prose prose-slate max-w-none">
                        <p className="text-lg text-slate-600 leading-relaxed border-l-4 border-blue-500 pl-4 bg-slate-50 p-4 rounded-r-lg">
                            {product.details.intro}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                        {/* Types / Materials */}
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
                                <Box className="w-5 h-5 text-blue-600" />
                                {product.name.includes("EDM") ? "Material Types" : "Grades & Variants"}
                            </h3>
                            <div className="space-y-4">
                                {product.details.types.map((type, idx) => (
                                    <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-blue-200 transition-colors">
                                        <h4 className="font-bold text-slate-800 text-sm mb-1">{type.title}</h4>
                                        <p className="text-xs text-slate-500 leading-relaxed">{type.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Features & Applications */}
                        <div className="space-y-8">

                            {/* Features */}
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
                                    <ShieldCheck className="w-5 h-5 text-blue-600" /> Key Features
                                </h3>
                                <ul className="space-y-2">
                                    {product.details.features.map((feat, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-sm text-slate-600">
                                            <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                                            {feat}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Applications */}
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
                                    <Factory className="w-5 h-5 text-blue-600" /> Applications
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {product.details.applications.map((app, idx) => (
                                        <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100">
                                            {app}
                                        </span>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Technical Specs Table */}
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
                            <Activity className="w-5 h-5 text-blue-600" /> Technical Specifications
                        </h3>
                        <div className="overflow-hidden border border-slate-200 rounded-lg">
                            <table className="min-w-full divide-y divide-slate-200">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Property</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Typical Value</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-slate-200">
                                    {product.details.technicalSpecs.map((row, idx) => (
                                        <tr key={idx}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{row.label}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{row.value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-2 italic">* Actual specifications may vary based on grade and processing method.</p>
                    </div>

                    {/* CTA In Modal */}
                    <div className="bg-slate-900 text-white p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                            <h4 className="font-bold text-lg">Need this material?</h4>
                            <p className="text-slate-400 text-sm">Contact DaRiiTO INDIA for a custom quote or datasheet.</p>
                        </div>
                        <a href="#contact" onClick={onClose} className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors whitespace-nowrap">
                            Request Quote
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );
};

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white hover:border-blue-300 transition-colors">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
            >
                <span className="font-semibold text-slate-800 text-sm md:text-base">{question}</span>
                <ChevronDown className={`w-5 h-5 text-blue-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 py-4 opacity-100' : 'max-h-0 py-0 opacity-0'}`}
            >
                <p className="text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
                    {answer}
                </p>
            </div>
        </div>
    );
};

const App = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showContactPopup, setShowContactPopup] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [selectedProduct, setSelectedProduct] = useState(null);

    useScrollReveal();

    // Scroll Logic
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Popup Timer Logic
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowContactPopup(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    // Mouse Move Logic for 3D Effects
    useEffect(() => {
        const handleMouseMove = (e) => {
            requestAnimationFrame(() => {
                setMousePos({ x: e.clientX, y: e.clientY });
            });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="bg-white min-h-screen text-slate-600 font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">

            {/* Interactive Background Effects */}
            <ClickEffects />

            {/* Product Modal */}
            {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}

            {/* --- CONTACT POPUP (With Animated SVG) --- */}
            {showContactPopup && (
                <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 sm:p-6">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
                        onClick={() => setShowContactPopup(false)}
                    ></div>

                    {/* Modal Content */}
                    <div className="relative bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl w-full max-w-lg p-6 sm:p-8 animate-in slide-in-from-bottom-8 duration-500 border border-slate-100 scale-100 overflow-hidden group">

                        {/* Animated Decorative Top Gradient */}
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 animate-gradient-x"></div>

                        {/* Background SVG Decoration */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 opacity-5 pointer-events-none animate-spin-slow">
                            <Settings className="w-full h-full text-blue-600" />
                        </div>

                        <button
                            onClick={() => setShowContactPopup(false)}
                            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors z-10"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex items-start gap-5 mb-8 mt-2 relative">
                            {/* Animated Icon Container */}
                            <div className="relative w-12 h-12 flex-shrink-0">
                                <div className="absolute inset-0 bg-blue-100 rounded-2xl animate-pulse"></div>
                                <div className="absolute inset-0 flex items-center justify-center text-blue-600">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path className="animate-dash" strokeDasharray="60" strokeDashoffset="60" d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                                    </svg>
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full animate-bounce"></div>
                            </div>

                            <div>
                                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Quick Inquiry</h3>
                                <p className="text-slate-500 text-sm mt-1">Connect with our engineering team instantly.</p>
                            </div>
                        </div>

                        <form action="https://api.web3forms.com/submit" method="POST" className="space-y-5 relative z-10">
                            <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" />

                            <div className="space-y-4">
                                <div className="relative group">
                                    <input type="text" name="name" required placeholder=" " className="peer w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900" />
                                    <label className="absolute left-4 top-3.5 text-slate-400 text-sm transition-all peer-focus:-top-2.5 peer-focus:left-2 peer-focus:bg-white peer-focus:px-2 peer-focus:text-xs peer-focus:text-blue-600 peer-not-placeholder-shown:-top-2.5 peer-not-placeholder-shown:left-2 peer-not-placeholder-shown:bg-white peer-not-placeholder-shown:px-2 peer-not-placeholder-shown:text-xs pointer-events-none">Your Name</label>
                                </div>

                                <div className="relative group">
                                    <input type="email" name="email" required placeholder=" " className="peer w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900" />
                                    <label className="absolute left-4 top-3.5 text-slate-400 text-sm transition-all peer-focus:-top-2.5 peer-focus:left-2 peer-focus:bg-white peer-focus:px-2 peer-focus:text-xs peer-focus:text-blue-600 peer-not-placeholder-shown:-top-2.5 peer-not-placeholder-shown:left-2 peer-not-placeholder-shown:bg-white peer-not-placeholder-shown:px-2 peer-not-placeholder-shown:text-xs pointer-events-none">Work Email</label>
                                </div>

                                <div className="relative group">
                                    <textarea name="message" rows="3" required placeholder=" " className="peer w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 resize-none"></textarea>
                                    <label className="absolute left-4 top-3.5 text-slate-400 text-sm transition-all peer-focus:-top-2.5 peer-focus:left-2 peer-focus:bg-white peer-focus:px-2 peer-focus:text-xs peer-focus:text-blue-600 peer-not-placeholder-shown:-top-2.5 peer-not-placeholder-shown:left-2 peer-not-placeholder-shown:bg-white peer-not-placeholder-shown:px-2 peer-not-placeholder-shown:text-xs pointer-events-none">Message</label>
                                </div>
                            </div>

                            <button type="submit" className="w-full py-4 bg-slate-900 hover:bg-blue-700 text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10 group overflow-hidden relative">
                                <span className="relative z-10 flex items-center gap-2">Send Request <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>
                        </form>

                        <div className="mt-6 text-center border-t border-slate-100 pt-4">
                            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold flex items-center justify-center gap-2">
                                <CheckCircle2 className="w-3 h-3 text-green-500" /> Secure Data Transmission
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* --- NAVIGATION --- */}
            <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${scrolled || isMenuOpen ? 'bg-white/95 backdrop-blur-md border-slate-200 py-3 shadow-sm' : 'bg-transparent border-transparent py-6'}`}>
                <div className="container mx-auto px-6 md:px-12 flex justify-between items-center relative">

                    {/* LOGO */}
                    <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-slate-200 bg-white shadow-sm">
                            <img src={daritto} alt="Daritto Logo" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }} />
                            <div className="absolute inset-0 hidden items-center justify-center bg-slate-100">
                                <Hexagon className="w-6 h-6 text-blue-700" />
                            </div>
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-900 font-sans">DARIITO<span className="text-blue-600">.</span></span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        {['Products', 'About', 'Contact'].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors"
                            >
                                {item}
                            </a>
                        ))}
                        <a
                            href="#contact"
                            className="px-6 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-full hover:bg-blue-700 transition-colors shadow-lg shadow-blue-900/10"
                        >
                            Get Quote
                        </a>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden text-slate-700 p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* --- MOBILE DROPDOWN MENU --- */}
                {isMenuOpen && (
                    <div className="absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-xl flex flex-col items-center py-8 gap-6 animate-in slide-in-from-top-5 duration-200 md:hidden">
                        {['Products', 'About', 'Contact'].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                onClick={() => setIsMenuOpen(false)}
                                className="text-xl font-medium text-slate-800 hover:text-blue-700 transition-colors w-full text-center py-2"
                            >
                                {item}
                            </a>
                        ))}
                        <a
                            href="#contact"
                            onClick={() => setIsMenuOpen(false)}
                            className="mt-4 px-10 py-3 bg-blue-700 text-white font-bold rounded-full shadow-lg hover:bg-blue-800 transition-colors"
                        >
                            Get Quote
                        </a>
                    </div>
                )}
            </nav>

            {/* --- HERO SECTION --- */}
            <header className="relative w-full min-h-[95vh] flex items-center bg-slate-50 overflow-hidden">

                {/* Technical Grid Background */}
                <div className="absolute inset-0 z-0 opacity-40 pointer-events-none"
                    style={{
                        backgroundImage: 'linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}>
                </div>

                {/* Abstract Floating Shapes */}
                <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-white via-white/80 to-transparent skew-x-[-12deg] translate-x-32 hidden lg:block z-0"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[100px] pointer-events-none"></div>

                {/* Hero Content */}
                <div className="container mx-auto px-6 md:px-12 relative z-10 pt-28 pb-20 lg:pt-28 lg:pb-32">
                    <div className="flex flex-col lg:flex-row items-center gap-16">

                        <div className="w-full lg:w-1/2 space-y-8 reveal relative z-10 text-center lg:text-left">
                            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white border border-slate-200 rounded-full shadow-sm hover:shadow-md transition-shadow cursor-default mx-auto lg:mx-0">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                                </span>
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">ISO 9001:2015 Certified Facility</span>
                            </div>

                            <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] text-slate-900 tracking-tight">
                                Precision Parts for <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500">Global Industry.</span>
                            </h1>

                            <div className="flex flex-col gap-4 lg:border-l-4 border-blue-600 lg:pl-6 items-center lg:items-start">
                                <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                                    Dariito engineers the foundation of automotive excellence. We supply high-grade <strong className="text-slate-900">Carbon</strong>, <strong className="text-slate-900">Graphite</strong>,<strong className="text-slate-900"> Tungsten copper rods </strong>, and <strong className="text-slate-900">EDM Electrodes</strong> with micron-level precision.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
                                <a
                                    href="#products"
                                    className="px-8 py-4 bg-slate-900 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-xl shadow-slate-900/20 flex items-center justify-center gap-2 group"
                                >
                                    <Factory className="w-4 h-4" /> View Catalogue <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </a>

                                <a
                                    href="#about"
                                    className="px-8 py-4 bg-white border border-slate-200 text-slate-700 font-semibold rounded-lg hover:border-blue-300 hover:text-blue-700 transition-all flex items-center justify-center shadow-sm"
                                >
                                    Our Expertise
                                </a>
                            </div>

                            <div className="pt-8 flex flex-wrap items-center gap-8 text-slate-500 justify-center lg:justify-start">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                                    <span className="text-sm font-medium">Global Logistics</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                                    <span className="text-sm font-medium">Quality Assured</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                                    <span className="text-sm font-medium">Bulk Supply</span>
                                </div>
                            </div>
                        </div>

                        {/* Hero Image with 3D Float Effect */}
                        <div className="w-full lg:w-1/2 relative reveal delay-200 perspective-1000">
                            <div
                                className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform transition-transform duration-100 ease-out"
                                style={{
                                    transform: `rotateY(${(mousePos.x - window.innerWidth / 2) * 0.005}deg) rotateX(${(mousePos.y - window.innerHeight / 2) * -0.005}deg)`,
                                }}
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000&auto=format&fit=crop"
                                    alt="Precision Manufacturing"
                                    className="w-full h-[500px] object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                                <div className="absolute bottom-0 left-0 p-8 w-full">
                                    <div className="flex justify-between items-end">
                                        <div className="text-white">
                                            <p className="text-xs font-bold uppercase tracking-widest mb-2 opacity-80 flex items-center gap-2"><Activity className="w-3 h-3" /> Active Production</p>
                                            <p className="text-2xl font-bold">Automated EDM Processing</p>
                                        </div>
                                        <div className="hidden md:block">
                                            <p className="text-4xl font-bold text-white">99.9%</p>
                                            <p className="text-[10px] text-slate-300 uppercase tracking-widest text-right">Efficiency</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Badge */}
                            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-xl border border-slate-100 hidden md:block animate-bounce duration-[3000ms]">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-blue-50 rounded-lg">
                                        <Globe className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-xl font-bold text-slate-900">25+</p>
                                        <p className="text-[10px] text-slate-500 font-bold uppercase">Countries</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </header>

            {/* --- ABOUT SECTION --- */}
            <section id="about" className="py-24 bg-white relative overflow-hidden">
                {/* Enhanced Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-50 z-0"></div>
                <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-100/60 skew-x-12 translate-x-1/4 pointer-events-none z-0"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50/40 rounded-full blur-[100px] pointer-events-none z-0"></div>
                <div className="absolute inset-0 z-0 opacity-[0.03]"
                    style={{ backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
                </div>

                <div className="container mx-auto px-6 md:px-12 relative z-10">

                    {/* Section Header */}
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-widest mb-6">
                            <Target className="w-4 h-4" /> About DaRiiTO INDIA
                        </div>
                        <h3 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
                            Engineering the Future of <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-cyan-500">Material Excellence</span>
                        </h3>
                        <p className="text-slate-500 text-lg md:text-xl leading-relaxed font-light max-w-2xl mx-auto">
                            We provide the foundational elements for modern industry. Driven by integrity and precision, DaRiiTO INDIA is your strategic partner in metallurgical and electrical excellence.
                        </p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-20 items-center">

                        {/* Left Column: Video/Visual Presentation */}
                        <div className="w-full lg:w-1/2 relative group">
                            {/* Main Video Container */}
                            <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100 bg-slate-900 aspect-[4/5] sm:aspect-square lg:aspect-[4/5]">
                                {/* Video Placeholder - Replace src with your actual video */}
                                <video
                                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-[2000ms] ease-out"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    poster="https://images.unsplash.com/photo-1565514020176-dbf227701633?q=80&w=2000&auto=format&fit=crop"
                                >
                                    <source src={industrialVideo} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>

                                {/* Cinematic Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

                                {/* Content Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10 text-white">
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center text-white shadow-lg flex-shrink-0">
                                            <Lightbulb className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase tracking-widest text-blue-200 mb-2 font-semibold">Our Vision</p>
                                            <p className="font-serif text-xl sm:text-2xl leading-snug text-slate-100">
                                                "Building trust through <br /><span className="text-blue-400 italic">uncompromising quality</span>."
                                            </p>
                                        </div>
                                    </div>

                                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full w-1/3 bg-blue-500 rounded-full"></div>
                                    </div>
                                </div>

                                {/* Play Button Indicator (Decorative) */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-75 group-hover:scale-100">
                                    <Play className="w-8 h-8 fill-current" />
                                </div>
                            </div>

                            {/* Decorative Background Elements */}
                            <div className="absolute -top-8 -left-8 w-full h-full border-2 border-slate-200/50 rounded-[2.5rem] -z-10 hidden lg:block"></div>
                            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-blue-100/50 rounded-full blur-3xl -z-10"></div>
                        </div>

                        {/* Right Column: Narrative & Values */}
                        <div className="w-full lg:w-1/2 space-y-10">

                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-widest mb-6">
                                    <Target className="w-4 h-4 text-blue-600" /> About DaRiiTO INDIA
                                </div>
                                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
                                    Foundations of <br />
                                    <span className="text-blue-700">Modern Industry.</span>
                                </h2>
                                <div className="prose prose-lg text-slate-600">
                                    <p className="leading-relaxed">
                                        DaRiiTO INDIA is a premier supplier serving a wide range of industrial and commercial sectors across India. We specialize in <span className="font-semibold text-slate-900">Metallurgy</span>, <span className="font-semibold text-slate-900">Engineering</span>, and <span className="font-semibold text-slate-900">Electrical Applications</span>.
                                    </p>
                                    <p className="leading-relaxed mt-4">
                                        Driven by integrity and long-term partnerships, we are committed to becoming a reliable link in our customers’ supply chain by providing competitive pricing, consistent quality, and responsive support.
                                    </p>
                                </div>
                            </div>

                            {/* Strength Cards - Redesigned */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { icon: ShieldCheck, title: "Reliable Supply", desc: "Consistent flow ensuring zero downtime." },
                                    { icon: CheckCircle2, title: "Quality Assured", desc: "Rigorous density and conductivity testing." },
                                    { icon: Settings, title: "Custom Solutions", desc: "Tailored sizing and machining services." },
                                    { icon: Globe, title: "Industry Focused", desc: "Expertise across multiple sectors." }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 hover:bg-white border border-transparent hover:border-blue-100 hover:shadow-lg hover:shadow-blue-900/5 transition-all duration-300 group">
                                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-slate-100 shadow-sm group-hover:bg-blue-600 group-hover:border-blue-600 transition-colors">
                                            <item.icon className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-sm mb-1">{item.title}</h4>
                                            <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Mission Statement */}
                            <div className="relative p-8 bg-slate-900 rounded-2xl text-white overflow-hidden">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/20 rounded-full blur-2xl -mr-10 -mt-10"></div>
                                <div className="relative z-10 flex gap-4">
                                    <div className="w-1 bg-blue-500 rounded-full"></div>
                                    <div>
                                        <h4 className="text-blue-300 font-bold text-sm uppercase tracking-widest mb-2">Our Mission</h4>
                                        <p className="text-lg font-serif italic text-slate-100 leading-relaxed">
                                            "To supply high-quality carbon and graphite products that add tangible value through unyielding reliability and precision."
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </section>
            {/* --- PRODUCTS SECTION (With 3D Grid) --- */}
            <section id="products" className="py-24 bg-white reveal overflow-hidden relative">

                {/* Animated Background Elements */}
                <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                    <div className="absolute inset-0"
                        style={{
                            backgroundImage: 'linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)',
                            backgroundSize: '30px 30px',
                            animation: 'pan-grid 60s linear infinite'
                        }}>
                    </div>
                </div>

                {/* Rotating Gears in Background */}
                <div className="absolute -top-20 -left-20 text-slate-200 animate-spin-slow opacity-60">
                    <Settings className="w-64 h-64" />
                </div>
                <div className="absolute bottom-20 -right-20 text-slate-200 animate-spin-slow-reverse opacity-60">
                    <Settings className="w-96 h-96" />
                </div>

                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    <div className="flex justify-between items-end mb-16">
                        <div>
                            <h2 className="text-sm font-bold text-blue-700 uppercase tracking-widest mb-2 flex items-center gap-2">
                                <Scan className="w-4 h-4" /> Our Inventory
                            </h2>
                            <h3 className="text-3xl md:text-4xl font-bold text-slate-900">Material Solutions</h3>
                        </div>
                        <a href="#contact" className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-blue-700 transition-colors">
                            Request Full Catalogue <ChevronRight className="w-4 h-4" />
                        </a>
                    </div>

                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 perspective-1000"
                        style={{ perspective: '2000px' }}
                    >
                        {PRODUCT_DATA.map((product, index) => (
                            <div
                                key={index}
                                onClick={() => setSelectedProduct(product)}
                                className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-100 group flex flex-col h-[480px] transform-gpu cursor-pointer"
                                style={{
                                    transformStyle: 'preserve-3d',
                                    transform: `rotateY(${(mousePos.x - window.innerWidth / 2) * 0.005}deg) rotateX(${(mousePos.y - window.innerHeight / 2) * -0.005}deg)`
                                }}
                            >
                                {/* Image Section */}
                                <div className="h-56 overflow-hidden relative border-b border-slate-100">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-900 shadow-sm z-10">
                                        ID-{product.id}
                                    </div>
                                    <div className="absolute bottom-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-md text-xs font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                                        Click for Details
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>

                                {/* Content Section */}
                                <div className="p-6 flex-1 flex flex-col justify-between relative z-20">
                                    <div>
                                        <div className="flex items-center gap-2 mb-3 text-blue-700">
                                            {product.icon}
                                            <span className="text-xs font-bold uppercase tracking-wider">{product.tagline}</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">{product.name}</h3>
                                        <p className="text-sm text-slate-600 mb-4 line-clamp-3 leading-relaxed">{product.desc}</p>
                                    </div>

                                    <div className="space-y-2 border-t border-slate-100 pt-4">
                                        {product.specs.slice(0, 3).map((spec, i) => (
                                            <div key={i} className="flex justify-between items-center text-xs text-slate-500">
                                                <span>{spec}</span>
                                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/10 rounded-xl transition-all duration-300 pointer-events-none"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- FAQ SECTION --- */}
            <section id="faq" className="py-24 bg-slate-50 reveal">
                <div className="container mx-auto px-6 md:px-12 max-w-4xl">
                    <div className="text-center mb-16">
                        <h2 className="text-sm font-bold text-blue-700 uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
                            <HelpCircle className="w-4 h-4" /> Common Questions
                        </h2>
                        <h3 className="text-3xl md:text-4xl font-bold text-slate-900">Frequently Asked Questions</h3>
                    </div>

                    <div className="space-y-4">
                        {FAQS.map((faq, index) => (
                            <FAQItem key={index} question={faq.question} answer={faq.answer} />
                        ))}
                    </div>
                </div>
            </section>

            {/* --- CONTACT SECTION (Main) --- */}
            <section id="contact" className="py-24 bg-white reveal">
                <div className="container mx-auto px-4 md:px-12">
                    <div className="max-w-6xl mx-auto bg-slate-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row">

                        {/* Contact Info Side */}
                        <div className="w-full lg:w-5/12 bg-slate-800 p-10 text-white flex flex-col justify-between relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-3xl opacity-20 -mr-16 -mt-16"></div>

                            <div>
                                <h3 className="text-3xl font-bold mb-6">Let's Collaborate</h3>
                                <p className="text-slate-300 mb-8 leading-relaxed">
                                    Ready to optimize your supply chain? Our engineering team is ready to review your specifications and provide a competitive quote within 24 hours.
                                </p>

                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 group cursor-pointer">
                                        <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                            <Phone className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-400 uppercase font-bold mb-1">Call Us</p>
                                            <p className="font-medium text-lg">+91 9050345764</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 group cursor-pointer">
                                        <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-400 uppercase font-bold mb-1">Email Us</p>
                                            <p className="font-medium text-lg">sales@dariito.com</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 group cursor-pointer">
                                        <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-400 uppercase font-bold mb-1">Visit Us</p>
                                            <p className="font-medium text-sm leading-snug">Dariito India, Plot No. 2, Hisar Road,<br />Pratham Bhawan, Shastri Nagar,<br />Opp. LPS Factory, Rohtak, Haryana.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 pt-12 border-t border-slate-700">
                                <div className="flex items-center gap-2">
                                    <span className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                    </span>
                                    <span className="text-sm font-medium text-slate-300">Operations Online</span>
                                </div>
                            </div>
                        </div>


                        {/* Form Side */}
                        <div className="w-full lg:w-7/12 bg-white p-8 md:p-12">
                            <form action="https://api.web3forms.com/submit" method="POST" className="space-y-6">
                                <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="relative group">
                                        <input type="text" name="company" required placeholder=" " className="peer w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900" />
                                        <label className="absolute left-4 top-4 text-slate-400 text-sm transition-all peer-focus:-top-2.5 peer-focus:left-2 peer-focus:bg-white peer-focus:px-2 peer-focus:text-xs peer-focus:text-blue-600 peer-not-placeholder-shown:-top-2.5 peer-not-placeholder-shown:left-2 peer-not-placeholder-shown:bg-white peer-not-placeholder-shown:px-2 peer-not-placeholder-shown:text-xs pointer-events-none">Company Name</label>
                                    </div>
                                    <div className="relative group">
                                        <input type="email" name="email" required placeholder=" " className="peer w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900" />
                                        <label className="absolute left-4 top-4 text-slate-400 text-sm transition-all peer-focus:-top-2.5 peer-focus:left-2 peer-focus:bg-white peer-focus:px-2 peer-focus:text-xs peer-focus:text-blue-600 peer-not-placeholder-shown:-top-2.5 peer-not-placeholder-shown:left-2 peer-not-placeholder-shown:bg-white peer-not-placeholder-shown:px-2 peer-not-placeholder-shown:text-xs pointer-events-none">Work Email</label>
                                    </div>
                                </div>

                                <div className="relative group">
                                    <select name="sector" defaultValue="" className="peer w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 appearance-none">
                                        <option value="" disabled className="text-slate-400">Select Interest</option>
                                        <option value="Carbon Powder">Carbon Powder</option>
                                        <option value="Graphite Blocks">Graphite Blocks</option>
                                        <option value="EDM Electronics">EDM Electronics</option>
                                        <option value="Custom Request">Custom Request</option>
                                    </select>
                                    <label className="absolute left-4 -top-2.5 bg-white px-2 text-xs text-blue-600 pointer-events-none">Product Interest</label>
                                    <ChevronRight className="absolute right-4 top-4 w-4 h-4 text-slate-400 rotate-90 pointer-events-none" />
                                </div>

                                <div className="relative group">
                                    <textarea name="message" rows="4" required placeholder=" " className="peer w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 resize-none"></textarea>
                                    <label className="absolute left-4 top-4 text-slate-400 text-sm transition-all peer-focus:-top-2.5 peer-focus:left-2 peer-focus:bg-white peer-focus:px-2 peer-focus:text-xs peer-focus:text-blue-600 peer-not-placeholder-shown:-top-2.5 peer-not-placeholder-shown:left-2 peer-not-placeholder-shown:bg-white peer-not-placeholder-shown:px-2 peer-not-placeholder-shown:text-xs pointer-events-none">Project Details</label>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-4 bg-slate-900 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-slate-900/20 flex items-center justify-center gap-2 group"
                                >
                                    <Send className="w-4 h-4" /> Send Inquiry <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </section>

            {/* --- FOOTER --- */}
            <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
                <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-3">
                        <div className="relative w-8 h-8 rounded overflow-hidden bg-white">
                            <img src={daritto} alt="Logo" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-lg font-bold text-white tracking-wide">DARIITO<span className="text-blue-500">.</span></span>
                    </div>

                    <div className="text-sm font-medium flex flex-wrap justify-center gap-6">
                        <span>© 2026 Dariito Engineering.</span>
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </footer>

            <style>{`
        /* Scroll Reveal Classes */
        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-active {
          opacity: 1;
          transform: translateY(0);
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }
        .animate-dash {
          animation: dash 2s linear infinite;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        @keyframes spin-slow-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-slow-reverse {
          animation: spin-slow-reverse 25s linear infinite;
        }
        @keyframes pan-grid {
          0% { transform: translate(0, 0); }
          100% { transform: translate(-30px, -30px); }
        }
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>

        </div>
    );
};

export default App;