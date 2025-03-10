import { NextRequest, NextResponse } from 'next/server';
import { getUser } from '@/lib/auth';
import { statisticsService } from '@/lib/db-service';

interface DatabaseError extends Error {
  code?: string;
}

export async function GET(request: NextRequest) {
  try {
    const user = await getUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'You must be logged in to access this endpoint' },
        { status: 401 }
      );
    }
    
    const url = new URL(request.url);
    const requestedUserId = url.searchParams.get('userId');
    
    if (requestedUserId && requestedUserId !== user.id) {
      return NextResponse.json(
        { error: 'Forbidden', message: 'You do not have permission to access this data' },
        { status: 403 }
      );
    }
    
    const userId = requestedUserId || user.id;
    
    try {
      const stats = await statisticsService.getDashboardStats(userId);
      if (!stats) {
        return NextResponse.json(
          { message: 'Database is being initialized, please try again later' },
          { status: 503 }
        );
      }
      return NextResponse.json(stats);
    } catch (error) {
      const dbError = error as DatabaseError;
      if (process.env.NODE_ENV === 'production' && 
          (dbError.code === 'SQLITE_CANTOPEN' || dbError.code === 'SQLITE_ERROR')) {
        return NextResponse.json(
          { message: 'Database is being initialized, please try again later' },
          { status: 503 }
        );
      }
      throw error;
    }
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    
    return NextResponse.json(
      { error: 'Internal Server Error', message: 'Failed to fetch dashboard statistics' },
      { status: 500 }
    );
  }
} 