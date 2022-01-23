package event

import (
	"github.com/bwmarrin/discordgo"
	"github.com/sirupsen/logrus"
)

func HandleReady(s *discordgo.Session, _ *discordgo.Ready) {
	logrus.Debug("Handling event: Ready")

	err := s.UpdateListeningStatus("some websocket")
	if err != nil {
		logrus.WithError(err).Error("Failed to update the listening status")
		return
	}

	logrus.Info("Apollo is initialized and ready")
}
