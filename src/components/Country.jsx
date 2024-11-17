import React from 'react';

const Country = ({ country }) => {
    const { flags, name, capital, population, area, continents, subregion } = country;

    return (
        <div className="country-card">
            <div className="country-card-header">
                <img src={flags.svg} alt={`${name.common} flag`} />
                <h2>{name.common}</h2>
            </div>
            <p><strong>Official Name:</strong> {name.official}</p>
            <p><strong>Capital:</strong> {capital ? capital.join(', ') : 'N/A'}</p>
            <p><strong>Population:</strong> {population.toLocaleString()}</p>
            <p><strong>Area:</strong> {area.toLocaleString()} km²</p>
            <p><strong>Continent:</strong> {continents[0]}</p>
            <p><strong>Subregion:</strong> {subregion || 'N/A'}</p>
        </div>
    );
};

export default Country;
