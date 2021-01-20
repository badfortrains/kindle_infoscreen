import m from 'mithril';
import { token, wifi, address, media_sources, groupname, refreshinterval } from './config.json';
import { Icon } from './icon';
import { playlistConfig } from './playlist_config';

export class PlaylistBrowser {
    playPlaylist(playlistId) {
        m.request({
            method: 'POST',
            url: `${address}/api/services/spotcast/start`,
            headers: { authorization: 'Bearer ' + token },
            data: {
                device_name: 'House group',
                random_song: true,
                uri: playlistId,
            },
        });
        this.onExit();
    }
    oninit({ attrs: { onExit, mediaPlayerId } }) {
        this.onExit = onExit;
        this.mediaPlayerId = mediaPlayerId;
    }
    view({ attrs: { onExit } }) {
        return <div>
            <div>
                <button class="m-icon-medium" onclick={() => onExit()}>
                    <Icon icon="arrow-left"></Icon>
                </button>
            </div>
            {
                playlistConfig.map((config, index) => {
                    return <div class={index % 2 === 0 ? 'playlist-item-first playlist-item' : 'playlist-item'}
                        onclick={() => this.playPlaylist(config.id)}>
                        <img src={config.icon}></img>
                        <img src={config.icon}></img>
                        <img src={config.icon}></img>
                        <div class="playlist-item-title">{config.displayName}</div>
                    </div>
                })
            }
        </div>
    }
}