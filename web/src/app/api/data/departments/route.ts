import { NextResponse } from 'next/server';
import { departmentService } from '@/lib/db-service';
import { withApiKeyValidation, ApiRequest } from '@/lib/api-middleware';

const handler = async (req: ApiRequest) => {
  try {
    const departments = departmentService.getAll();
    
    return NextResponse.json({
      success: true,
      data: departments
    });
  } catch (error) {
    console.error('Error fetching departments:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch departments' },
      { status: 500 }
    );
  }
};

export const GET = withApiKeyValidation(handler);

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';