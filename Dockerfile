# Builder Stage
FROM node:22-alpine AS builder
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN pnpm build

# Production Stage
FROM node:22-alpine AS runner
WORKDIR /app

# Set node environment to production
ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"

# Create non-root user for running the application
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy necessary files from builder stage
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Copy the startup script
COPY startup.sh /app/startup.sh

# Ensure the startup script is executable and public is writable for env injection
RUN chmod +x /app/startup.sh && \
    chown -R nextjs:nodejs /app/public

# Switch to non-root user
USER nextjs

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the startup script
CMD ["/app/startup.sh"]
