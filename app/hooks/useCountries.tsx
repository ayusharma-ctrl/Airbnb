import countries from 'world-countries';

// destructure and format the output
const formattedCountries = countries.map((country) => ({
    value: country.cca2,
    label: country.name.common,
    flag: country.flag,
    latlng: country.latlng,
    region: country.region,
}));

// hook have two function -  to get data of all the countries & data of a particular country
const useCountries = () => {
    const getAll = () => formattedCountries;

    const getByValue = (value: string) => {
        return formattedCountries.find((item) => item.value === value);
    }

    return {
        getAll,
        getByValue
    }
};

export default useCountries;