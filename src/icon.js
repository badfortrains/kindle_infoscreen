import {
    mdiWeatherCloudy, mdiAlertDecagram, mdiFire, mdiPower, mdiWeatherNight, mdiWeatherFog, mdiWeatherHail, mdiWeatherLightning, mdiWeatherLightningRainy, mdiWeatherPartlyCloudy,
    mdiWeatherPouring, mdiWeatherRainy, mdiWeatherSnowy, mdiWeatherSnowyRainy, mdiWeatherSunny, mdiWeatherWindy, mdiWeatherWindyVariant, mdiWeatherHurricane,
    mdiArrowLeft, mdiBlinds, mdiBlindsOpen, mdiLightbulbMultiple, mdiLightbulbMultipleOff, mdiArrowUpBoldCircleOutline, mdiArrowDownBoldCircleOutline,
    mdiTriangleOutline, mdiFan, mdiFanOff
} from '@mdi/js';
import m from 'mithril';
import {WEATHER_ICON_MAP} from './weather_svg'

export class Icon {
    view(vnode) {
        const iconName = vnode.attrs.icon;
        const weatherIcon = WEATHER_ICON_MAP.get(iconName);
        if (weatherIcon) {
            return <div class="m-icon">
            <svg viewBox="0 0 100 100" >
                <path d={weatherIcon} />
            </svg >
        </div >
        }
        const icon = this.getIcon(iconName);
        return <div class="m-icon">
            {icon === mdiAlertDecagram ? iconName: ''}
            <svg viewBox="0 0 24 24" >
                <path d={icon} />
            </svg >
        </div >
    }

    getWeatherIcon(name) {

    }

    getIcon(name) {
        switch (name) {
            case 'triangle-outline':
                return mdiTriangleOutline;
            case 'triangle-outline-flipped':
                return 'M12,22L1,3H23M12,18L19.53,5H4.47';
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
            case 'fan':
                return mdiFan;
            case 'fan-off':
                return mdiFanOff;
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