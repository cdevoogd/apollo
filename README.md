![Apollo Banner](./docs/images/banner.jpg)

## Current Features
### Dynamic Channels
- When configured, the bot will keep one, empty voice channel at the end of each configured category.
- Configuration for dynamic channels can be managed from within Discord using the `adddynamic` and `deldynamic` commands.
- Dynamic channels are able to be locked and unlocked, preventing other members from joining.

### Custom Chat Commands
- Using Apollo's custom commands feature, you can create any command with a custom reply.
- Apollo supports the addition (`addcommand`), editing (`editcommand`), and deletion (`delcommand`) of custom chat commands from within Discord. 
- Custom commands are useful for quickly linking members to thing such as rules, streams, or various other things.

### Moderation
- Apollo supports general moderation features, including `ban`, `kick`, `mute`, `clear`, and `clearuser`.
- There is also a general `report` command that allows server members to send in reports on other members for staff to view and act on.

### Logging
- Apollo can be configured to log moderation actions, as well as deleted messages.
- You are able to enable/disable this logging, as well as specify the channel where logs will be sent.

## Installation
To install Apollo, you just need to clone him and install the dependencies.
```shell
git clone https://github.com/cdevoogd/apollo
cd apollo
npm install
```

If you don’t already have one, you will also need to setup a MongoDB database for use with Apollo. Personally, I recommend using [MongoDB Atlas.](https://www.mongodb.com/cloud/atlas)

## Configuration
To view configuration instructions, [click here](./docs/configuration.md)
