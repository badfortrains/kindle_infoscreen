import m from 'mithril';
import { token, wifi, address, media_sources, groupname, refreshinterval } from './config.json';
import { Icon } from './icon';

export class Thermostat {
    iconFromState(state) {
        switch (state) {
            case 'clear - night':
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

    enableHeat(climateEntity) {
        if (climateEntity.state !== 'off') {
            return;
        }
        this.setHvacMode(climateEntity, 'heat');
        m.redraw();
    }

    disableHeat(climateEntity) {
        if (climateEntity.state === 'off') {
            return;
        }
        this.setHvacMode(climateEntity, 'off');
        m.redraw();
    }

    setHvacMode(climateEntity, hvac_mode) {
        m.request({
            method: 'POST',
            url: `${address}/api/services/climate/set_hvac_mode`,
            headers: { authorization: 'Bearer ' + token },
            data: {
                entity_id: climateEntity.entity_id,
                hvac_mode,
            },
        });
        const idleHeat = climateEntity.attributes.temperature > climateEntity.attributes.current_temperature ? 'heat' : 'idle';
        const hvac_action = hvac_mode === 'off' ? 'off' : idleHeat;
        climateEntity.attributes.hvac_action = hvac_action;
        climateEntity.state = hvac_mode;
    }

    setTemp(climateEntity, change) {
        const newTemp = climateEntity.attributes.temperature + change;
        m.request({
            method: 'POST',
            url: `${address}/api/services/climate/set_temperature`,
            headers: { authorization: 'Bearer ' + token },
            data: {
                entity_id: climateEntity.entity_id,
                temperature: newTemp,
            },
        });
        climateEntity.attributes.temperature = newTemp;
        m.redraw();
    }

    view({ attrs: { climateEntity, weatherEntity } }) {
        return <div>
            <div class="climate-outside">
                <Icon class="x-large" icon={this.iconFromState(weatherEntity.state)}></Icon>
                <div class="climate-label">outside</div>
                <div class="climate-temp">{weatherEntity.attributes.temperature}°</div>
                <div class="climate-temp-sub-label">
                    Humidity {weatherEntity.attributes.humidity}%
                </div>
            </div>
            <div class="climate-inside">
                <div class="climate-label">inside</div>
                <div class="climate-temp">{climateEntity.attributes.current_temperature}°</div>
                <div>
                    <button onclick={() => this.enableHeat(climateEntity)}
                        style="margin-right: 16px"
                        class={climateEntity.state === 'off' ? 'disabled m-icon-medium ' : 'm-icon-medium '}>
                        <Icon icon="fire"></Icon>
                    </button>
                    <button onclick={() => this.disableHeat(climateEntity)} class="m-icon-medium disabled">
                        <Icon icon="power"></Icon>
                    </button>
                </div>
            </div>
            <div class="climate-target">
                <button onclick={() => this.setTemp(climateEntity, 1)}>
                    <div class="triangle-up"></div>
                </button>
                <div class="climate-label">set to</div>
                <div class="climate-temp">{climateEntity.attributes.temperature}°</div>
                <div class="climate-temp-sub-label">{climateEntity.attributes.hvac_action}</div>
                <button onclick={() => this.setTemp(climateEntity, -1)}>
                    <div class="triangle-down"></div>
                </button>
            </div>
        </div>
    }
}