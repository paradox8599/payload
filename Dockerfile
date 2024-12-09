FROM imbios/bun-node:1.1.38-22.11.0-alpine AS base

ENV NODE_ENV=production

WORKDIR /app

################################################################
# Install dependencies

FROM base AS deps

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile --ignore-scripts

################################################################
# only run payload migrate if ENV is set (with DATABASE_URI)

FROM deps AS migration

ARG ENV
ENV ENV=$ENV

COPY . .
RUN echo "$ENV" > /app/.env && ([ -z $ENV ] || bun run payload migrate)

################################################################
# Build the project

FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN \
  # config next to build for standalone output
  sed -i "s/output: undefined,/output: 'standalone',/g" /app/next.config.ts \
  && bun run build

################################################################
# copy all the files and create production image

FROM base AS runner

# for app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static
RUN chown -R bun:bun /app 

# for payload migration

# COPY . /payload
# COPY --from=builder /app/next.config.ts /payload/next.config.ts
# RUN  echo 'cd /payload && bun install --ignore-scripts && bun run payload migrate' > /bin/migrate \
#   && chown -R bun:bun /payload /bin/migrate \
#   && chmod a+x /bin/migrate

# finish

USER bun
ENV PORT=3000
EXPOSE 3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["bun", "server.js"]
