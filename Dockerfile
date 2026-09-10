# --- STAGE 1: Install Dependencies ---
FROM node:22-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package configuration files
COPY package.json package-lock.json ./
RUN npm ci

# --- STAGE 2: Build the Application ---
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Un-comment the following line to disable telemetry during the build:
# ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# --- STAGE 3: Production Runner ---
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
# ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root system user for security isolation
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy essential runtime files from the build stage
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000
ENV PORT=3000

# Start the Next.js production server
CMD ["npm", "start"]
