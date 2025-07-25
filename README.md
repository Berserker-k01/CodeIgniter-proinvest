# Proinvest - HYIP, Cryptocurrency, Forex Investment Platform with MLM Support

**Modern Investment Platform using CodeIgniter + PostgreSQL + Prisma + Render Deployment**

Proinvest is a comprehensive investment platform that supports HYIP (High-Yield Investment Programs), cryptocurrency, and forex investments with full MLM (Multi-Level Marketing) capabilities. This system provides a secure and feature-rich environment for both platform administrators and clients.

## 🌟 Features

1. **Modern & Responsive UI**: Clean interface based on AdminLTE Bootstrap theme
2. **Investment Plans**: Easily configure and manage investment plans
3. **User Management**: Complete verification system with KYC support
4. **Role Management**: Admin and manager roles with customizable permissions
5. **Multiple Payment Gateways**: 
   - PayPal, Stripe, CoinPayments integration
   - Extensible payment API architecture
6. **Referral System**: Multi-level marketing with customizable commission structures
7. **Automated Earnings**: Schedule-based earnings calculation
8. **Withdrawal Management**: Manual review and approval system
9. **Transaction Tracking**: Comprehensive lists for deposits, withdrawals, and earnings
10. **Investment Management**: Re-investment and withdrawal options upon maturity
11. **Email System**: Customizable email templates and notifications
12. **API Management**: Configure payment gateways from settings
13. **Cross-Browser Compatibility**: Support for all modern browsers
14. **PostgreSQL Database**: Robust and scalable data storage
15. **Prisma ORM**: Type-safe database access with modern ORM
16. **Cloud Deployment**: Ready for Render.com deployment

## 🔄 Technology Stack

- **Backend**: CodeIgniter PHP Framework
- **Frontend**: AdminLTE Bootstrap Theme
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Deployment**: Render.com

## 🚀 Getting Started

### Prerequisites

- PHP 8.0 or higher
- Node.js 14.0 or higher
- npm 6.0 or higher
- PostgreSQL 12 or higher

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/CodeIgniter-proinvest.git
   cd CodeIgniter-proinvest
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Copy `.env.example` to `.env`
   - Update the DATABASE_URL with your PostgreSQL connection string
   - Configure other settings like SMTP, payment gateways, etc.

4. **Setup PostgreSQL database**
   - Create a new database: `proinvest`
   - The schema will be automatically created by Prisma

5. **Generate Prisma client**
   ```bash
   npx prisma generate
   ```

6. **Deploy database migrations**
   ```bash
   npx prisma migrate deploy
   ```

7. **Start the development server**
   ```bash
   php -S localhost:8000
   ```

8. **Access the application**
   - Open your browser and go to: http://localhost:8000

### System Administrator Account

- **Email**: admin@proinvest.com
- **Password**: 12345678

## 🌐 Deploying to Render.com

The application is fully configured for deployment on Render.com with PostgreSQL support.

### Steps for Deployment

1. **Create a Render account**
   - Sign up at https://render.com

2. **Connect your GitHub repository**
   - Link your GitHub account to Render
   - Select the CodeIgniter-proinvest repository

3. **Setup a new Web Service**
   - Choose "Deploy from Blueprint" option
   - Render will automatically detect the `render.yaml` configuration
   - This will setup both the web application and the PostgreSQL database

4. **Configure environment variables**
   - Render automatically sets up the DATABASE_URL
   - Add additional environment variables as needed:
     - SMTP settings for emails
     - Payment gateway API keys
     - App URL and other configuration

5. **Deploy the application**
   - Render will automatically build and deploy the application
   - The build process includes installing dependencies, generating Prisma client, and database migration

6. **Access your deployed application**
   - Once deployment is complete, access your application using the provided URL

## 📦 Database Migration

We've migrated from MySQL to PostgreSQL for better performance and Render.com compatibility.

### Major Database Changes

- Updated schema for PostgreSQL compatibility
- Implemented Prisma ORM for database operations
- Enhanced data types for better security and performance
- Modified foreign key constraints for data integrity

### Running Migrations Manually

```bash
npx prisma migrate dev --name init     # For development
npx prisma migrate deploy              # For production deployment
```

## 🔧 Configuration

### Database Configuration

The database connection is configured through environment variables, specifically the `DATABASE_URL` in the `.env` file or through Render environment variables.

Example connection string:
```
DATABASE_URL="postgresql://username:password@localhost:5432/proinvest?schema=public"
```

### CodeIgniter Integration with Prisma

We've created a custom library (`application/libraries/Prisma.php`) to bridge CodeIgniter with Prisma ORM. This allows you to use Prisma in your controllers while maintaining CodeIgniter's MVC architecture.

Example usage in a controller:
```php
$this->load->library('prisma');
$users = $this->prisma->findMany('User', ['where' => ['isActive' => true]]);
```

## 📄 Documentation

For more detailed information on using the platform, refer to the documentation in the `/docs` directory.

## 🛠️ Troubleshooting

Common issues and their solutions:

1. **Database connection issues**
   - Verify PostgreSQL is running
   - Check the DATABASE_URL format
   - Ensure proper credentials

2. **Prisma client not found**
   - Run `npx prisma generate` to generate the client

3. **Render deployment failures**
   - Check build logs for specific errors
   - Verify all required environment variables are set

## 📬 Support

For support, contact us at support@proinvest.com or open an issue on the GitHub repository.
