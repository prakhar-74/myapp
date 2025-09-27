
```bash
npm ci
npm test
docker build -t myapp:dev .
docker run -p 3000:3000 myapp:dev
# Health:  http://localhost:3000/health
# Metrics: http://localhost:3000/metrics
