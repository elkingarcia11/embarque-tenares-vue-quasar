# Embarque Tenares Web App (Front-Facing Application)

Embarque Tenares is a responsive web application designed for both mobile and desktop devices. It serves as a platform for clients to track packages, access up-to-date pricing information, frequently asked questions, business policies, and location details.

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

To set up and install the project, follow these steps:

- Install [GitHub CLI](https://github.com/git-guides/install-git)
- Clone the repository: `git clone https://github.com/elkingarcia11/EmbarqueTenaresVueQuasar.git`
- Install [npm](https://docs.npmjs.com/)
- Install project dependencies using npm: `npm install`
- Build the project: `quasar build`

## Configuration

Configure the environment variables for the project by creating a .env file and adding your Google Maps API key, third party software authentication information and Cloud Firestore authentication information.

## Prerequisites

Before running the project, ensure you have the following prerequisites:

- [ ] npm installed
- [ ] npm dependencies installed
- [ ] .env file configured
- [ ] Project built

## Usage

### Development

1. Run the development server: `quasar dev`
2. Open your browser and navigate to http://localhost:3000 to view the application during development.

### Production

To deploy this Vue and Quasar project on the Google Cloud Platform, follow these steps:

1. Install Docker on your machine.
2. Build the Docker image of the application.
3. Tag the image with the name of the Artifact Registry project.
4. Push the project image to the Artifact Registry or Container Registry.
5. Deploy an instance of the image using Cloud Run to listen on port 80.
6. Verify the deployment on your website.

## Features

- Efficiently track package status using an invoice number.
- Provide an internationalized experience for bilingual clients.
- Access the latest rates, FAQs, and location information including addresses, contact numbers, and operating hours.
- Seamlessly link to our social media platforms for broader engagement.

### Production Link

Experience the application by visiting [embarquetenares.com](https://embarquetenares.com).

## Contact

For any questions, feedback, or inquiries, please reach out via email at elkingarcia.11@gmail.com or connect with me on [LinkedIn](https://www.linkedin.com/in/elkingarcia11/)

## Acknowledgments

Special acknowledgment goes to the Vue.js and Quasar framework communities for their comprehensive documentation and powerful tools. Your contributions have been instrumental in making this project possible.
