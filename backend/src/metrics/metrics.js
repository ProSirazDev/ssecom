import client from 'prom-client';

const register = new client.Registry();

// Default system metrics
client.collectDefaultMetrics({ register });

// Counter for total requests
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests received',
  labelNames: ['method', 'route', 'status'],
});

register.registerMetric(httpRequestCounter);

export { register, httpRequestCounter };
