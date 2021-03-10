import { fetchGetJson } from '@/lib/lib';
import { geolocationApiKey } from '@/config/config';
import { Coordinates } from '../../lib';


const url = 'https://ipinfo.io';
const token = geolocationApiKey;


export const getLocation = async () => {
    const data = await fetchGetJson(url, { token: token });
    const filtered = (({ city, country, loc, timezone }) => {
        const coordinates = new Coordinates(loc);
        return {
            location: city + ', ' + country,
            country,
            coordinates,
            timezone
        }
    })(data);
    return filtered;
}
