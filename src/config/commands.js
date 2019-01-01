module.exports = {
  // Command to look for
  ping: {
    // Does it require the prefix to run
    requiresPrefix: false, 
    // Should the bot '@' the person who called it.
    mentionUser: false,
    // What to reply ('<' '>' around links to keep them from auto-embeding, '\n' for newline)
    reply: 'Pong!'
  },
  merch: {
    requiresPrefix: true,
    mentionUser: false,
    reply: '<https://streamlabs.com/genx_es/#/merch>'
  },
  streamers: {
    requiresPrefix: true,
    mentionUser: false,
    reply: 'LANDMIN3: <https://twitch.tv/landmin3> \nLish <https://twitch.tv/lovedalish> \nRejectz <https://twitch.tv/rejectzlive>'
  },
  games: {
    requiresPrefix: true,
    mentionUser: false,
    reply: 'Rocket League \nOverwatch \nPUBG'
  },
  social: {
    requiresPrefix: true,
    mentionUser: false,
    reply: 'Twitter: <https://twitter.com/GenX_eSports> \nTwitch: <https://twitch.tv/genx_es>'
  },
  rules: {
    requiresPrefix: true,
    mentionUser: false,
    reply: '- Racism is not allowed under any circumstances. \n- Keep any self advertisement in #self-advertising. \n- Respect the staff and their decisions. \n- No politics. \n- No bullying. \n- No spam. \n- No pornographic material or nudity. \n- No illegal activity \n- Keep all other NSFW posts to #nsfw please.'
  },
  sponsors: {
    requiresPrefix: true,
    mentionUser: false,
    reply: 'Under maintenance.'
  }
};