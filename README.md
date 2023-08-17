# Embarque Tenares (Front-Facing App)

A mobile and desktop-friendly web application for clients to track packages and to find the latest prices, frequently asked questions, business policies, and location information.

## Table of Contents

1. [Installation](#installation)
2. [Configuration](#configuration)
3. [Prerequisites](#prerequisites)
4. [Usage](#usage)
5. [Features](#features)
6. [Production Link](#production-link)
7. [Contact Information](#contact-information)
8. [Acknowledgments](#acknowledgments)

## Installation

To set up and install the project, install the following:

- [GitHub CLI](https://github.com/git-guides/install-git)
- Clone the repository: `git clone [repository_url]`
- [npm](https://docs.npmjs.com/) or [yarn](https://classic.yarnpkg.com/en/docs/install/)
- Install dependencies using npm or yarn: `npm install` or `yarn install`
- Build the project: `quasar build`

## Configuration

Configure the environment variables for the project by creating a `.env` file and adding your sensitive api and database information

## Prerequisites

Before running the project, ensure you have the following prerequisites:

- [ ] npm/yarn installed
- [ ] npm/yarn dependencies installed
- [ ] `.env` file created & configured
- [ ] Build project

## Usage

### Development

1. Run the development server: `quasar dev`
2. Open your browser and go to http://localhost:3000 to see the result.

### Production

To deploy this Vue and Quasar project on Google Cloud Platform, follow these steps:

1. Install Docker on your machine.
2. Build the Docker image of the application.
3. Tag the image with the name of the Artifact Registry project.
4. Push the project image to the Artifact Registry or Container Registry.
5. Deploy an instance of the image using Cloud Run to listen on port 80.
6. Verify the deployment on your website.

## Features

- Track package status using invoice number
- Internationalization to cater to bilingual clients
- View latest rates, FAQs, and location information like addresses, phones, hours and more
- Links to our social media platforms

### Production Link

Visit [embarquetenares.com](https://embarquetenares.com) to interact with the project.

## Contact

For questions or feedback about the project, feel free to get in touch with me at elkingarcia.11@gmail.com.

## Acknowledgments

I would like to acknowledge the Vue.js and Quasar framework communities for their detailed documentation and powerful tools.
