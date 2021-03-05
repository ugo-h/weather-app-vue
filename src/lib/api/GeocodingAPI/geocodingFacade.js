import { Coordinates } from '../../Coordinates';
import { assembleLocation } from '../../lib';

export function formatGeocodingResponse(results) {
    return results.map(result => {
        const { geometry, components, formatted } = result;
        const coordinates = new Coordinates(geometry.lat, geometry.lng);
        return {
            coordinates,
            location: assembleLocation(components),
            formatted
        };
    });
}
