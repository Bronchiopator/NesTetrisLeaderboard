# NesTetrisLeaderboard

An attempt to build a NES Tetris leaderboard with features like:
- Searching
- Advanced Filtering (WIP)
- Player Page (WIP)
- Explanation of Terms (WIP)
- Leaderboards for all Categories (WIP)

Currently implemented NTSC 0-19 (Main leaderboard)

Site: https://bronchiopator.github.io/NesTetrisLeaderboard/

## Credits
The NES Tetris Leaderboard is a [google sheet](https://docs.google.com/spreadsheets/d/1ZBxkZEsfwDsUpyire4Xb16er36Covk7nhR8BN_LPodI/edit#gid=907672507) maintained by the community. The data is fetched directly from there, and sanitized. Without this sheet this leaderboard cannot exist.

## Rate Limit
The access to the google sheet API is limited to 300 requests per minute.
A single visit requires 2 request per leaderboard,
one for the data, and a separate one for the notes (damn you merged cells).
One additional request for watching a single proof. So 300 should be plenty, as the google sheet leaderboard is currently visited by no more than 6 people at once.

If this get popular and the limit is exceeded, please contact me, and i will work something out.  

## Development and Deployment Setup 

### Google API Key
This project needs its own API keys, since it uses the [Google Sheets API](https://developers.google.com/sheets/api/guides/concepts), to access the [google sheet leaderboard](https://docs.google.com/spreadsheets/d/1ZBxkZEsfwDsUpyire4Xb16er36Covk7nhR8BN_LPodI/edit#gid=907672507)

You have to provide your own API keys.

### :warning: **The Project wont compile otherwise**

### Getting your own API key
Issuing your own API key is free and can be done under 
https://console.cloud.google.com/apis/credentials?hl=en&project=[projectname]
after creating your own project. Adding a payment service is not required, but the key has a 'requests per minute' limit. The exact limit and further documentation can be found [here](https://developers.google.com/sheets/api/limits).

The Angular builder is configured to swap between a development and a production API key. The file with the development key is `.gitignore`'d to prevent the less restricted API key from leaking.


### Deployment Key

I recommend restricting the deployment key to just the google sheet API 
and to only work from your website, to prevent hijacking.
If this is done correctly the gitguardian warning mail can be ignored.

The deployment key in the [file at `src/app/api-constants/api-key.ts`](src/app/api-constants/api-key.ts) is limited to my github pages deploy URL and <ins>wont work locally or on any other site</ins>.

Just insert your own key at the line `export const apiKey: string = [Your deployment api key here]`

### Development Key

I recommend creating a separate, less restrictive, development key,
that should never be published. You have to provide this key to the project to run locally.

### :warning: **The Project wont compile otherwise**

It should be  added in a file at `src/app/api-constants/api-key-developement.ts`. Insert the key in the file like this: `export const apiKey: string = [Your developement api key here]`.
The builder will automatically use the development key when running locally and replace it when building for production.

Otherwise it will throw the following error:

`An unhandled exception occurred: The [projectpath]/src/app/api-constants/api-key-developement.ts path in file replacements does not exist.`

## Additional planned Stuff
- Proof
  - Proof should be watchable/viewable embedded.
  - No longer existing proof should be checked with Wayback machine.
- Score colorization and font to match Sheet
- Dark Mode/Light Mode
- Player Page
  - Show player and scores over various leaderboards
  - Maybe get info from [liquipedia.net](https://liquipedia.net/tetris)?
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
