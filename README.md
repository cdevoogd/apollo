# Apollo

A personalized Discord bot.

Currently, Apollo is a bot that needs to be self hosted to run on your server.

## Installation

First, you need to clone the repo.

```shell
git clone https://github.com/cdevoogd/apollo.git
```

Next, install the npm dependencies for Apollo.

```shell
npm install
```

## Config

To start, create a config folder inside of the `src` directory.

In this folder, you will need two files: `config.js` and `commands.js`.

The files should follow this format: 

```javascript
// config.js
module.exports = {
  config: {
    // Discord bot token (https://discordapp.com/developers/applications/)
    token: '1a2b3c4d5e6f7g8h9i0j',
    // Prefix for your commands to use (if required)
    prefix: '!'
  },
  dynamicChannels: {
    // ID of the category that the dynamic channels are sorted under.
    '510190315093753867': {
      // What to name the dynamic channels
      name: 'Voice Channel'
    },
    '513898959429959703' : {
      name: 'Voice Channel 2'
    }
  },
  roles: {
    // ID for member role
    member: '336650811855863808'
  }
};
```

```javascript
// commands.js
module.exports = {
  // Command Text
  ping: {
    // Does it require the set prefix to run?
    reqPrefix: false,
    // Should it mention the user who called it when replying?
    mention: false,
    // Text to reply
    reply: 'Pong!'
  },
  pong: {
    reqPrefix: true,
    mention: false,
    reply: 'Ping!'
  }
};
```

## Starting Apollo

After everything is setup, you can run `npm start` to run Apollo.