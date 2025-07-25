/**
 * MySQL to PostgreSQL Migration Script
 * 
 * This script helps migrate data from a MySQL database to PostgreSQL
 * using Prisma as the ORM to handle database operations.
 * 
 * Usage:
 *   1. Configure your MySQL and PostgreSQL connection details below
 *   2. Run: node mysql-to-postgres.js
 */

const mysql = require('mysql2/promise');
const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// PostgreSQL connection via Prisma
const prisma = new PrismaClient();

// MySQL connection configuration
const mysqlConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'testproinvest2.2',
};

// Tables to migrate (in order of dependencies)
const tablesToMigrate = [
  {
    mysqlTable: 'ci_sessions',
    prismaModel: 'Session',
    transform: (row) => ({
      id: row.id,
      ipAddress: row.ip_address,
      userAgent: row.user_agent,
      timestamp: row.timestamp,
      data: row.data
    })
  },
  {
    mysqlTable: 'tbl_addons_api',
    prismaModel: 'AddonsApi',
    transform: (row) => ({
      id: row.id,
      name: row.name,
      logo: row.logo,
      publicKey: row.public_key,
      secretKey: row.secret_key,
      ipnSecret: row.IPN_secret,
      litecoinApi: row.litecoin_API,
      bitcoinApi: row.bitcoin_API,
      dogecoinApi: row.dogecoin_API,
      litecoinTestnetApi: row.litecoin_testnet_API,
      bitcoinTestnetApi: row.bitcoin_testnet_API,
      dogecoinTestnetApi: row.dogecoin_testnet_API,
      merchantName: row.merchantName,
      merchantID: row.merchantID,
      baseUrl: row.base_url,
      env: row.env,
      currency: row.currency,
      status: Boolean(row.status),
      type: row.type,
      purchased: row.purchased,
      createdDtm: new Date(row.createdDtm)
    })
  },
  {
    mysqlTable: 'tbl_settings',
    prismaModel: 'Setting',
    transform: (row) => ({
      id: row.id,
      name: row.name,
      email: row.email,
      logo: row.logo,
      favicon: row.favicon,
      address: row.address,
      currency: row.currency,
      shortcurrency: row.shortcurrency,
      bankName: row.bank_name,
      accountName: row.account_name,
      accountNumber: row.account_number,
      description: row.description,
      keywords: row.keywords,
      SMTPHost: row.SMTPHost,
      SMTPUser: row.SMTPUser,
      SMTPPass: row.SMTPPass,
      SMTPPort: row.SMTPPort,
      captchaSecret: row.captchaSecret,
      captchaSiteKey: row.captchaSiteKey,
      captcha: Boolean(row.captcha),
      verification: Boolean(row.verification),
      emailVerification: Boolean(row.emailVerification),
      smsVerification: Boolean(row.smsVerification),
      kyc: Boolean(row.kyc),
      template: row.template,
      refcom: parseFloat(row.refcom),
      pendingDeposit: Boolean(row.pendingDeposit),
      autoWithdrawal: Boolean(row.autoWithdrawal),
      comType: row.comType
    })
  },
  {
    mysqlTable: 'tbl_users',
    prismaModel: 'User',
    transform: (row) => ({
      userId: row.userId,
      email: row.email,
      password: row.password,
      firstName: row.firstName,
      lastName: row.lastName,
      mobile: row.mobile,
      roleId: row.roleId,
      isVerified: Boolean(row.isVerified),
      isDeleted: Boolean(row.isDeleted),
      isActive: Boolean(row.isActive),
      verificationCode: row.verificationCode || '',
      resetPasswordCode: row.resetPasswordCode,
      twoFactorAuth: Boolean(row.twoFactorAuth),
      twoFactorAuthCode: row.twoFactorAuthCode,
      referrerId: row.referrerId,
      referralCode: row.referralCode || '',
      earningsWallet: parseFloat(row.earningsWallet || 0),
      createdBy: row.createdBy,
      createdDtm: new Date(row.createdDtm),
      updatedBy: row.updatedBy,
      updatedDtm: row.updatedDtm ? new Date(row.updatedDtm) : null,
      lastLogin: row.lastLogin ? new Date(row.lastLogin) : null
    })
  },
  {
    mysqlTable: 'tbl_plans',
    prismaModel: 'Plan',
    transform: (row) => ({
      id: row.id,
      name: row.name,
      minInvestment: parseFloat(row.minInvestment),
      maxInvestment: parseFloat(row.maxInvestment),
      profit: parseFloat(row.profit),
      period: row.period,
      maturity: row.maturity,
      businessDays: Boolean(row.businessDays),
      principalReturn: Boolean(row.principalReturn),
      intAfterMaturity: Boolean(row.intAfterMaturity),
      clientDisplay: Boolean(row.clientDisplay),
      createdBy: row.createdBy,
      createdDtm: new Date(row.createdDtm)
    })
  },
  {
    mysqlTable: 'tbl_deposits',
    prismaModel: 'Deposit',
    transform: (row) => ({
      id: row.id,
      txnCode: row.txnCode,
      userId: row.userId,
      planId: row.planId,
      amount: parseFloat(row.amount),
      paymentMethod: row.paymentMethod,
      maturityDtm: new Date(row.maturityDtm),
      depositDtm: row.depositDtm ? new Date(row.depositDtm) : null,
      status: row.status,
      isDeleted: Boolean(row.isDeleted),
      createdBy: row.createdBy,
      createdDtm: new Date(row.createdDtm)
    })
  },
  {
    mysqlTable: 'tbl_earnings',
    prismaModel: 'Earning',
    transform: (row) => ({
      id: row.id,
      txnCode: row.txnCode,
      userId: row.userId,
      depositId: row.depositId,
      type: row.type,
      emailSent: Boolean(row.email_sent),
      amount: parseFloat(row.amount),
      createdDtm: new Date(row.createdDtm)
    })
  },
  {
    mysqlTable: 'tbl_withdrawals',
    prismaModel: 'Withdrawal',
    transform: (row) => ({
      id: row.id,
      txnCode: row.txnCode,
      userId: row.userId,
      amount: parseFloat(row.amount),
      methodId: row.methodId,
      wallet: row.wallet,
      comment: row.comment,
      status: row.status,
      isDeleted: Boolean(row.isDeleted),
      createdBy: row.createdBy,
      createdDtm: new Date(row.createdDtm),
      completedDtm: row.completedDtm ? new Date(row.completedDtm) : null
    })
  },
  {
    mysqlTable: 'tbl_email_templates',
    prismaModel: 'EmailTemplate',
    transform: (row) => ({
      id: row.id,
      type: row.type,
      mail_subject: row.mail_subject,
      mail_body: row.mail_body,
      createdBy: row.createdBy,
      createdDtm: new Date(row.createdDtm)
    })
  }
  // Add more tables as needed
];

