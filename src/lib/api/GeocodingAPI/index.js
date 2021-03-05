import { geocodingApiKey } from '../../../config/config';
import { Coordinates } from '../../Coordinates';
import { fetchGetJson, assembleLocation }  from '../../lib';
import { formatGeocodingResponse } from './geocodingFacade';

const url = 'https://api.opencagedata.com/geocode/v1/json';
const token = geocodingApiKey;

export async function getLocationList(q, options = {}) {
    const data = await fetchGetJson(url, {
        q,
        key: token,
        ...options
    });
    return formatGeocodingResponse(data.results);
}

export async function getStringFromCoordinates(coordinates, options) {
    if (!(coordinates instanceof Coordinates)) throw new Error('First argument must be of type "Coordinates"')
    const data = await fetchGetJson(url, {
        q: coordinates.toString(),
        key: token,
        ...options
    });
    const locationComponents = data.results[0].components;
    const location = assembleLocation(locationComponents);
    return location;
}
