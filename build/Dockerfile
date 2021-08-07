# syntax=docker/dockerfile:1

FROM golang:1.16 AS base
ENV CGO_ENABLED=0
WORKDIR /src
COPY go.mod go.sum ./
RUN --mount=type=cache,target=/go/pkg/mod \
    go mod download
COPY . .

FROM base as build
RUN --mount=type=cache,target=/go/pkg/mod \
    --mount=type=cache,target=/root/.cache/go-build \
    GOOS=linux go build -o /src/out/apollo /src/cmd/apollo/main.go

FROM base AS unit-test
RUN --mount=type=cache,target=/go/pkg/mod \
    --mount=type=cache,target=/root/.cache/go-build \
    go test -v ./...

FROM alpine:3.14 as bin
COPY --from=build /src/out/apollo /
CMD [ "/apollo" ]
