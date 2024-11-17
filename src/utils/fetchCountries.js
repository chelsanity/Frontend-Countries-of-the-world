export const fetchCountries = async () => {
    const response = await fetch('https://restcountries.com/v3.1/all');
    if (!response.ok) throw new Error('Failed to fetch countries');
    return response.json();
};
