import { NextRequest, NextResponse } from 'next/server';
import { apiKeyService } from './db-service';

export type ApiRequest = NextRequest & {
  apiKey?: {
    id: number;
    userId: string;
    apiKey: string;
    name: string;
    createdAt: number;
    expiresAt: number | null;
    lastUsedAt: number | null;
    isActive: boolean;
  };
};

export async function validateApiKey(req: ApiRequest) {
  if (!req.nextUrl.pathname.startsWith('/api/data/')) {
    return NextResponse.next();
  }
  
  const xApiKey = req.headers.get('X-API-Key');
  
  const authHeader = req.headers.get('Authorization');
  const bearerToken = authHeader && authHeader.startsWith('Bearer ') 
    ? authHeader.substring(7) 
    : null;
  
  const searchParams = await req.nextUrl.searchParams;
  const queryApiKey = searchParams.get('apiKey');
  
  const apiKey = xApiKey || bearerToken || queryApiKey;
  
  if (!apiKey) {
    return NextResponse.json(
      { 
        error: 'API key missing', 
        message: 'Please provide an API key via X-API-Key header, Authorization: Bearer header, or apiKey query parameter.',
        docs: 'https://docs.openalbion.org' 
      },
      { status: 401 }
    );
  }

  const keyData = apiKeyService.validateApiKey(apiKey);
  
  if (!keyData) {
    return NextResponse.json(
      { error: 'Invalid or expired API key.' },
      { status: 401 }
    );
  }
  
  (req as ApiRequest).apiKey = keyData;
  
  return NextResponse.next();
}

export function withApiKeyValidation(handler: (req: ApiRequest) => Promise<NextResponse>) {
  return async function(req: NextRequest) {
    const response = await validateApiKey(req as ApiRequest);
    
    if (response.status !== 200) {
      return response;
    }
    
    return handler(req as ApiRequest);
  };
}

export async function parseQueryParams(req: NextRequest) {
  const searchParams = await req.nextUrl.searchParams;
  
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '100', 10);
  const sortBy = searchParams.get('sortBy') || undefined;
  const sortOrder = searchParams.get('sortOrder') as 'asc' | 'desc' | undefined;
  
  return {
    page,
    limit: Math.min(limit, 1000), 
    sortBy,
    sortOrder
  };
}