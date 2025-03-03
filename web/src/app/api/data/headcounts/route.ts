import { NextResponse } from 'next/server';
import { headcountService } from '@/lib/db-service';
import { withApiKeyValidation, ApiRequest, parseQueryParams } from '@/lib/api-middleware';

const handler = async (req: ApiRequest) => {
  try {
    const { searchParams } = req.nextUrl;
    const paginationOptions = parseQueryParams(req);
    
    const startYear = searchParams.get('startYear') ? parseInt(searchParams.get('startYear') as string, 10) : null;
    const endYear = searchParams.get('endYear') ? parseInt(searchParams.get('endYear') as string, 10) : null;
    const year = searchParams.get('year') ? parseInt(searchParams.get('year') as string, 10) : null;
    
    let result;
    
    if (year) {
      const headcount = headcountService.getByYear(year);
      result = {
        data: headcount ? [headcount] : [],
        pagination: {
          total: headcount ? 1 : 0,
          page: 1,
          limit: 1,
          totalPages: 1
        }
      };
    } else if (startYear && endYear) {
      result = headcountService.getByYearRange(startYear, endYear, paginationOptions);
    } else {
      result = headcountService.getAll(paginationOptions);
    }
    
    return NextResponse.json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error('Error fetching headcounts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch headcounts' },
      { status: 500 }
    );
  }
};

export const GET = withApiKeyValidation(handler);