import { useState, useEffect } from "react";
import axios from "axios";
import WeatherCard from "../WeatherCard/WeatherCard";

const WeatherWidget: React.FC = () => {
    // State pour stocker les données météorologiques
    const [weatherData, setWeatherData] = useState<any>(null);

    const apiKey = "b235eb007859e4cd6d37380ed0d42a8e";
    const zipCode = "54200";
    const countryCode = "FR";

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},${countryCode}&lang=fr&appid=${apiKey}&units=metric`
                );

                setWeatherData(response.data);
            } catch (error) {
                console.error(
                    "Erreur lors de la récupération des données météorologiques",
                    error
                );
            }
        };

        // Appeler la fonction pour récupérer les données lors du montage du composant
        fetchWeatherData();
    }, [zipCode, countryCode, apiKey]);

    return (
        <div>
            <h1 className="bg-slate-800">Widget météo</h1>
            {/* Vérifier si les données météorologiques sont disponibles */}
            {weatherData && <WeatherCard data={weatherData} />}
        </div>
    );
};

export default WeatherWidget;
