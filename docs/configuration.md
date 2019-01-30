# Apollo - Configuration
## .env
Apollo uses a `.env` file to contain his Discord access token and MongoDB connection information.
Create a `.env` file inside of the main `apollo` directory with the following keys:
```
ACCESS_TOKEN=
MONGO_HOST=
MONGO_DB_NAME=
MONGO_USER=
MONGO_PASS=
```

`ACCESS_TOKEN` is where you will need to put the bot’s access token for Discord. This can be found in the [Discord Developer Dashboard](https://discordapp.com/developers/applications/).

The other keys are where your MongoDB connection information is stored.
`MONGO_USER` and `MONGO_PASS` are your username and password used to authenticate with the database.
`MONGO_DB_NAME` is the name of the database that Apollo should connect to and work with.
`MONGO_HOST` is the host for your Mongo database. This will be the string between the `@` and `/` in your connection string.

For example:
```
mongodb+srv://<USERNAME>:<PASSWORD>@cluster-name-fcgnw.gcp.mongodb.net/test?retryWrites=true
```
Our host would be `cluster-name-fcgnw.gcp.mongodb.net`.

Finally, your `.env` file should look something like this:
```
ACCESS_TOKEN=8u98a0wid09aiwdiscord-access-token92daw8dua9
MONGO_HOST=cluster-name-fcgnw.gcp.mongodb.net
MONGO_DB_NAME=apollo
MONGO_USER=apolloUser
MONGO_PASS=apolloPassword
```


## config.js
Apollo uses a `config.js` file inside of the `src` directory for configuration of the bot and commands. Provided is a `config-example.js` file. Feel free to rename this to `config.js`, and customize it to your liking.

### Options

#### `enabled`
 `true` or `false`
Enables that command or feature

#### `channelID`
This channel ID is used to specify where to send certain logs/messages.

#### `adminRoleID`
This is the ID of an administrator role. This role is what is able to access commands with the `admin` access level.

#### `staffRoleIDs`
This array can contain multiple role IDs for different roles considered staff.  These roles are what are able to access commands with the `staff` access level.

#### `accessLevel`
`'admin'` or `’staff'`
Used to specify which level of staff has access to that particular command. 
`admin` = adminRoleID
`staff` = staffRoleIDs

#### commandChannelOnly
Should this command only be available in the specified `botCommandsChannel`.
Currently this is an option on the *!lock* and *!unlock* commands to prevent spam throughout the server.
