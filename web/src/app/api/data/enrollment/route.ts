import { NextResponse } from 'next/server';
import { enrollmentService } from '@/lib/db-service';
import { withApiKeyValidation, ApiRequest, parseQueryParams } from '@/lib/api-middleware';

const handler = async (req: ApiRequest) => {
  try {
    const { searchParams } = req.nextUrl;
    const paginationOptions = parseQueryParams(req);
    
    const academicYear = searchParams.get('academicYear') || null;
    const category = searchParams.get('category') || null;
    
    let result;
    
    if (academicYear) {
      result = enrollmentService.getByAcademicYear(academicYear, paginationOptions);
    } else if (category) {
      result = enrollmentService.getByCategory(category, paginationOptions);
    } else {
      result = enrollmentService.getAll(paginationOptions);
    }
    
    return NextResponse.json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error('Error fetching enrollment data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch enrollment data' },
      { status: 500 }
    );
  }
};

export const GET = withApiKeyValidation(handler);

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';