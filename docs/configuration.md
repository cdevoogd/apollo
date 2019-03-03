# Apollo Configuration
## .env
Apollo uses a `.env` file to contain his Discord access token and MongoDB connection information.
Create a `.env` file inside of the main `apollo` directory with the following keys:
```shell
DISCORD_TOKEN="discord_token_here"
MONGO_URL="mongo_connection_url_here"
PASTEE_TOKEN="paste.ee_api_token_here"
```

### `DISCORD_TOKEN`
This where you will need to put the bot’s access token for Discord. This can be found in the [Discord Developer Dashboard](https://discordapp.com/developers/applications/).

### `MONGO_URL`
This is where you will put the **full connection string** for your Mongo DB database, including passwords and database names.

### `PASTEE_TOKEN`
This is where you will put your API access token to [paste.ee](https://paste.ee/). 
This token is used to create logs of bulk message deletions, as they will not fit into a Discord message.

You can get a token for this site simply by registering.

## config.js
Apollo uses a `config.js` file inside of the `src` directory for configuration of the bot and commands. Provided is a `config-example.js` file. Feel free to rename this to `config.js`, and customize it to your liking.

### Options

#### `enabled`
`true` or `false`

Enables or disables that command/feature

#### `channelID`
This is where you will put the channel ID to send messages to for that configuration option.

#### `adminRoleIDs`
This array contains all of the admin role IDs. These IDs are able to use commands with the `admin` access level.

#### `staffRoleIDs`
This array contains all of the staff role IDs. These roles are able to use commands with the `staff` access level. 

**Note:** You will want to add the roles inside of `adminRoleIDs` to this array as well.

#### `accessLevel`
`'admin'` or `’staff'`

Used to specify which level of staff has access to that particular command. 

`admin` = adminRoleIDs

`staff` = staffRoleIDs

#### `commandChannelOnly`
Specifies whether or not this command is required to be used in the channel specified by the `botCommandsChannelName` option.
