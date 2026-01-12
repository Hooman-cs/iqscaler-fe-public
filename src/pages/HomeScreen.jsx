// client/src/pages/HomeScreen.jsx

import React, { useEffect } from 'react'; 
import { useDispatch } from 'react-redux'; 
import { Link } from 'react-router-dom';
import { fetchLeaderboard } from '../slices/resultSlice'; 
import Leaderboard from '../components/Leaderboard'; 
import backgroundHeroImage from '../assets/images/background_1.webp'; 
import backgroundStatsImage from '../assets/images/background_2.webp'; 
import iqDonutChartImage from '../assets/images/iq_donut_chart.webp'; 
import iqByAgeImage from '../assets/images/iq_by_age.webp'; 
import iqByEducationImage from '../assets/images/iq_by_education.webp'; 
import iqByCountryImage from '../assets/images/iq_by_country.webp'; 

// Famous People Images (Renamed to match specific figures)
import satyaNadellaImage from '../assets/images/Satya Nadella - IQ 149.webp'; 
import kazuoHiraiImage from '../assets/images/Kaz Hirai - IQ 133.webp';  
import masayoshiSonImage from '../assets/images/Masayoshi Son - IQ 143.webp'; 
import sundarPichaiImage from '../assets/images/Sundar Pichai - IQ 148.webp'; 
import steveJobsImage from '../assets/images/Steve Jobs - IQ 158.webp';   
import markZuckerbergImage from '../assets/images/Mark Zuckerberg - IQ 152.webp'; 
import billGatesImage from '../assets/images/Bill Gates - IQ 153.webp';   
import nikolaTeslaImage from '../assets/images/Nikola Tesla - IQ 160.webp'; 
import marieCurieImage from '../assets/images/Marie Curie - IQ 177.webp'; 
import albertEinsteinImage from '../assets/images/Albert Einstein - IQ 162.webp'; 
import stephenHawkingImage from '../assets/images/Stephen Hawking - IQ 158.webp'; 
import hiroshiMikitaniImage from '../assets/images/Hiroshi Mikitani - IQ 135.webp'; 
import vijayShekharSharmaImage from '../assets/images/Vijay Shekhar Sharma - IQ 135.webp';

