# Apollo

Apollo is a custom Discord bot built on top of discord.js

## Installation

Start off by cloning the repo:

```shell
git clone https://github.com/cdevoogd/apollo.git
```
If you don't already, you will need to install Node and NPM.

Then, you can install Apollo's dependencies using NPM:

```shell
npm install
```

If you don't already have one, you will need to set up MongoDB to use with Apollo. Personally, I recommend using [Atlas by MongoDB](https://www.mongodb.com/cloud/atlas).

## Configuration

### config.js

Apollo uses a `config.js` file inside of the `src` directory to hold data that doesn't really need to be in the database such as the command prefix.

The `config.js` file that is currently in there is one that I use for testing, and you can easily change the values to fit your needs/wants. I have commented what the values are used for.

### .env

Apollo uses a .env file for more sensitive information such as his access token and the MongoDB information. 

Create a `.env` file inside of the root directory with these keys:

```
ACCESS_TOKEN=
MONGO_HOST=
MONGO_DB_NAME=
MONGO_USER=
MONGO_PASS=
```

`ACCESS_TOKEN` will be your bot's token given to you in your Discord developer page for your application.

`MONGO_DB_NAME`, `MONGO_USER`, and `MONGO_PASS` are self-explanatory, but if you need to get your host you can do this through the Atlas website.

To get your MongoDB connection information (if using Atlas), open the *connect* menu on your cluster page.

![View of an Atlas cluster](https://i.imgur.com/8cpHb4M.png)

After clicking *connect*, choose the *Connect Your Application* option.

Finally, click *Short SRV connection string*.

This will give you a string that looks like this:

```
mongodb+srv://<USERNAME>:<PASSWORD>@cluster-name-fcgnw.gcp.mongodb.net/test?retryWrites=true
```

The host would be the `cluster-name-fcgnw.gcp.mongodb.net` portion of the address.
