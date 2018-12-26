module.exports = {
  // Command to look for
  ping: {
    // Does it require the prefix to run
    reqPrefix: false, 
    // Should the bot '@' the person who called it.
    mention: false,
    // What to reply ('<' '>' around links to keep them from auto-embeding, '\n' for newline)
    reply: 'Pong!'
  },
  merch: {
    reqPrefix: true,
    mention: false,
    reply: '<https://streamlabs.com/genx_es/#/merch>'
  },
  streamers: {
    reqPrefix: true,
    mention: false,
    reply: 'LANDMIN3: <https://twitch.tv/landmin3> \nLish <https://twitch.tv/lovedalish> \nRejectz <https://twitch.tv/rejectzlive>'
  },
  games: {
    reqPrefix: true,
    mention: false,
    reply: 'Rocket League \nOverwatch \nPUBG'
  },
  social: {
    reqPrefix: true,
    mention: false,
    reply: 'Twitter: <https://twitter.com/GenX_eSports> \nTwitch: <https://twitch.tv/genx_es>'
  },
  rules: {
    reqPrefix: true,
    mention: false,
    reply: '- Racism is not allowed under any circumstances. \n- Keep any self advertisement in #self-advertising. \n- Respect the staff and their decisions. \n- No politics. \n- No bullying. \n- No spam. \n- No pornographic material or nudity. \n- No illegal activity \n- Keep all other NSFW posts to #nsfw please.'
  },
  sponsors: {
    reqPrefix: true,
    mention: false,
    reply: 'Under maintenance.'
  }
};