import React from 'react';
import Country from './Country';

const Countries = ({ countries }) => {
    return (
        <div className="countries-list">
            {countries.length > 0 ? (
                countries.map((country) => (
                    <Country key={country.cca3} country={country} />
                ))
            ) : (
                <p>No countries match your filters.</p>
            )}
        </div>
    );
};

export default Countries;
