# YaYa Wallet Webhook Service

A webhook endpoint service that securely receives and processes transaction notifications from YaYa Wallet.

## Problem Statement
Implement a webhook endpoint that receives and processes webhook notifications from YaYa Wallet, following their webhook integration guide.

## Solution Overview

### Key Features
- Secure webhook endpoint with HMAC SHA256 signature verification
- Replay attack prevention with 5-minute timestamp tolerance
- PostgreSQL storage with database migrations
- Docker containerization for easy deployment
- Input validation and error handling

### Security Measures
1. **Signature Verification**
   - HMAC SHA256 signature validation using secret key
   - Prevents unauthorized webhook submissions
   - Ensures data integrity

2. **Replay Attack Prevention**
   - 5-minute timestamp tolerance
   - Validates `timestamp` field against current server time
   - Rejects outdated or future-dated requests

3. **Database Constraints**
   - Unique transaction IDs prevent duplicate processing
   - Stores received_at timestamp for audit trails

## Tech Stack
- Node.js/Express
- PostgreSQL
- Sequelize ORM
- Docker & Docker Compose

## Setup and Testing

### Prerequisites
- Docker and Docker Compose
- Node.js (for local development)
- Insomnia/Postman (for testing)

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd yaya-webhook-service
   ```

2. Create a `.env` file with these exact values for testing:
   ```plaintext
   # Database configuration
   DATABASE_URL=postgres://user:password@db:5432/yaya_wallet
   DB_USERNAME=user
   DB_PASSWORD=password
   DB_NAME=yaya_wallet
   DB_HOST=db
   PORT=3000
   NODE_ENV=development

   # This secret key is for testing purposes only
   WEBHOOK_SECRET_KEY=096557ade3bb273fc70b49262ffb460ece18da402e958b5d08645190a23a4979
   ```

3. Start the service:
   ```bash
   docker-compose up --build
   ```

> **Note**: In a real production environment, you would never share secret keys. This key is provided only for testing purposes to allow evaluators to run and test the application.

### Testing the Webhook

1. Generate test payload and signature:
   ```bash
   node generate-signature.js
   ```

2. Send test webhook using Insomnia/Postman:
   - URL: `POST http://localhost:3000/webhook`
   - Header: `yaya-signature: <generated-signature>`
   - Body: Copy the generated JSON payload

3. Expected responses:
   - Success: `{"status": "success"}`
   - Invalid signature: `{"error": "Invalid signature"}`
   - Missing signature: `{"error": "Missing YAYA-SIGNATURE header"}`
   - Timestamp out of tolerance: `{"error": "Timestamp out of tolerance"}`

## Problem-Solving Approach

1. **Security First**
   - Implemented signature verification before any other features
   - Added timestamp validation to prevent replay attacks
   - Used crypto.timingSafeEqual() to prevent timing attacks

2. **Database Design**
   - Created migrations for version control
   - Used appropriate data types for each field
   - Added constraints for data integrity

3. **Code Structure**
   - Separated routes, models, and configurations
   - Used environment variables for configuration
   - Added comprehensive error handling

4. **Testing Strategy**
   - Created generate-signature.js for testing
   - Implemented logging for debugging
   - Docker setup ensures consistent testing environment

## Assumptions
1. Webhook payloads follow the documented structure:
   ```json
   {
     "id": "unique_transaction_id",
     "amount": 100.50,
     "currency": "USD",
     "created_at_time": 1673381836,
     "timestamp": 1701272333,
     "cause": "payment",
     "full_name": "John Doe",
     "account_name": "johndoe",
     "invoice_url": "https://example.com/invoice/123"
   }
   ```
2. Timestamps are in Unix epoch format
3. Transaction IDs are unique
4. Currency codes are standard 3-letter codes
5. Amount values are numeric

## Future Improvements
1. Add rate limiting
2. Implement retry mechanism for failed database operations
3. Add monitoring and alerting
4. Set up automated tests
5. Add payload validation middleware

## Author
Gideon Amha Gebremedhin

## License
ISC