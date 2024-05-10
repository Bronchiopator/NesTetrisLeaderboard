# NesTetrisLeaderboard

An attempt to build a NES Tetris leaderboard with features like:
- Searching
- Advanced Filtering (WIP)
- Player Page (WIP)
- Explanation of Terms (WIP)
- Leaderboards for all Categories (WIP)

Currently implemented NTSC 0-19 (Main leaderboard)

## Credits
The NES Tetris Leaderboard is a [google sheet](https://docs.google.com/spreadsheets/d/1ZBxkZEsfwDsUpyire4Xb16er36Covk7nhR8BN_LPodI/edit#gid=907672507) maintained by the community. The data is fetched directly from there, and sanitized. Without this sheet this leaderboard cannot exist.

### Rate Limit
The access to the google sheet API is limited to 300 requests per Minute.
A single visit requires 2 request per leaderboard,
one for the data, and a separate one for the notes (damn you merged cells).
One additional request for watching one proof. So 300 should be plenty, as the google sheet leaderboard is currently visited by no more than 6 people at once.

If this get popular and the limit is exceeded, please contact me, and i will work something out.  


### Additional planned Stuff
- Proof
  - Proof should be watchable/viewable embedded.
  - No longer existing proof should be checked with Wayback machine.
- Score colorization and font to match Sheet
- Dark Mode/Light Mode
- Player Page
  - Show player and scores over various leaderboards
  - Maybe get info from [liquipedia.net](https://liquipedia.net/tetris)
- Visual Stuff
  - Maybe falling tetris blocks parallax effect while scrolling?
  - Allow switching of Leaderboards via tabs
- Aggressive caching of proof- link and label 
  - Score and player name as primary key
  - Should easily fit in local storage 
  - Additionally distribute cache in file
    - Could also mitigate a lot of requests
    - Would have to be updated manually by me
    - Since data should not change very often this could be a decent workaround 
- For fun switch fully to angular signals. And yeet zone.js
