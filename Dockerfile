FROM oven/bun:latest
WORKDIR /app
COPY . .
CMD ["sh", "-c", "bun /app/index.ts && sleep infinity"]