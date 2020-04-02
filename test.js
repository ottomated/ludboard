var links = require('./amazon-links.json');
var seenUsers = new Set();
links = [].concat.apply([], links.map(l => l.comments))
	.filter(comment => {
		let seen = seenUsers.has(comment.commenter._id);
		if (seen)
			return false;
		else {
			seenUsers.add(comment.commenter._id);
			return true;
		}
	})
	.filter(comment => comment.message.user_badges && comment.message.user_badges.find(b => b._id === 'subscriber'))
	.filter(comment => comment.message.body.includes('https://') && comment.message.body.includes('amazon'))
	.map(comment => ({
		text: comment.message.body,
		info: {
			userInfo: {
				displayName: comment.commenter.display_name,
				userId: comment.commenter._id,
				badges: comment.message.user_badges.map(badge => [badge._id, badge.version]),
			}
		}
	}));
console.log(JSON.stringify(links.slice(0, 50)));