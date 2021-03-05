import { fetchGetJson, Coordinates } from '../../lib';
import { weatherApiKey } from '../../../config/config';
import { getFormattedCurrentWeather } from './weatherFacade';

const url = 'https://api.weatherapi.com/v1';
const apiKey = weatherApiKey;

export const getWeather = async (location, lang) => {
    if (!(location instanceof Coordinates)) {
        throw new TypeError(`"location" must be of the type Coordinates, not "${typeof location}"`);
    }
    const data = await fetchGetJson(`${url}/current.json`, {
        q: location.toString(),
        key: apiKey,
        lang
    });
    if (data.error) return data;
    return getFormattedCurrentWeather(data);
}
