import { useState, useEffect } from "react";
import axios from "axios";
import { Dimmer, Loader, Container, Header, Message } from "semantic-ui-react";
import Search from "../Search/Search";
import WeatherCard from "../WeatherCard/WeatherCard";

const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
};

function WeatherWidget() {
    // State pour stocker les données météorologiques
    const [weatherData, setWeatherData] = useState<any>(null);
    // State pour indiquer si le chargement est en cours
    const [loading, setLoading] = useState<boolean>(true);
    // State pour gérer les messaged d'erreur
    const [error, setError] = useState<string>("");

    const apiKey = import.meta.env.VITE_OPENWEATHER_API_URL;

    const handleSearch = async (city: string) => {
        setLoading(true); // Démarre le chargement
        // Utiliser les informations de recherche pour obtenir les données météorologiques
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=fr&appid=${apiKey}&units=metric`
            );
            setWeatherData(response.data);
        } catch (e) {
            setError(
                `Erreur lors de la récupération des données météorologiques : ${e}`
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
            } catch (e) {
                console.error(
                    setError(
                        `Erreur lors de la récupération des données météorologiques : ${e}`
                    )
                );
            } finally {
                setLoading(false); // Arrête le chargement, que la requête ait réussi ou échoué
            }
        };

        // Appeler la fonction pour récupérer les données lors du montage du composant
        fetchWeatherData();
    }, [apiKey]);

    return (
        <Container style={containerStyle}>
            <Header as="h1" style={{ marginBottom: "4rem" }}>
                Widget Météo
            </Header>
            <Search onSearch={handleSearch} />
            {error && (
                <Message negative>
                    <Message.Header>Un problème a été rencontré...</Message.Header>
                    <p>{error}</p>
                </Message>
            )}
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
}

export default WeatherWidget;
