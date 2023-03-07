# GET Community Dashboard - V2

This repository contains the code for GET Community Dashbaord. This guide will explain how to install Docker, clone the repository, and run the dashboard and it's required websocket locally, from your terminal.

## Installation

To use this project, you must first install Docker on your machine. Please follow the instructions specific to your operating system:

* [Docker for Mac](https://docs.docker.com/docker-for-mac/install/)
* [Docker for Windows](https://docs.docker.com/docker-for-windows/install/)
* [Docker for Linux](https://docs.docker.com/engine/install/)

## Fork the Repository

To make changes to the code, you should first fork the repository by clicking the "Fork" button at the top right of the repository page on GitHub. This will create a copy of the repository in your own GitHub account.

Once you've forked the repository, you can clone your copy of the repository by opening a terminal window and running the following command:

`git clone https://github.com/[username]/[forked-repo-name].git`

This will create a local copy of your forked repository on your machine.

You can then make changes to the code, commit them to your local copy of the repository, and push the changes back up to your forked repository on GitHub.

From here you will be able to create a "pull request"

## Running Docker Compose

Navigate to the repository directory in your terminal window by running:

`cd GET-Community-Dashboard-V2`

Next, run the following command to start the project using Docker Compose:

`docker-compose up`

This command will download and build all of the necessary dependencies and start the application. Once the application has started, you should be able to view it in your web browser at `http://localhost:3000`.

To stop the application, press `CTRL-C` in your terminal window.

## Conclusion

You should now be able to fork and clone the repository and start the dashbaord using Docker Compose. 

