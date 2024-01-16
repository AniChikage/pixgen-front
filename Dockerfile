FROM node:21.5

WORKDIR /app
COPY * ./

RUN npm install 
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]


