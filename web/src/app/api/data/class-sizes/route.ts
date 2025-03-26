import { NextResponse } from 'next/server';
import { classSizeService } from '@/lib/db-service';
import { withApiKeyValidation, ApiRequest, parseQueryParams } from '@/lib/api-middleware';

const handler = async (req: ApiRequest) => {
  try {
    const searchParams = await req.nextUrl.searchParams;
    const paginationOptions = await parseQueryParams(req);
    
    const departmentId = searchParams.get('departmentId') ? parseInt(searchParams.get('departmentId') as string, 10) : null;
    const term = searchParams.get('term') || null;
    
    let result;
    
    if (departmentId) {
      result = classSizeService.getByDepartment(departmentId, paginationOptions);
    } else if (term) {
      result = classSizeService.getByTerm(term, paginationOptions);
    } else {
      result = classSizeService.getAll(paginationOptions);
    }
    
    return NextResponse.json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error('Error fetching class sizes:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch class sizes' },
      { status: 500 }
    );
  }
};

export const GET = withApiKeyValidation(handler);

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';