/**
 * Admin Authorization Utilities
 * 
 * This module provides functions to check if a user is authorized to access admin routes.
 */

/**
 * List of authorized admin user IDs from Clerk
 * 
 * To get your Clerk user ID:
 * 1. Log in to your app with your Google account
 * 2. Check the Clerk dashboard: https://dashboard.clerk.com
 * 3. Go to Users section and copy your user ID
 * 4. Add it to the ADMIN_USER_IDS array below
 * 
 * Alternative: Set it in .env.local as ADMIN_USER_ID
 */
const ADMIN_USER_IDS = [
  process.env.ADMIN_USER_ID, // From environment variable
  // 'user_xxxxxxxxxxxxxxxxxxxxx', // Add your Clerk user ID here
].filter(Boolean) as string[];

/**
 * List of authorized admin emails
 * This is the RECOMMENDED method as it's easier to manage
 */
const ADMIN_EMAILS = [
  process.env.ADMIN_EMAIL, // From environment variable
  // 'votre.email@gmail.com', // Add your email here
].filter(Boolean) as string[];

/**
 * Check if a user ID is authorized as admin
 */
export function isAdminUserId(userId: string): boolean {
  return ADMIN_USER_IDS.includes(userId);
}

/**
 * Check if an email is authorized as admin
 */
export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
}

/**
 * Check if user has admin access (by ID or email)
 */
export function isAdmin(userId: string, email: string | null | undefined): boolean {
  return isAdminUserId(userId) || isAdminEmail(email);
}

/**
 * Error to throw when user is not authorized
 */
export class UnauthorizedAdminError extends Error {
  constructor(message = 'Unauthorized: Admin access required') {
    super(message);
    this.name = 'UnauthorizedAdminError';
  }
}

