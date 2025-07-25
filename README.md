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

The application is fully configured for deployment on Render.com with PostgreSQL support. Follow this comprehensive guide to deploy ProInvest on Render's cloud platform.

### Detailed Deployment Guide

1. **Create and Set Up Your Render Account**
   - Go to [Render.com](https://render.com) and click "Sign Up" in the top right corner
   - Sign up using GitHub (recommended) or email
   - Verify your email address if required
   - Complete account setup and add payment information if needed (you can use the free tier for testing)

2. **Connect Your GitHub Repository**
   - From the Render dashboard, click on "New +" button in the top right
   - Select "Blueprint" from the dropdown menu
   - In the "Connect a repository" section, click "Connect GitHub"
   - Authorize Render to access your GitHub repositories when prompted
   - Search for and select your "CodeIgniter-proinvest" repository
   - Click "Connect"

3. **Deploy Using the Blueprint**
   - After connecting your repository, Render will detect the `render.yaml` file
   - Click "Apply Blueprint" to start the configuration process
   - Render will automatically create all the resources defined in your `render.yaml` file:
     - A web service for the ProInvest application
     - A PostgreSQL database instance

4. **Monitor the Initial Deployment**
   - Render will show the progress of creating each resource
   - Wait for both the database and web service to be created
   - The initial deployment may take 5-10 minutes

5. **Configure Environment Variables**
   - Once resources are created, click on your web service from the dashboard
   - Navigate to the "Environment" tab
   - You'll see `DATABASE_URL` is already configured by Render
   - Click "Add Environment Variable" to add additional required variables:
     ```
     CI_ENV=production
     APP_NAME=ProInvest
     APP_URL=[Your Render URL - will be https://proinvest.onrender.com or similar]
     SMTP_HOST=[Your SMTP server]
     SMTP_PORT=[Your SMTP port]
     SMTP_USER=[Your SMTP username/email]
     SMTP_PASS=[Your SMTP password]
     ```
   - Add payment gateway API keys as needed:
     ```
     STRIPE_PUBLIC_KEY=[Your Stripe public key]
     STRIPE_SECRET_KEY=[Your Stripe secret key]
     PAYPAL_CLIENT_ID=[Your PayPal client ID]
     PAYPAL_CLIENT_SECRET=[Your PayPal client secret]
     ```
   - Click "Save Changes"

6. **Trigger a Manual Deployment**
   - After configuring environment variables, go to the "Manual Deploy" section
   - Select "Deploy latest commit" or choose a specific commit
   - Click "Deploy"

7. **Monitor the Deployment Process**
   - Watch the logs in real-time to track the deployment progress
   - The build process will:
     - Install PHP extensions
     - Install Node.js dependencies
     - Generate the Prisma client
     - Run database migrations
     - Start the web service

8. **Verify Successful Deployment**
   - Once deployment is complete (usually takes 5-10 minutes), check for the "Your service is live 🎉" message
   - Click on the URL provided (typically https://proinvest.onrender.com or your custom domain)
   - Verify that the application loads correctly

9. **Database Migration and Initialization**
   - The deployment process automatically sets up your PostgreSQL database
   - If you need to migrate data from an existing MySQL database:
     - Clone your repository locally
     - Configure both MySQL and PostgreSQL connection details in your `.env` file
     - Run `node migration/mysql-to-postgres.js`

10. **Set Up Custom Domain (Optional)**
    - In your web service settings, navigate to the "Settings" tab
    - Scroll to "Custom Domain"
    - Click "Add Custom Domain" and follow the instructions
    - Configure your domain registrar with the provided DNS settings

11. **Setup Automatic Deployments (Recommended)**
    - By default, Render automatically deploys when you push to your main/master branch
    - To configure specific branch deployments:
      - Go to the "Settings" tab of your web service
      - Under "Build & Deploy" find "Auto-Deploy"
      - Configure as needed

### Troubleshooting Render Deployments

- **Build Failures**: Check the build logs for specific error messages. Common issues include:
  - Missing dependencies: Make sure all required packages are in package.json
  - Environment variables: Ensure all required variables are properly set

- **Database Connection Issues**: If your app can't connect to the database:
  - Verify the DATABASE_URL environment variable is correctly set
  - Check if your PostgreSQL instance is running (in Render dashboard)
  - Test the connection using Prisma Studio: `npx prisma studio`

- **Performance Issues**: If your app is slow on the free tier:
  - Consider upgrading to a paid plan
  - Optimize your database queries
  - Enable caching mechanisms

- **Custom Domain Not Working**:
  - Ensure DNS propagation is complete (can take up to 48 hours)
  - Verify SSL certificate is issued correctly
  - Check DNS records match Render's instructions exactly

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
