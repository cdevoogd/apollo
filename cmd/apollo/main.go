package main

import (
	"log"
	"os"

	"github.com/bwmarrin/discordgo"
	"github.com/pkg/errors"
)

func main() {
	err := run()
	if err != nil {
		log.Fatal(err)
	}
}

func run() error {
	token, set := os.LookupEnv("DISCORD_API_TOKEN")
	if !set {
		return errors.New("DISCORD_API_TOKEN is not set")
	}

	session, err := discordgo.New("Bot " + token)
	if err != nil {
		return errors.Wrap(err, "unable to create session")
	}

	err = session.Open()
	if err != nil {
		return errors.Wrap(err, "error opening websocket to discord")
	}

	err = session.UpdateListeningStatus("the Discord API")
	if err != nil {
		return errors.Wrap(err, "error updating listening status")
	}

	return nil
}
