# GET Community Dashboard - V2

This repository contains the code for [GET Community Dashbaord]. This guide will explain how to install Docker, clone the repository, and run the dashboard and it's required websocket locally, from your terminal.

## Installation

To use this project, you must first install Docker on your machine. Please follow the instructions specific to your operating system:

* [Docker for Mac](https://docs.docker.com/docker-for-mac/install/)
* [Docker for Windows](https://docs.docker.com/docker-for-windows/install/)
* [Docker for Linux](https://docs.docker.com/engine/install/)

## Clone the Repository

Once Docker is installed, you can clone the repository by opening a terminal window and running the following command:

`git clone https://github.com/simonbromfield/GET-Community-Dashboard-V2.git`

This will create a local copy of the repository on your machine.

## Running Docker Compose

Navigate to the repository directory in your terminal window by running:

`cd GET-Community-Dashboard-V2`

Next, run the following command to start the project using Docker Compose:

`docker-compose up`

This command will download and build all of the necessary dependencies and start the application. Once the application has started, you should be able to view it in your web browser at `http://localhost:3000`.

To stop the application, press `CTRL-C` in your terminal window.

## Conclusion

You should now be able to clone the repository and start the project using Docker Compose. If you encounter any issues, please refer to the project documentation or raise an issue in the project repository.
