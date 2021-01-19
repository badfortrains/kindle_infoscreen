import m from 'mithril';
import { token, wifi, address, media_sources, groupname, refreshinterval } from './config.json';
import { Icon } from './icon';
import { playlistConfig } from './playlist_config';

export class PlaylistBrowser {
    playPlaylist(playlistId) {
        m.request({
            method: 'POST',
            url: `${address}/api/services/media_player/play_media`,
            headers: { authorization: 'Bearer ' + token },
            data: {
                entity_id: this.mediaPlayerId,
                media_content_id: playlistId,
                media_content_type: 'playlist',
            },
        });
        m.request({
            method: 'POST',
            url: `${address}/api/services/media_player/shuffle_set`,
            headers: { authorization: 'Bearer ' + token },
            data: {
                entity_id: this.mediaPlayerId,
                shuffle: true,
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