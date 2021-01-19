import {
    mdiWeatherCloudy, mdiAlertDecagram, mdiFire, mdiPower, mdiWeatherNight, mdiWeatherFog, mdiWeatherHail, mdiWeatherLightning, mdiWeatherLightningRainy, mdiWeatherPartlyCloudy,
    mdiWeatherPouring, mdiWeatherRainy, mdiWeatherSnowy, mdiWeatherSnowyRainy, mdiWeatherSunny, mdiWeatherWindy, mdiWeatherWindyVariant, mdiWeatherHurricane,
    mdiArrowLeft
} from '@mdi/js';
import m from 'mithril';

export class Icon {
    view(vnode) {
        return <div class="m-icon">
            <svg viewBox="0 0 24 24" >
                <path d={this.getIcon(vnode.attrs.icon)} />
            </svg >
        </div >
    }

    getIcon(name) {
        switch (name) {
            case 'fire':
                return mdiFire;
            case 'power':
                return mdiPower;
            case 'weater-clear-night':
                return mdiWeatherNight;
            case 'weather-cloudy':
                return mdiWeatherCloudy;
            case 'weather-fog':
                return mdiWeatherFog;
            case 'weather-hail':
                return mdiWeatherHail;
            case 'weather-lightning':
                return mdiWeatherLightning;
            case 'weather-lightning-raining':
                return mdiWeatherLightningRainy
            case 'weather-partlycloudy':
                return mdiWeatherPartlyCloudy;
            case 'weather-pouring':
                return mdiWeatherPouring;
            case 'weather-rainy':
                return mdiWeatherRainy;
            case 'weather-snowy':
                return mdiWeatherSnowy;
            case 'weather-snowy-rainy':
                return mdiWeatherSnowyRainy;
            case 'weather-sunny':
                return mdiWeatherSunny;
            case 'weather-windy':
                return mdiWeatherWindy;
            case 'weather-windy-variant':
                return mdiWeatherWindyVariant;
            case 'weather-exceptional':
                return mdiWeatherHurricane;
            case 'arrow-left':
                return mdiArrowLeft;
            default:
                return mdiAlertDecagram
        }

    }
}