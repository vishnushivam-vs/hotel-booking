
import { useEffect, useState } from "react";
import "./Destination.css";

export const Destination = ({ searchQuery}) => {
    //const [search, setSearch] = useState(searchQuery);
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchDestinations = async (query) => {

         if (!query?.trim()) {
        setDestinations([]);
        setError("Please enter a destination.");
        return;
    }

        setLoading(true);
        setError("");

        try {
            const url = new URL("https://en.wikipedia.org/w/api.php");

            url.search = new URLSearchParams({
                action: "query",
                generator: "search",
                gsrsearch: query,
                gsrnamespace: "0",
                gsrlimit: "12",
                prop: "pageimages|extracts|coordinates|info",
                piprop: "thumbnail",
                pithumbsize: "600",
                exintro: "1",
                explaintext: "1",
                inprop: "url",
                format: "json",
                origin: "*",
            }).toString();

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Unable to fetch destinations.");
            }

            const data = await response.json();

            const pages = Object.values(data.query?.pages || {})
                .sort((a, b) => a.index - b.index)
                .map((page) => ({
                    id: page.pageid,
                    name: page.title,
                    description:
                        page.extract || "No description available.",
                    image: page.thumbnail?.source || "",
                    latitude: page.coordinates?.[0]?.lat ?? null,
                    longitude: page.coordinates?.[0]?.lon ?? null,
                    wikipediaUrl: page.fullurl,
                }));

            setDestinations(pages);

            if (pages.length === 0) {
                setError("No destinations found. Try another search.");
            }
        } catch (err) {
            setError(err.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

 useEffect(() => {
    if (searchQuery?.trim()) {
        fetchDestinations(searchQuery);
    }
}, [searchQuery]);

   
    return (
        <section className="destinationSection">
            <div className="destinationHeader">
                <h2>Explore Tourist Destinations</h2>
                <p>Discover beautiful places around the world.</p>

            </div>

            {loading && <p className="destinationStatus">Loading destinations...</p>}

            {error && <p className="destinationError">{error}</p>}

            {!loading && destinations.length > 0 && (
                <div className="destinationGrid">
                    {destinations.map((place) => (
                        <article className="destinationCard" key={place.id}>
                            {place.image ? (
                                <img
                                    className="destinationImage"
                                    src={place.image}
                                    alt={place.name}
                                    loading="lazy"
                                />
                            ) : (
                                <div className="destinationImagePlaceholder">
                                    Image unavailable
                                </div>
                            )}

                            <div className="destinationInfo">
                                <h3>{place.name}</h3>

                                <p>{place.description}</p>

                                {place.latitude !== null &&
                                    place.longitude !== null && (
                                        <small>
                                            Location: {place.latitude.toFixed(4)},{" "}
                                            {place.longitude.toFixed(4)}
                                        </small>
                                    )}

                                <a
                                    href={place.wikipediaUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Explore More
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
};

