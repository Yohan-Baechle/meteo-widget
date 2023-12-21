// Search.tsx
import { useState } from "react";
import { Form, Button } from "semantic-ui-react";

interface SearchProps {
    onSearch: (city: string) => void;
}

function Search({ onSearch }: SearchProps) {
    const [city, setCity] = useState("");

    const handleSearch = () => {
        // Appeler la fonction de recherche avec les informations saisies
        onSearch(city);
    };

    return (
        <Form>
            <Form.Group>
                <Form.Input
                    placeholder="Ville"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <Button secondary onClick={handleSearch}>
                    Rechercher
                </Button>
            </Form.Group>
        </Form>
    );
};

export default Search;
