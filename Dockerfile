FROM mcr.microsoft.com/playwright:v1.43.1-focal

WORKDIR /app
COPY . .

RUN npm install

EXPOSE 3000
CMD ["node", "shadowgpt-server.js"]