/**
 * Migrate data from MySQL to PostgreSQL
 */
async function migrateData() {
  let mysqlConnection;

  try {
    console.log('Starting migration from MySQL to PostgreSQL...');
    
    // Connect to MySQL
    console.log('Connecting to MySQL database...');
    mysqlConnection = await mysql.createConnection(mysqlConfig);
    console.log('Connected to MySQL successfully.');

    // Process each table
    for (const table of tablesToMigrate) {
      console.log(`\nMigrating ${table.mysqlTable}...`);
      
      // Get data from MySQL
      const [rows] = await mysqlConnection.execute(`SELECT * FROM ${table.mysqlTable}`);
      console.log(`  Found ${rows.length} rows in MySQL ${table.mysqlTable}`);
      
      if (rows.length === 0) {
        console.log(`  No data to migrate for ${table.mysqlTable}`);
        continue;
      }

      // Transform data for PostgreSQL
      const transformedData = rows.map(table.transform);
      
      // Insert data into PostgreSQL using Prisma
      console.log(`  Inserting data into PostgreSQL ${table.prismaModel} model...`);
      
      // Use createMany for bulk insert if available (requires Prisma v2.16.0+)
      if (prisma[table.prismaModel].createMany) {
        await prisma[table.prismaModel].createMany({
          data: transformedData,
          skipDuplicates: true, // Skip records that already exist
        });
      } else {
        // Fall back to individual inserts
        for (const item of transformedData) {
          try {
            await prisma[table.prismaModel].create({
              data: item
            });
          } catch (err) {
            console.error(`  Error inserting record:`, err.message);
          }
        }
      }
      
      console.log(`  Completed migration for ${table.mysqlTable}`);
    }

    console.log('\nMigration completed successfully!');
    
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    // Close connections
    if (mysqlConnection) await mysqlConnection.end();
    await prisma.$disconnect();
  }
}

// Run the migration
migrateData();
