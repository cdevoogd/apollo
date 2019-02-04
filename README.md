![Apollo Banner](https://i.imgur.com/8WBIFpW.jpg)

Apollo is a custom Discord bot built using discord.js. Development of Apollo started as my way to learn programming, and quickly spiraled into something much bigger.

Apollo is currently being run mainly on the [Genx Esports Discord server.](https://discord.me/genx_esports) Feel free to stop by and see him in action.

## Current Features
### Dynamic Channels
* When configured, the bot will always keep one empty, available voice channel inside of a category. As people join channels, he will continue to create more, and as people leave, he will delete them. 
* Dynamic channels can also be configured from within Discord using *!adddynamic* and *!deldynamic*.
* These channels can also be locked and unlocked, keeping others from being able to join in. This can be achieved by using the *!lock* and *!unlock* commands (with your respective prefix and settings of course).

### Custom Chat Commands
* Apollo supports the creation (*!addcommand*), editing (*!editcommand*), and deletion (*!delcommand*) of custom commands for use within your Discord server.
* Using these commands, you can create any command with a custom reply.

### Moderation
* Apollo is able to ban, kick, mute, and clear messages.
* There is also a *!report* command that members can use to report other members to staff.
* Moderation actions can also be configured to be logged to a specific  channel.

### Logging (Moderation & Deleted Messages)
* Apollo can be configured to log moderation actions, as well as deleted messages.
* You can enable/disable this logging, and specify the channel where the logs will be recorded.

## Installation
To install Apollo, you just need to clone him and install the dependencies.
```shell
git clone https://github.com/cdevoogd/apollo
cd apollo
npm install
```

If you don’t already have one, you will also need to setup MongoDB for use with Apollo. Personally, I recommend using [MongoDB Atlas.](https://www.mongodb.com/cloud/atlas)

## Configuration
To view configuration instructions, [click here](./docs/configuration.md)