const HomeScreen = () => {
    const dispatch = useDispatch(); 

    // Fetch leaderboard data when the component loads
    useEffect(() => {
        dispatch(fetchLeaderboard());
    }, [dispatch]);


    const highLevelStatistics = [
        { number: '100K+', text: 'Tests Completed Annually' },
        { number: '98%', text: 'User Satisfaction Rate' },
        { number: '20+', text: 'Years of Cognitive Research' },
    ];

    const highlights = [
        { title: 'Comprehensive Evaluation', description: 'Covers logical reasoning, pattern recognition, problem-solving agility, memory processing, and verbal understanding.' },
        { title: 'Adaptive Difficulty', description: 'Intelligent scoring models measure your performance relative to question complexity for a precise result.' },
        { title: 'Instant Reports', description: 'Clear, insightful results with breakdowns that help you understand your strengths and growth areas.' },
        { title: 'User-Friendly Design', description: 'Clean layouts, intuitive navigation, and guidance at every step of the assessment.' },
    ];

    const famousPersonalities = [
        {
            image: albertEinsteinImage,
            name: 'Albert Einstein',
            title: 'Theoretical Physicist',
            iq: 162,
        },
        {
            image: marieCurieImage,
            name: 'Marie Curie',
            title: 'Pioneering Physicist & Chemist',
            iq: 177,
        },
        {
            image: nikolaTeslaImage,
            name: 'Nikola Tesla',
            title: 'Inventor & Electrical Engineer',
            iq: 160,
        },
        {
            image: stephenHawkingImage,
            name: 'Stephen Hawking',
            title: 'Theoretical Physicist & Cosmologist',
            iq: 158,
        },
        {
            image: billGatesImage,
            name: 'Bill Gates',
            title: 'Co-founder of Microsoft',
            iq: 153,
        },
        {
            image: sundarPichaiImage,
            name: 'Sundar Pichai',
            title: 'CEO of Google & Alphabet',
            iq: 148,
        },
        {
            image: satyaNadellaImage,
            name: 'Satya Nadella',
            title: 'CEO of Microsoft',
            iq: 149,
        },
        {
            image: markZuckerbergImage,
            name: 'Mark Zuckerberg',
            title: 'CEO of Meta Platforms',
            iq: 152,
        },
        {
            image: steveJobsImage,
            name: 'Steve Jobs',
            title: 'Co-founder of Apple Inc.',
            iq: 158,
        },
        {
            image: masayoshiSonImage,
            name: 'Masayoshi Son',
            title: 'Founder & CEO of SoftBank',
            iq: 143,
        },
        {
            image: hiroshiMikitaniImage,
            name: 'Hiroshi Mikitani',
            title: 'Founder & CEO of Rakuten',
            iq: 135,
        },
        {
            image: vijayShekharSharmaImage,
            name: 'Vijay Shekhar Sharma',
            title: 'Founder & CEO of Paytm',
            iq: 135,
        },
        {
            image: kazuoHiraiImage,
            name: 'Kazuo Hirai',
            title: 'Former CEO of Sony',
            iq: 133,
        },
    ];
    return (
        <div className="overflow-x-hidden"> {/* Prevents horizontal scroll on small devices */}
            
            {/* 1. Hero Section */}
            <div 
                className="min-h-[90vh] md:min-h-[85vh] flex flex-col justify-center items-center text-center text-white bg-cover bg-center px-4"
                style={{ 
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(${backgroundHeroImage})` 
                }}
            >
                <div className="max-w-4xl p-4 md:p-8 z-10">
                    <h1 className="text-3xl sm:text-4xl md:text-6xl text-blue-400 mb-6 font-extrabold tracking-tight drop-shadow-lg">
                        Measure Your Cognitive Strength With Precision
                    </h1>
                    <p className="text-lg md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto drop-shadow-md">
                        Our advanced IQ testing platform delivers accurate, research-based insights into your reasoning, memory, and analytical thinking.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
                        <Link to='/quiz' className="w-full sm:w-auto px-8 py-4 text-lg md:text-xl bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300 transform hover:scale-105 shadow-lg">
                            Start Your IQ Test →
                        </Link>
                        <Link to='/about' className="w-full sm:w-auto px-8 py-4 text-lg md:text-xl bg-transparent text-blue-400 font-semibold rounded-lg border-2 border-blue-400 hover:bg-blue-400 hover:text-white transition duration-300 transform hover:scale-105">
                            How It Works →
                        </Link>
                    </div>
                </div>
            </div>

            {/* 2. Introduction Section */}
            <div className="bg-white py-12 md:py-20 px-6 text-center text-gray-800">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-4xl font-bold mb-6 text-gray-700">Unlock Your Cognitive Potential</h2>
                    <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                        Understanding your cognitive abilities shouldn’t require complicated forms or vague results. Our platform provides a <b>modern, reliable, and user-centered approach</b> to IQ evaluation.
                    </p>
                </div>
            </div>

            {/* 3. High-Level Statistics Section */}
            <div 
                className="py-16 md:py-24 px-6 text-center text-white bg-cover bg-center"
                style={{ 
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url(${backgroundStatsImage})` 
                }}
            >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-400">Platform Impact & Trust</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 max-w-6xl mx-auto">
                    {highLevelStatistics.map((stat, index) => (
                        <div key={index} className="bg-black/40 border border-blue-500/30 p-6 md:p-10 rounded-2xl backdrop-blur-sm transition hover:border-blue-500">
                            <div className="text-4xl md:text-5xl font-extrabold text-green-400 mb-3">{stat.number}</div>
                            <div className="text-lg md:text-xl font-medium text-gray-200">{stat.text}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Leaderboard Section */}
            <div className="bg-gray-50 py-12 px-4 border-b">
                <div className="max-w-5xl mx-auto overflow-x-auto">
                    <Leaderboard /> 
                </div>
            </div>

            {/* 4. Global IQ Distribution Section */}
            <div className="bg-white py-16 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-2xl md:text-4xl font-bold mb-10 text-gray-700">Global IQ Score Distribution</h2>
                    <div className="flex flex-col lg:flex-row items-center gap-10 bg-gray-50 p-6 md:p-12 rounded-3xl shadow-sm">
                        <div className="w-full lg:w-1/2"> 
                            <img src={iqDonutChartImage} alt="IQ Distribution" className="w-full h-auto rounded-xl shadow-lg" />
                        </div>
                        <div className="w-full lg:w-1/2 text-left">
                            <h3 className="text-xl md:text-2xl font-semibold text-blue-600 mb-6 border-b pb-2">Population Percentages</h3>
                            <ul className="space-y-4 text-gray-700 text-sm md:text-base">
                                <li className="flex items-start gap-3">
                                    <span className="text-green-500 font-bold">✓</span>
                                    <span><b>Average (85-114):</b> 68.6% of the population.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-green-500 font-bold">✓</span>
                                    <span><b>Gifted (115-145):</b> 8.8% showing higher abilities.</span>
                                </li>
                                <li className="relative pl-6 before:content-['\2713'] before:absolute before:left-0 before:text-lg before:font-bold before:text-green-500">
                                    <b>Gifted (115-145 IQ):</b> Includes <b>8.8%</b> of the population, showing higher cognitive abilities.
                                </li>
                                <li className="relative pl-6 before:content-['\2713'] before:absolute before:left-0 before:text-lg before:font-bold before:text-green-500">
                                    <b>Very Low (&lt; 55 IQ):</b> Represents <b>6.9%</b> of the population.
                                </li>
                                <li className="relative pl-6 before:content-['\2713'] before:absolute before:left-0 before:text-lg before:font-bold before:text-green-500">
                                    <b>Very High (&gt; 145 IQ):</b> A smaller segment at <b>3.9%</b>, indicating exceptionally high intelligence.
                                </li>
                           </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* 5. IQ Trends Section */}
            <div className="bg-gray-50 py-16 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                        {/* Age Card */}
                        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md border-t-4 border-purple-500">
                            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 text-center">IQ by Age Group</h3>
                            <img src={iqByAgeImage} alt="Age Trends" className="w-full h-auto mb-6 rounded-lg" />
                            <p className="text-gray-600 text-sm text-center">Cognitive abilities typically peak in early adulthood (18-39).</p>
                        </div>
                        {/* Education Card */}
                        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md border-t-4 border-pink-500">
                            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 text-center">IQ by Education</h3>
                            <img src={iqByEducationImage} alt="Education Trends" className="w-full h-auto mb-6 rounded-lg" />
                            <p className="text-gray-600 text-sm text-center">Higher education correlates with higher average cognitive scores.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 6. IQ by Country Section (Title Only, No Description) */}
            <div className="bg-gray-100 py-16 px-4">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-700">Average IQ Based on Country</h2>
                    
                    <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-red-500 flex justify-center">
                        <img 
                            src={iqByCountryImage} 
                            alt="Average IQ Based on Country" 
                            className="w-full h-auto rounded-lg shadow-md max-w-3xl" 
                            // Placeholder dimensions for performance (replace with actual size)
                            width={800} 
                            height={500}
                        />
                    </div>
                </div>
            </div>

            {/* 7. Famous Personalities - Responsive Grid */}
            <div className="bg-white py-16 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-700">IQ of Famous Personalities</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
                        Discover the estimated IQ scores of some of the world's most influential figures, from historical geniuses to modern tech pioneers.
                    </p>
                    
                    <div className="flex flex-wrap justify-center gap-6">
                        {famousPersonalities.map((person, index) => (
                            <div key={index} className="w-44 bg-gray-50 p-4 rounded-xl shadow-lg border-b-4 border-blue-400 flex flex-col items-center text-center transition duration-300 hover:shadow-xl hover:-translate-y-1">
                                <img 
                                    src={person.image} 
                                    alt={person.name} 
                                    // Adjusted for better facial centering: object-position-top for most portraits
                                    className="w-24 h-24 object-cover object-[50%_10%] rounded-full mb-3 border-2 border-blue-300" 
                                    width={96} // Equivalent to w-24
                                    height={96} // Equivalent to h-24
                                />
                                <h4 className="text-md font-bold text-gray-800 line-clamp-2 min-h-[2.5rem]">{person.name}</h4>
                                <p className="text-xs text-gray-600 line-clamp-2 min-h-[2rem]">{person.title}</p>
                                <p className="text-md font-extrabold text-blue-700 mt-2">IQ: {person.iq}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 8. Key Highlights Section */}
            <div className="bg-gray-100 py-16 px-6">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl md:text-4xl font-bold mb-12 text-center text-gray-700">Why Choose Us?</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {highlights.map((item, index) => (
                            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-green-500">
                                <div className="text-3xl mb-4">🧠</div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeScreen;