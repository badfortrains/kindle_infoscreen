import m from 'mithril';
import { token, wifi, address, media_sources, groupname, refreshinterval } from './config.json';
import './style.css';
import { Icon } from './icon';
import { Thermostat } from './thermostat'
import { PlaylistBrowser } from './playlist_browser';
import { WeatherForcast } from './weather_forcast';
const errdiv = document.createElement('div');
const container = document.createElement('div');

document.body.appendChild(errdiv);
document.body.appendChild(container);

var Entities = {
  switches: [],
  lights: [],
  scenes: [],
  sensors: [],
  media_players: [],
  climate: [],
  weather: [],
  loadEntities: function () {
    // document.getElementById('error').textContent = 'loading...';
    m.request({
      url: `${address}/api/states`,
      headers: { authorization: 'Bearer ' + token },
    }).then((result) => {
      // document.getElementById('error').textContent = 'got result ...';
      // get entities of the watch group
      var entities = result.filter(({ entity_id }) => entity_id === `group.${groupname}`)[0]
        .attributes.entity_id;
      // get the states of these entities
      Entities.switches = [];
      entities
        .filter((entity_id) => entity_id.startsWith('switch'))
        .forEach((entity_id) => {
          Entities.switches.push(result.filter((item) => item.entity_id === entity_id)[0]);
        });
      Entities.lights = [];
      entities
        .filter((entity_id) => entity_id.startsWith('light'))
        .forEach((entity_id) => {
          Entities.lights.push(result.filter((item) => item.entity_id === entity_id)[0]);
        });
      Entities.scenes = [];
      entities
        .filter((entity_id) => entity_id.startsWith('scene'))
        .forEach((entity_id) => {
          Entities.scenes.push(result.filter((item) => item.entity_id === entity_id)[0]);
        });
      Entities.sensors = [];
      entities
        .filter((entity_id) => entity_id.startsWith('sensor'))
        .forEach((entity_id) => {
          Entities.sensors.push(result.filter((item) => item.entity_id == entity_id)[0]);
        });
      Entities.media_players = [];
      entities
        .filter((entity_id) => entity_id.startsWith('media_player'))
        .forEach((entity_id) => {
          Entities.media_players.push(result.filter((item) => item.entity_id == entity_id)[0]);
        });
      Entities.climate = [];
      entities
        .filter((entity_id) => entity_id.startsWith('climate'))
        .forEach((entity_id) => {
          Entities.climate.push(result.filter((item) => item.entity_id == entity_id)[0]);
        });
      Entities.weather = [];
      entities
        .filter((entity_id) => entity_id.startsWith('weather'))
        .forEach((entity_id) => {
          Entities.weather.push(result.filter((item) => item.entity_id == entity_id)[0]);
        });
      // document.getElementById('error').textContent = '';
    });
  },
};

class MediaPlayer {
  selectSource(entity_id, source) {
    if (source === 'Off') {
      m.request({
        method: 'POST',
        url: `${address}/api/services/media_player/turn_off`,
        headers: { authorization: 'Bearer ' + token },
        data: { entity_id: entity_id },
      });
    } else {
      m.request({
        method: 'POST',
        url: `${address}/api/services/media_player/select_source`,
        headers: { authorization: 'Bearer ' + token },
        data: { entity_id: entity_id, source: source },
      });
    }
  }
  view({ attrs: { attributes, entity_id, state, onBrowsePlaylists } }) {
    let name = attributes.friendly_name || entity_id;
    name = attributes.media_title || name;
    const artist = attributes.media_artist || '';

    if (!attributes.media_title) {
      state = 'off';
    }

    let sourceList = ['Off'];
    // custom filter for now
    if (media_sources && media_sources[entity_id]) {
      sourceList = sourceList.concat(media_sources[entity_id]);
    } else {
      sourceList = sourceList.concat(attributes.source_list);
    }

    const playlistButton = <div class="playlist-button" onclick={() => onBrowsePlaylists()}>
      <div>Playlists</div>
    </div>

    const mediaPlayerStyle = {
      'background-color': state == 'off' ? 'white' : 'black',
      'color': state == 'off' ? 'black' : 'white',
    };
    return <div class="media_player" style={mediaPlayerStyle}>
      {attributes.entity_picture ?
        <img src={address + attributes.entity_picture}></img> :
        ''
      }
      <div class="media_play_metadata">
        <div class="media-player-song">{name}</div>
        <div class="media-player-artist">{artist}</div>
      </div>

      <div class={state == 'off' ? 'media-play-playlist-section inverted' : 'media-play-playlist-section not-inverted'} >
        {playlistButton}
      </div>
    </div>
  }
}

class Sensor {
  view({ attrs: { attributes, entity_id, state } }) {
    var name = attributes.friendly_name || entity_id;
    var unit = attributes.unit_of_measurement ? ` ${attributes.unit_of_measurement}` : '';
    return m('.sensor', [m('.sensorname', name), m('.sensorvalue', state + unit)]);
  }
}

