import m from 'mithril';
import { token, wifi, address, media_sources, groupname, refreshinterval } from './config.json';
import { Icon } from './icon';
import { iconFromState } from './weather_forcast';
import { doUpdate } from './index';

export class Thermostat {
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
        const idleHeat = climateEntity.attributes.temperature > climateEntity.attributes.current_temperature ? 'heating' : 'idle';
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
        doUpdate();
    }

    view({ attrs: { climateEntity, weatherEntity, humidityEntity } }) {
        const heatState = climateEntity.attributes.hvac_action === 'off' ? 'Heat off' :
            climateEntity.attributes.hvac_action;
        return <div class="thermostat section-container">
            <div class="climate-outside">
                <div class="box-80">
                    <Icon class="x-large" icon={iconFromState(weatherEntity.state)}></Icon>
                </div>
                <div class="climate-label">outside</div>
                <div class="climate-temp">{weatherEntity.attributes.temperature}°</div>
                <div class="climate-temp-sub-label">
                    Humidity {weatherEntity.attributes.humidity}%
               </div>
            </div>
            <div class="climate-inside center">
                <div class="climate-label">inside</div>
                <div class="climate-temp">{climateEntity.attributes.current_temperature}°</div>
                <div class="climate-temp-sub-label">
                    Humidity {humidityEntity.state}%
               </div>
                <div class="climate-temp-sub-label-button">
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
                <div class="box-80">
                    <button onclick={() => this.setTemp(climateEntity, 1)} class="m-icon-medium temp-up">
                        <Icon icon="triangle-outline"></Icon>
                    </button>
                </div>
                <div class="climate-label">set to</div>
                <div class="climate-temp">{climateEntity.attributes.temperature}°</div>
                <div class="climate-temp-sub-label">{heatState}</div>
                <button onclick={() => this.setTemp(climateEntity, -1)} class="m-icon-medium temp-down climate-temp-sub-label-button">
                    <Icon icon="triangle-outline-flipped"></Icon>
                </button>
            </div>
        </div>
    }
}