package main

import (
	"os"
	"os/signal"
	"syscall"

	"github.com/bwmarrin/discordgo"
	"github.com/cdevoogd/apollo/internal/event"
	"github.com/pkg/errors"
	"github.com/sirupsen/logrus"
)

func main() {
	err := run()
	if err != nil {
		logrus.Fatal(err)
	}
}

func run() error {
	setupLogging()

	token, set := os.LookupEnv("DISCORD_API_TOKEN")
	if !set {
		return errors.New("DISCORD_API_TOKEN is not set")
	}

	session, err := discordgo.New("Bot " + token)
	if err != nil {
		return errors.Wrap(err, "unable to create session")
	}

	session.AddHandler(event.HandleReady)

	err = session.Open()
	if err != nil {
		return errors.Wrap(err, "error opening websocket to discord")
	}
	defer session.Close()

	// Wait here until CTRL-C or other term signal is received.
	kill := make(chan os.Signal, 1)
	signal.Notify(kill, syscall.SIGINT, syscall.SIGTERM, os.Interrupt)
	<-kill

	logrus.Warn("Shutting down Apollo...")
	return nil
}

func setupLogging() {
	f := &logrus.TextFormatter{
		DisableQuote:  true,
		FullTimestamp: true,
	}

	logrus.SetFormatter(f)
}
