import m from 'mithril';
import { Icon } from './icon';

export function iconFromState(state) {
    switch (state) {
        case 'clear-night':
            return 'weather-clear-night';
        case 'cloudy':
            return 'weather-cloudy';
        case 'fog':
            return 'weather-fog';
        case 'hail':
            return 'weather-hail';
        case 'lightning':
            return 'weather-lightning';
        case 'lightning - rainy':
            return 'weather-lightning-raining';
        case 'partlycloudy':
            return 'weather-partlycloudy';
        case 'pouring':
            return 'weather-pouring';
        case 'rainy':
            return 'weather-rainy';
        case 'snowy':
            return 'weather-snowy';
        case 'snowy - rainy':
            return 'weather-snowy-rainy';
        case 'sunny':
            return 'weather-sunny';
        case 'windy':
            return 'weather-windy';
        case 'windy - variant':
            return 'weather-windy-variant';
        case 'exceptional':
            return 'weather-exceptional';
    }
}

export class WeatherForcast {
    convertForecast(forecasts) {
        return forecasts.map((forecast, i) => {
            let dayDescription = 'Today';
            if (i === 1) {
                dayDescription = 'Tomorrow';
            } else if (i > 1) {
                dayDescription = this.dayString(new Date(forecast.datetime).getDay())
            }

            return {
                low: forecast.templow,
                high: forecast.temperature,
                icon: iconFromState(forecast.condition),
                dayDescription,
            };
        }).slice(0, 3);
    }

    dayString(day) {
        switch (day) {
            case 0: return 'Sunday';
            case 1: return 'Monday';
            case 2: return 'Tuesday';
            case 3: return 'Wednesday';
            case 4: return 'Thursday';
            case 5: return 'Friday';
            case 6: return 'Saturday';
        }
    }

    view({ attrs: { attributes } }) {
        const days = this.convertForecast(attributes.forecast).map((day, i) =>
            <div>
                <div class="forecast-day-title">{day.dayDescription}:</div>
                <Icon icon={day.icon}></Icon>
                <div class="forecast-temp">
                    {day.high} / <span class="forecast-low">{day.low}</span>
                </div>
            </div>)
        return <div class="weather-forecast section-container">
            <div class="forecast">{days[0]}</div>
            <div class="forecast center">{days[1]}</div>
            <div class="forecast">{days[2]}</div>

        </div>
    }
}