class Switch {
  view({ attrs: { attributes, entity_id, state } }) {
    const name = attributes.friendly_name || entity_id;
    const onclick = () => {
      m.request({
        method: 'POST',
        url: `${address}/api/services/switch/${state == 'on' ? 'turn_off' : 'turn_on'}`,
        headers: { authorization: 'Bearer ' + token },
        data: { entity_id: entity_id },
      });
      Entities.switches.find((item) => item.entity_id === entity_id).state =
        state == 'on' ? 'off' : 'on';
      // // Clear icon since we don't know what the toggled icon is and this way it will update
      // // once we get the new state.
      // attributes.icon = '';
      m.redraw();
    };

    let switchIcon = '';
    if (attributes.icon) {
      switchIcon = <Icon icon={attributes.icon.replace('mdi:', '')}></Icon>;
    }

    return <div class={state == 'on' ? 'switch' : 'switch inverted'} onclick={onclick}>
      {name}
      {switchIcon}
    </div>
  }
}

class Light {
  view({ attrs: { attributes, entity_id, state } }) {
    var name = attributes.friendly_name || entity_id;
    return m(
      '.switch',
      {
        style: {
          'background-color': state == 'on' ? 'black' : 'white',
          color: state == 'on' ? 'white' : 'black',
        },
        onclick: () => {
          m.request({
            method: 'POST',
            url: `${address}/api/services/light/${state == 'on' ? 'turn_off' : 'turn_on'}`,
            headers: { authorization: 'Bearer ' + token },
            data: { entity_id: entity_id },
          });
          Entities.lights.find((item) => item.entity_id === entity_id).state =
            state == 'on' ? 'off' : 'on';
          m.redraw();
        },
      },
      name
    );
  }
}

class Scene {
  view({ attrs: { attributes, entity_id, state = 'off' } }) {
    var name = attributes.friendly_name || entity_id;
    return m(
      '.switch',
      {
        style: {
          'background-color': state == 'on' ? 'black' : 'white',
          color: state == 'on' ? 'white' : 'black',
        },
        onclick: () => {
          m.request({
            method: 'POST',
            url: `${address}/api/services/scene/turn_on`,
            headers: { authorization: 'Bearer ' + token },
            data: { entity_id: entity_id },
          });
          // for feedback, turn switch on until next update
          Entities.scenes.find((item) => item.entity_id === entity_id).state = 'on';
          m.redraw();
        },
      },
      name
    );
  }
}

class Overlay {
  constructor() {
    this.visible = false;
  }
  toggle() {
    this.visible = !this.visible;
    m.redraw();
  }
  view({ attrs: { label }, children }) {
    var style = {
      'background-color': this.visible ? 'black' : 'white',
      color: this.visible ? 'white' : 'black',
    };
    return m('div', [
      m(
        '.overlaybutton',
        {
          style: style,
          onclick: () => {
            this.toggle();
          },
        },
        `${this.visible ? 'hide' : 'show'}${label ? ' ' + label : ''}`
      ),
      m('.overlay', { style: { display: this.visible ? 'block' : 'none' } }, children),
    ]);
  }
}

class Layout {
  oninit() {
    Entities.loadEntities();
    this.showPlaylistBrowser = false;
  }

  toggleShowPlaylists() {
    this.showPlaylistBrowser = !this.showPlaylistBrowser;
    m.redraw();
  }

  view() {
    const weather = Entities.weather[0];
    const climate = Entities.climate[0];
    const mediaPlayer = Entities.media_players[0];

    let thermostat = '';
    if (weather && climate) {
      thermostat = <Thermostat weatherEntity={weather} climateEntity={climate}></Thermostat>;
    }

    let forecast = '';
    if (weather) {
      forecast = <WeatherForcast {...weather}></WeatherForcast>
    }

    if (mediaPlayer && this.showPlaylistBrowser) {
      return <div class="thermostat">
        <PlaylistBrowser onExit={() => { this.toggleShowPlaylists() }} mediaPlayerId={mediaPlayer.entity_id}></PlaylistBrowser>
      </div>
    }

    return <div>
      {thermostat}
      {forecast}
      <div>
        {
          Entities.sensors.map((sensorData) => <Sensor {...sensorData}></Sensor>)
        }
      </div>
      <div class="switch-row">
        {Entities.switches.map((switchData) => <Switch {...switchData}></Switch>)}
        {Entities.lights.map((lightData) => <Light {...lightData}></Light>)}
        {Entities.scenes.map((sceneData) => <Scene {...sceneData}></Scene>)}
      </div>
      {
        Entities.media_players.map((mediaPlayerData) =>
          <MediaPlayer {...mediaPlayerData} onBrowsePlaylists={() => { this.toggleShowPlaylists() }}>
          </MediaPlayer>
        )
      }
      {
        wifi ? <Overlay label="wifi">
          <img src={wifi}></img>
        </Overlay> : ''
      }
    </div >
  }
}

m.mount(container, Layout);
// repeatedly poll the state
setInterval(Entities.loadEntities, refreshinterval * 1000);
