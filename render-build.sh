

# Restore cache
if [ -d "/mnt/cache/nextjs" ]; then
    echo "Restoring cache..."
    cp -R /mnt/cache/nextjs .next/cache
fi

# Install dependencies and build
npm install
npm run build

# Save cache
if [ -d ".next/cache" ]; then
    echo "Saving cache..."
    mkdir -p /mnt/cache/nextjs
    cp -R .next/cache /mnt/cache/nextjs
fi
