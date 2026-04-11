FROM node:20-alpine

WORKDIR /app

ENV PORT=9944
ENV LLASTRO_DATA_DIR=/data

RUN mkdir -p /data

COPY index.html ./index.html
COPY styles.css ./styles.css
COPY framework.css ./framework.css
COPY app.js ./app.js
COPY server.js ./server.js
COPY vendor ./vendor

VOLUME ["/data"]

EXPOSE 9944

CMD ["node", "server.js"]
