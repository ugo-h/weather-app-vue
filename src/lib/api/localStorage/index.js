import { Coordinates } from '../../lib';
const ADDRESS = 'savedLocations';

export default {
    saveLocations: (arr) => {
        localStorage.setItem(ADDRESS, JSON.stringify(arr));
    },
    getLocations: () => {
        let JSONData = localStorage.getItem(ADDRESS);
        if (!JSONData) return null;
        const arr = JSON.parse(JSONData);
        const formatted = arr.map(location => ({
            ...location,
            coordinates: new Coordinates(
                location.coordinates.lat,
                location.coordinates.lng,
            )
        }))
        return formatted;
    }
}
