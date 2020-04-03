# Ludboard

A custom dashboard for the streamer [ludwig](https://www.twitch.tv/ludwig/). Written with React and NW.js.

## Installation Instructions

1. [Download the latest release](https://github.com/ottomated/ludboard/releases)
2. Unzip the folder
3. Run `ludboard.exe`

## Modules

### Coin Flip

A clone of [Google's coin flip](https://www.google.com/search?q=flip+a+coin), reverse engineered from their obfuscated source and spritesheet. Configurable for different flip times, default is 2500ms.

### Physics Flip

A custom coin flip physics simulation written in [Godot](https://godotengine.org/) and embedded as HTML5. Should be fair, because the side of the coin that starts facing up is randomized (I think there's an 80% chance or so of the coin landing on the same side it starts).

### 50 / 50

Basically a poll that automatically ends after one minute. Uses `react-confetti` to celebrate.

### Amazon Stream

Detects amazon links in twitch chat, parses the html of the linked page, and adds links to a table.


## Future plans

- Customize coin flip sprites
- Add subscriber filter to amazon stream
- Combine amazon stream with song submission (auto-detect copyright, use youtube api to pull video info)
- Add some kind of greenscreen for OBS compatibility
- YLYL module? Global shortcut for incrementing and decrementing scores
- Moderator client, to approve/deny amazon links (low priority because would require hosting)
- Configure 50/50 timer length
- Stress test for 7k viewer stream
- Contest module, show custom bracket and two images of submissions next to each other + integrated poll