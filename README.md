# ABRIL
UMA VERSAO FULL DO ZERO
Environment variables

cp .env.example .env
# Edit .env with your values
Start services

docker-compose up -d
Database setup

pnpm db:generate
pnpm db:push
Run development

# Backend
pnpm dev:backend

# Frontend (new terminal)
pnpm dev:web
Production Checklist
 SSL certificates configured
 Database backups enabled
 Monitoring setup (Railway provides basic monitoring)
 Error tracking (consider Sentry)
 Performance monitoring
 Load testing completed
 Security audit performed
 LGPD compliance verified

**.github/workflows/ci.yml** (atualizado - variáveis de ambiente)
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '18'
  PNPM_VERSION: '8'

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:15-alpine
        env:
          POSTGRES_USER: election_test
          POSTGRES_PASSWORD: election_test_password
          POSTGRES_DB: election_test_db
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

      redis:
        image: redis:7-alpine
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 6379:6379

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Run type checking
        run: pnpm type-check

      - name: Run linting
        run: pnpm lint

      - name: Run tests
        run: pnpm test
        env:
          DATABASE_URL: postgresql://election_test:election_test_password@localhost:5432/election_test_db
          JWT_SECRET: test_jwt_secret_election_32_chars
          ENCRYPTION_KEY: test_encryption_key_32_bytes_long_election
          REDIS_HOST: localhost
          REDIS_PORT: 6379

  build:
    runs-on: ubuntu-latest
    needs: test
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build application
        run: pnpm build

      - name: Build Docker image
        run: docker build -t election-saas:latest .

      - name: Log in to Railway
        run: echo "${{ secrets.RAILWAY_TOKEN }}" | railway login

      - name: Deploy to Railway
        run: railway up
.env.example (atualizado)

# Database
DATABASE_URL="postgresql://election_user:election_password@localhost:5432/election_db"

# Security
JWT_SECRET="your_super_secret_jwt_key_32_chars_minimum_election"
JWT_EXPIRES_IN="7d"
ENCRYPTION_KEY="32_bytes_encryption_key_keep_secure_election"

# Redis
REDIS_HOST="localhost"
REDIS_PORT="6379"

# External Services
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"
TELEGRAM_BOT_TOKEN="123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ"
INSTAGRAM_ACCESS_TOKEN="IGQVJ..."
OPENAI_API_KEY="sk-..."

# Application
PORT="3001"
NODE_ENV="development"
CORS_ORIGIN="http://localhost:3000"

# Email (optional)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your_email@gmail.com"
SMTP_PASS="your_app_password"
TODO-BUSINESS-MODULES.md (nome atualizado)

# TODO: Business Modules - Election SaaS

## EPIC 1: CRM & Leadership Management (HIGH PRIORITY)

### Stories:
1. **Leader Hierarchy Management**
   - CRUD operations for leaders
   - Tree structure visualization
   - Performance ranking based on validated votes
   - Leader assignment to geographical areas

2. **Voter Management**
   - Voter registration with CPF validation
   - Geographical segmentation
   - Interest categorization (Health, Education, Security, etc.)
   - Bulk import/export functionality

3. **Performance Analytics**
   - Leader performance dashboard
   - Vote conversion metrics
   - Geographical heat maps
   - Real-time vote counting

## EPIC 2: Meeting & Attendance System (HIGH PRIORITY)

### Stories:
1. **Meeting Management**
   - Create/edit/delete meetings
   - Geolocation validation (500m radius)
   - QR code generation per meeting
   - Real-time attendance tracking

2. **Anti-Fraud System**
   - GPS validation for coordinators
   - Attendee location verification
   - Duplicate attendance prevention
   - Suspicious activity detection

3. **Attendance Analytics**
   - Meeting effectiveness metrics
   - Mood analysis tracking
   - Attendance rate reporting
   - Demographic insights

## EPIC 3: Financial Management (MEDIUM PRIORITY)

### Stories:
1. **Campaign Finance**
   - Income/expense tracking
   - Category management (Personnel, Marketing, Logistics)
   - Receipt photo upload and storage
   - Budget vs actual reporting

2. **Fuel Management**
   - Voucher generation and validation
   - Liters tracking and limits
   - Frentista mobile interface
   - Fuel consumption reports

3. **Financial Compliance**
   - TSE-compliant reporting
   - Expense categorization rules
   - Audit trail for all transactions
   - Export functionality for official reporting

## EPIC 4: Marketing & Social Media (MEDIUM PRIORITY)

### Stories:
1. **Social Media Integration**
   - Instagram follower tracking
   - Engagement rate monitoring
   - Post performance analytics
   - Automated social listening

2. **WhatsApp Marketing**
   - Template message management
   - Bulk messaging (with rate limiting)
   - Conversation analytics
   - Opt-out management

3. **AI-Powered Insights**
   - Sentiment analysis of social media
   - Trend prediction based on engagement
   - Content recommendation engine
   - Crisis detection and alerts

## EPIC 5: Advanced Analytics & Reporting (LOW PRIORITY)

### Stories:
1. **Real-time Dashboards**
   - War room display with key metrics
   - Geographical heat maps
   - Vote projection models
   - Resource allocation optimization

2. **Predictive Analytics**
   - Vote prediction algorithms
   - Resource optimization suggestions
   - Risk assessment models
   - Scenario planning tools

3. **Custom Reporting**
   - Drag-and-drop report builder
   - Scheduled report generation
   - Data export in multiple formats
   - API access for external tools

## EPIC 6: Mobile Optimization (HIGH PRIORITY)

### Stories:
1. **PWA Enhancement**
   - Offline functionality for field work
   - Camera integration for document upload
   - GPS integration for location services
   - Push notifications for real-time updates

2. **Mobile-first Interfaces**
   - Simplified forms for quick data entry
   - Touch-optimized navigation
   - Battery-efficient operation
   - Low-bandwidth optimization

## Technical Debt & Improvements

### Immediate (Sprint 1):
- [ ] Complete test coverage (80%+)
- [ ] API documentation with Swagger
- [ ] Error handling and logging improvement
- [ ] Performance optimization for large datasets

### Short-term (Sprint 2-3):
- [ ] Database indexing optimization
- [ ] Caching strategy implementation
- [ ] Background job processing improvement
- [ ] Monitoring and alerting system

### Long-term:
- [ ] Microservices architecture evaluation
- [ ] Real-time data streaming
- [ ] Machine learning integration
- [ ] Multi-language support
railway.json (atualizado)

{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "pnpm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
