import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dimmer, Loader, Container, Header } from "semantic-ui-react";
import Search from "../Search/Search";
import WeatherCard from "../WeatherCard/WeatherCard";


const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh", // Pour occuper au moins la hauteur de l'écran
};

function WeatherWidget() {
    // State pour stocker les données météorologiques
    const [weatherData, setWeatherData] = useState<any>(null);
    // State pour indiquer si le chargement est en cours
    const [loading, setLoading] = useState<boolean>(true);

    const apiKey = "b235eb007859e4cd6d37380ed0d42a8e";
    const countryCode = "FR";

    const handleSearch = async (city: string) => {
        setLoading(true); // Démarre le chargement
        // Utiliser les informations de recherche pour obtenir les données météorologiques
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=fr&appid=${apiKey}&units=metric`
            );
            setWeatherData(response.data);
        } catch (error) {
            console.error(
                "Erreur lors de la récupération des données météorologiques",
                error
            );
        } finally {
            setLoading(false); // Arrête le chargement, que la requête ait réussi ou échoué
        }
    };

    useEffect(() => {
        const fetchWeatherData = async () => {
            setLoading(true); // Démarre le chargement
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=Nancy,FR&lang=fr&appid=${apiKey}&units=metric`
                );
                setWeatherData(response.data);
            } catch (error) {
                console.error(
                    "Erreur lors de la récupération des données météorologiques",
                    error
                );
            } finally {
                setLoading(false); // Arrête le chargement, que la requête ait réussi ou échoué
            }
        };

        // Appeler la fonction pour récupérer les données lors du montage du composant
        fetchWeatherData();
    }, [countryCode, apiKey]);

    return (
        <Container style={containerStyle}>
    <Header as='h1'  style={{marginBottom: '4rem'}}>Widget Météo</Header>
            <Search onSearch={handleSearch} />
            {/* Vérifier si le chargement est en cours */}
            {loading && (
                <Dimmer active>
                    <Loader content="Chargement..." />
                </Dimmer>
            )}
            {/* Vérifier si les données météorologiques sont disponibles */}
            {!loading && weatherData && <WeatherCard data={weatherData} />}
            </Container>
    );
};

export default WeatherWidget;
