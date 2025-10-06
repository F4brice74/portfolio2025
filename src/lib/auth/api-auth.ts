/**
 * API Authentication Helpers
 * 
 * Centralized authentication and authorization checks for API routes
 */

import { auth, currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { isAdmin } from './admin-check';

/**
 * Check if user is authenticated and is admin
 * Returns error response if not authorized, null if authorized
 * 
 * Usage in API routes:
 * ```ts
 * const authError = await requireAdmin();
 * if (authError) return authError;
 * // Continue with admin-only logic
 * ```
 */
export async function requireAdmin(): Promise<NextResponse | null> {
    try {
        // Check authentication
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized: Authentication required' },
                { status: 401 }
            );
        }

        // Check admin access
        const user = await currentUser();
        const userEmail = user?.emailAddresses[0]?.emailAddress;
        
        if (!isAdmin(userId, userEmail)) {
            return NextResponse.json(
                { error: 'Forbidden: Admin access required' },
                { status: 403 }
            );
        }

        return null; // User is authorized
    } catch (error) {
        console.error('Error in requireAdmin:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

/**
 * Check if user is authenticated (no admin check)
 * Returns error response if not authenticated, null if authenticated
 */
export async function requireAuth(): Promise<NextResponse | null> {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized: Authentication required' },
                { status: 401 }
            );
        }
        return null;
    } catch (error) {
        console.error('Error in requireAuth:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

