FROM node:8

WORKDIR /home/node/pb-advisor

EXPOSE 8080

COPY . /home/node/pb-advisor

CMD ["npm", "start"]
