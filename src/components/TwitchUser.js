import React from 'react';
import TwitchContext from '../twitch';

const colors = ["#FF0000", "#0000FF", "#008000", "#B22222", "#FF7F50", "#9ACD32", "#FF4500", "#2E8B57", "#DAA520", "#D2691E", "#5F9EA0", "#1E90FF", "#FF69B4", "#8A2BE2", "#00FF7F"];
function getColor(user) {
	if (user.color) return user.color;
	return colors[parseInt(user.userId) % colors.length];
}

export default function TwitchUser({ user }) {
	const twitch = React.useContext(TwitchContext);
	const badgeArray = [];
	for (let badge of user.badges) {
		badgeArray.push(
			<span key={badge[0]} style={{
				width: 18,
				height: 18,
				backgroundSize: 18,
				backgroundPosition: 'center',
				backgroundImage: `url(${twitch.client.badges.getBadgeSet(badge[0]).getVersion(badge[1]).getImageUrl(1)}`,
				borderRadius: '0.2rem',
				display: 'inline-block',
				margin: '0 .3rem .2rem 0',
				verticalAlign: 'middle',
			}} />
		);

	}

	return (
		<span style={{ color: getColor(user), fontWeight: 'bold' }}>
			{badgeArray}
			{user.displayName}
		</span>
	)
}