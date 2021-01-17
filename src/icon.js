import { mdiWeatherPartlyCloudy, mdiWeatherCloudy, mdiAlertDecagram } from '@mdi/js';
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
            case 'weather-partly-cloudy':
                return mdiWeatherPartlyCloudy;
            case 'weather-cloudy':
                return mdiWeatherCloudy;
            default:
                return mdiAlertDecagram
        }

    }
}