import { NextResponse } from 'next/server';
import { facultyService } from '@/lib/db-service';
import { withApiKeyValidation, ApiRequest, parseQueryParams } from '@/lib/api-middleware';

const handler = async (req: ApiRequest) => {
  try {
    const { searchParams } = req.nextUrl;
    const paginationOptions = parseQueryParams(req);
    
    const departmentId = searchParams.get('departmentId') ? parseInt(searchParams.get('departmentId') as string, 10) : null;
    const year = searchParams.get('year') || null;
    const appointmentType = searchParams.get('appointmentType') || null;
    
    let result;
    
    if (departmentId) {
      result = facultyService.getByDepartment(departmentId, paginationOptions);
    } else if (year) {
      result = facultyService.getByYear(year, paginationOptions);
    } else if (appointmentType) {
      result = facultyService.getByAppointmentType(appointmentType, paginationOptions);
    } else {
      result = facultyService.getAll(paginationOptions);
    }
    
    return NextResponse.json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error('Error fetching faculty characteristics:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch faculty characteristics' },
      { status: 500 }
    );
  }
};

export const GET = withApiKeyValidation(handler);