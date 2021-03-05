export function getFormattedCurrentWeather({ current }) {
    return {
        temp: {
            c: current.temp_c,
            f: current.temp_f
        },
        feelslike: {
            c: current.feelslike_c,
            f: current.feelslike_f
        },
        icon: current.condition.icon,
        summary: current.condition.text,
        humidity: current.humidity,
        wind: {
            vel: Math.round((current.wind_kph * 1000) / 3600),
            dir: current.wind_dir
        }

    };
}
