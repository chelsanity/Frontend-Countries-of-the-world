import React, { useEffect, useState } from 'react';
import Countries from './Countries';
import { fetchCountries } from '../utils/fetchCountries';

const App = () => {
    const [countries, setCountries] = useState([]);
    const [filter, setFilter] = useState({
        continent: 'All',
        subregion: '',
        topPopulation: false,
        topArea: false,
        alphabetical: false,
    });

    // Fetch data from the API when the app loads
    useEffect(() => {
        const loadCountries = async () => {
            try {
                const data = await fetchCountries();
                setCountries(data);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        loadCountries();
    }, []);

    // Filter the countries based on the selected filters
    const getFilteredCountries = () => {
        let filteredCountries = countries;

        // Filter by continent
        if (filter.continent !== 'All') {
            if (filter.continent === 'North America') {
                filteredCountries = filteredCountries.filter(
                    (country) => country.subregion === 'North America'
                );
            } else if (filter.continent === 'South America') {
                filteredCountries = filteredCountries.filter(
                    (country) => country.subregion === 'South America'
                );
            } else {
                filteredCountries = filteredCountries.filter(
                    (country) =>
                        country.continents &&
                        country.continents[0] === filter.continent
                );
            }
        }

        // Filter by subregion
        if (filter.subregion) {
            filteredCountries = filteredCountries.filter(
                (country) => country.subregion === filter.subregion
            );
        }

        // Top 10 by population
        if (filter.topPopulation) {
            filteredCountries = [...filteredCountries]
                .sort((a, b) => b.population - a.population) // Sort descending by population
                .slice(0, 10); // Take the top 10
        }

        // Top 10 by area
        if (filter.topArea) {
            filteredCountries = [...filteredCountries]
                .sort((a, b) => b.area - a.area) // Sort descending by area
                .slice(0, 10); // Take the top 10
        }

        // Sort alphabetically
        if (filter.alphabetical) {
            filteredCountries = filteredCountries.sort((a, b) =>
                a.name.common.localeCompare(b.name.common)
            );
        }

        return filteredCountries;
    };

    const filteredCountries = getFilteredCountries();

    // Updated handleFilterChange
    const handleFilterChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFilter((prev) => {
            const updatedFilter = {
                ...prev,
                [name]: type === 'checkbox' ? checked : value,
            };

            // Clear subregion if continent is selected
            if (name === 'continent') {
                updatedFilter.subregion = '';
            }

            // Clear continent if subregion is selected
            if (name === 'subregion') {
                updatedFilter.continent = 'All';
            }

            // Ensure Top 10 filters don't conflict
            if (name === 'topPopulation') {
                updatedFilter.topArea = false;
            }
            if (name === 'topArea') {
                updatedFilter.topPopulation = false;
            }

            return updatedFilter;
        });
    };

    return (
        <div className="app-container">
            <h1>Countries of the World</h1>

            {/* Filters Section */}
            <div className="filters">
                <h2>Filter & Sort Countries</h2>

                <div>
                    <label htmlFor="continent">By Continent</label>
                    <select
                        id="continent"
                        name="continent"
                        value={filter.continent}
                        onChange={handleFilterChange}
                    >
                        <option value="All">All</option>
                        <option value="Antarctica">Antarctica</option>
                        <option value="North America">North America</option>
                        <option value="South America">South America</option>
                        <option value="Europe">Europe</option>
                        <option value="Africa">Africa</option>
                        <option value="Asia">Asia</option>
                        <option value="Oceania">Oceania</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="subregion">By Subregion</label>
                    <select
                        id="subregion"
                        name="subregion"
                        value={filter.subregion}
                        onChange={handleFilterChange}
                    >
                        <option value="">Choose region</option>
                        <option value="Caribbean">Caribbean</option>
                        <option value="Western Europe">Western Europe</option>
                        <option value="Western Africa">Western Africa</option>
                        <option value="Central Europe">Central Europe</option>
                        <option value="Eastern Asia">Eastern Asia</option>
                        <option value="Polynesia">Polynesia</option>
                        <option value="Northern Africa">Northern Africa</option>
                        <option value="Southern Europe">Southern Europe</option>
                        <option value="South-Eastern Asia">South-Eastern Asia</option>
                        <option value="North America">North America</option>
                        <option value="Middle Africa">Middle Africa</option>
                        <option value="Micronesia">Micronesia</option>
                        <option value="Southeast Europe">Southeast Europe</option>
                        <option value="Western Asia">Western Asia</option>
                        <option value="Northern Europe">Northern Europe</option>
                        <option value="Melanesia">Melanesia</option>
                        <option value="Central Asia">Central Asia</option>
                        <option value="Southern Asia">Southern Asia</option>
                        <option value="South America">South America</option>
                        <option value="Australia and New Zealand">
                            Australia and New Zealand
                        </option>
                        <option value="Central America">Central America</option>
                        <option value="Eastern Africa">Eastern Africa</option>
                    </select>
                </div>

                <div>
                    <label>
                        <input
                            type="checkbox"
                            name="topPopulation"
                            checked={filter.topPopulation}
                            onChange={handleFilterChange}
                        />
                        Top 10 by Population
                    </label>
                </div>

                <div>
                    <label>
                        <input
                            type="checkbox"
                            name="topArea"
                            checked={filter.topArea}
                            onChange={handleFilterChange}
                        />
                        Top 10 by Area
                    </label>
                </div>

                <div>
                    <label>
                        <input
                            type="checkbox"
                            name="alphabetical"
                            checked={filter.alphabetical}
                            onChange={handleFilterChange}
                        />
                        Sort Alphabetically
                    </label>
                </div>
            </div>

            {/* Render Filtered Countries */}
            <Countries countries={filteredCountries} />
        </div>
    );
};

export default App;
