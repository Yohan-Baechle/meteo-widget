import { Card, Icon } from "semantic-ui-react";

interface WeatherCardProps {
    data: {
        name: string; // Nom de la ville
        main: {
            temp: number; // Température
        };
        weather: {
            description: string; // Description météorologique
            icon: string; // icône météo
        }[];
        sys: {
            country: string; // Code du pays
        };
    };
}

function WeatherCard({ data }: WeatherCardProps) {
    // Extraire les informations nécessaires des données météorologiques
    const { name, main, weather, sys } = data;
    const temperature = main.temp;
    const weatherDescription = weather[0].description;
    const country = sys.country;
    const weatherIconCode = weather[0].icon;

    // Construire l'URL de l'icône
    const iconUrl = `http://openweathermap.org/img/w/${weatherIconCode}.png`;

    const cardStyle = {
        fontSize: "1.2em",
        backgroundColor: "#EEEEEE",
    };

    return (
        <Card style={cardStyle}>
            <Card.Content>
            <img src={iconUrl} alt={weatherDescription} />
                <Card.Header>
                    {name}, {country}
                </Card.Header>
                <Card.Meta>{new Date().toLocaleDateString()}</Card.Meta>
                <Card.Description>
                    <Icon name="thermometer" />
                    Température: {temperature}°C
                </Card.Description>
                <Card.Description>
                    <Icon name="sun" />
                    Météo: {weatherDescription}
                </Card.Description>

            </Card.Content>
        </Card>
    );
};
export default WeatherCard;
