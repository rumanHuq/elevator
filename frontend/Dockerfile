FROM node:16-alpine as base
EXPOSE 8000
WORKDIR /app
COPY ./tsconfig.json\
  ./artboard/package.json\
  ./artboard/package-lock*.json\
  ./artboard/vite.config.ts ./
RUN npm i
ENV PATH=/app/node_modules/.bin:$PATH

FROM base as dev
WORKDIR /app/artboard
CMD [ "npm", "start" ]

