FROM imbios/bun-node:1.1.37-22.11.0-alpine AS base

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
COPY ./standalone.next.config.mjs ./next.config.mjs

RUN --mount=type=secret,id=env \
  cp /run/secrets/env ./.env \
  # && bun run payload migrate \
  && bun run build \
  && rm -rf ./.env ./node_modules ./.next/cache

################################################################
# copy all the files and create production image

FROM base AS runner

# for payload migrate
COPY . /payload
COPY ./standalone.next.config.mjs /payload/next.config.mjs

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
