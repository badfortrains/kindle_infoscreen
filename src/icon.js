import {
    mdiWeatherCloudy, mdiAlertDecagram, mdiFire, mdiPower, mdiWeatherNight, mdiWeatherFog, mdiWeatherHail, mdiWeatherLightning, mdiWeatherLightningRainy, mdiWeatherPartlyCloudy,
    mdiWeatherPouring, mdiWeatherRainy, mdiWeatherSnowy, mdiWeatherSnowyRainy, mdiWeatherSunny, mdiWeatherWindy, mdiWeatherWindyVariant, mdiWeatherHurricane,
    mdiArrowLeft, mdiBlinds, mdiBlindsOpen, mdiLightbulbMultiple, mdiLightbulbMultipleOff, mdiArrowUpBoldCircleOutline, mdiArrowDownBoldCircleOutline,
    mdiTriangleOutline
} from '@mdi/js';
import m from 'mithril';

export class Icon {
    view(vnode) {
        const icon = this.getIcon(vnode.attrs.icon);
        return <div class="m-icon">
            {icon === mdiAlertDecagram ? vnode.attrs.icon : ''}
            <svg viewBox="0 0 24 24" >
                <path d={icon} />
            </svg >
        </div >
    }

    getIcon(name) {
        switch (name) {
            case 'triangle-outline':
                return mdiTriangleOutline;
            case 'arrow-up-bold-circle-outline':
                return mdiArrowUpBoldCircleOutline;
            case 'arrow-down-bold-circle-outline':
                return mdiArrowDownBoldCircleOutline
            case 'blinds':
                return mdiBlinds;
            case 'blinds-open':
                return mdiBlindsOpen;
            case 'lightbulb-multiple':
                return mdiLightbulbMultiple;
            case 'lightbulb-multiple-off':
                return mdiLightbulbMultipleOff;
            case 'fire':
                return mdiFire;
            case 'power':
                return mdiPower;
            case 'weather-clear-night':
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