import React from 'react';
import TwitchClient from 'twitch';
import ChatClient from 'twitch-chat-client';
import { EventEmitter } from 'events';

const clientId = 'lt2564nzgl0z1k9352w61hurqo47xh';
const ludwigId = '40934651';

class LudClient extends EventEmitter {
	async connect(accessToken) {
		if (this.chatClient) {
			await this.chatClient.quit();
		}
		this.accessToken = accessToken;
		this.twitchClient = TwitchClient.withCredentials(clientId, this.accessToken);
		this.user = await this.twitchClient.kraken.users.getMe();
		this.chatClient = ChatClient.forTwitchClient(this.twitchClient, { channels: [this.user.name] });
		this.chatClient.onConnect(() => {
			this.emit('status', true);
		});
		this.chatClient.onDisconnect(() => {
			console.log(arguments);
			this.emit('status', false);
		});
		console.log(this.user);
		this.badges = await this.twitchClient.badges.getChannelBadges(this.user.id, true);
		this.chatClient.onPrivmsg((channel, user, message, msg) => {
			// console.log(msg);
			this.emit('msg', {
				user,
				text: message,
				info: msg
			});
		});
		await this.chatClient.connect();
	}
}
export default React.createContext();
export const client = new LudClient();