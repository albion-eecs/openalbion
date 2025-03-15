FROM node:20-alpine AS base

RUN npm install -g npm@latest

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .


ENV NEXT_TELEMETRY_DISABLED 1
ENV SQLITE_DB_PATH=/app/data/sqlite.db

RUN mkdir -p /app/data && \
    npx @better-auth/cli migrate && \
    npm run db:setup && \
    npm run db:import && \
    chown -R node:node /app/data

RUN npm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV SQLITE_DB_PATH=/app/data/sqlite.db

RUN npm install -g tsx
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/data /app/data

RUN mkdir .next
RUN chown nextjs:nodejs .next

RUN chown -R nextjs:nodejs /app/data

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

COPY --from=builder --chown=nextjs:nodejs /app/src/lib ./src/lib

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"] 