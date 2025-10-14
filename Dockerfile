# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=21

FROM node:${NODE_VERSION}

# Use production node environment by default.
ENV NODE_ENV production

# Configuration de la base de données
ENV PG_HOST db
ENV PG_PORT 5432
ENV PG_USER postgres
ENV PG_PASS 123456
ENV PG_DB localisationrag

# Configuration de l'application
ENV PORT 3000
ENV URL http://localhost:3000
ENV STORAGE_URL http://localhost:3000/files
ENV ONLYOFFICE_URL http://54.37.40.17:5300

# Configuration des emails
ENV MAIL_HOST sandbox.smtp.mailtrap.io
ENV MAIL_PORT 587
ENV MAIL_SECURE true
ENV MAIL_USER 3352444d941ae7
ENV MAIL_PASS ce9d1f951d3dcb

# We don't need the standalone Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# Install Google Chrome Stable and fonts
# Note: this installs the necessary libs to make the browser work with Puppeteer.
#RUN apt-get update && apt-get install gnupg wget -y && \
#  wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
#  sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
#  apt-get update && \
#  apt-get install google-chrome-stable -y --no-install-recommends && \
#  rm -rf /var/lib/apt/lists/*

RUN apt-get update && apt-get install libreoffice -y

WORKDIR /usr/src/app

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage a bind mounts to package.json and package-lock.json to avoid having to copy them into
# into this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

# Copy the rest of the source files into the image.
COPY . .

RUN chmod 777 /usr/src/app/files

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD npm start
