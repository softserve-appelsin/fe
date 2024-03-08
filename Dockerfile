# From https://dev.to/rodrigokamada/creating-and-running-an-angular-application-in-a-docker-container-40mk
# TODO: Gen node version
FROM node:alpine

WORKDIR /usr/src/app
COPY . /usr/src/app

RUN npm install -g @angular/cli
RUN npm install

CMD ["ng", "serve", "--host", "0.0.0.0"]
