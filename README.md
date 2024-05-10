# NesTetrisLeaderboard

An attempt to build a NES Tetris leaderboard with features like:
- Searching
- Advanced Filtering (WIP)
- Player Page (WIP)
- Explanation of Terms (WIP)
- Leaderboards for all Categories (WIP)

## Credits
The NES Tetris Leaderboard is a [google sheet](https://docs.google.com/spreadsheets/d/1ZBxkZEsfwDsUpyire4Xb16er36Covk7nhR8BN_LPodI/edit#gid=907672507) maintained by the community. The data is fetched directly from there, and sanitized. Without this sheet this Leaderboard cannot exist.

### Rate Limit
The access to the google sheet api is limited to 300 requests per Minute.
A single visit requires 1 request per Leaderboard,
and one each for looking at one note and watching one proof. So 300 should be plenty, as the google sheet leaderbaord is currently visited by no more than 6 people at once.

If this get popular and the limit is exceeded, please contact me, and i will work something out.  


### Additional planned Stuff
- Proof
  - Proof should be watchable/viewable embedded.
  - No longer existing proof should be checked with Wayback machine.
- Score Colorization and Font to match Sheet
- Dark Mode/Light Mode
- Player Page
  - Show player and scores over various leaderbaords
  - Maybe get infos from [liquipedia.net](https://liquipedia.net/tetris)
- Visual Stuff
  - Maybe falling tetris blocks parallax effect while scrolling?
  - Allow switching of Leaderboards via tabs


