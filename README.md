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

# Embarque Tenares Vue Quasar

This project is built with Vue 3, Quasar Framework, and TypeScript.

## Prerequisites

- Node.js 20.9.0 or later
- npm package manager
- Docker (optional, for containerized deployment)

## Project Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Docker Deployment

To build and run the application using Docker:

```bash
# Build the Docker image
docker build -t embarque-tenares-vue-quasar .

# Run the container
docker run -p 80:80 embarque-tenares-vue-quasar
```

## Project Structure

```
embarque-tenares-vue-quasar/
├── src/                    # Source files
├── public/                 # Static files
├── dist/                   # Production build output
├── nginx/                  # Nginx configuration
├── Dockerfile             # Docker configuration
├── package.json           # Project dependencies
├── package-lock.json      # npm lock file
├── quasar.config.js       # Quasar configuration
├── tsconfig.json         # TypeScript configuration
└── .env                  # Environment variables
```

## Key Files

- `Dockerfile`: Contains the multi-stage build configuration for the Docker container
- `quasar.config.js`: Quasar Framework configuration file
- `tsconfig.json`: TypeScript configuration
- `nginx/nginx.conf`: Nginx server configuration
- `.env`: Environment variables (create this file based on `.env.example`)

## Development

The application uses:
- Vue 3 with Composition API
- Quasar Framework v2
- TypeScript
- npm as package manager

## Production Build

The production build process:
1. Builds the Quasar application
2. Creates a Docker image with Nginx
3. Serves the static files through Nginx

## Environment Variables

Create a `.env` file in the root directory with the following variables:
```
VITE_API_URL=your_api_url
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
