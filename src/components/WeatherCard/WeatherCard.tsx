interface WeatherCardProps {
    data: any; // Type des données météorologiques
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
    // Extraire les informations nécessaires des données météorologiques
    const { name, main, weather } = data;
    const temperature = main.temp;
    const weatherDescription = weather[0].description;

    return (
        <div>
            <h2>{name}</h2>
            <p>Temperature: {temperature}°C</p>
            <p>Weather: {weatherDescription}</p>
        </div>
    );
};

export default WeatherCard;
