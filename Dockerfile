FROM imbios/bun-node:1.1.38-22.11.0-alpine AS base

WORKDIR /app

################################################################
# Install dependencies

FROM base AS deps

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile --ignore-scripts

################################################################
# Build the project

FROM base AS builder

ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY . .
COPY ./next.config.standalone.ts ./next.config.ts

RUN bun run build \
  && rm -rf ./.env ./node_modules ./.next/cache

################################################################
# copy all the files and create production image

FROM base AS runner

# for payload migrate
COPY . /payload
COPY ./next.config.standalone.ts /payload/next.config.ts

# for app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

RUN \
  # script for install and push migrations
  echo 'cd /payload && bun install --ignore-scripts && bun run payload migrate' > ipush \
  && chown -R bun:bun /app /payload

USER bun

ENV PORT=3000
ENV NODE_ENV=production

EXPOSE 3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["bun", "server.js"]
