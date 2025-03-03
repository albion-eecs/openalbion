import { NextRequest, NextResponse } from 'next/server';
import { apiKeyService } from '@/lib/db-service';
import { getUser } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const user = await getUser();
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const apiKeys = apiKeyService.getApiKeysByUserId(user.id);
    
    return NextResponse.json({
      success: true,
      data: apiKeys
    });
  } catch (error) {
    console.error('Error fetching API keys:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch API keys' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getUser();
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const body = await req.json();
    const { name, expiresInDays } = body;
    
    if (!name) {
      return NextResponse.json(
        { success: false, error: 'API key name is required' },
        { status: 400 }
      );
    }
    
    const apiKey = apiKeyService.createApiKey(
      user.id,
      name,
      expiresInDays ? parseInt(expiresInDays, 10) : undefined
    );
    
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'Failed to create API key' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: apiKey
    });
  } catch (error) {
    console.error('Error creating API key:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create API key' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await getUser();
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { searchParams } = req.nextUrl;
    const keyId = searchParams.get('id');
    
    if (!keyId) {
      return NextResponse.json(
        { success: false, error: 'API key ID is required' },
        { status: 400 }
      );
    }
    
    const action = searchParams.get('action') || 'revoke';
    let success = false;
    
    if (action === 'delete') {
      success = apiKeyService.deleteApiKey(parseInt(keyId, 10), user.id);
    } else {
      success = apiKeyService.revokeApiKey(parseInt(keyId, 10), user.id);
    }
    
    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Failed to perform action on API key' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: action === 'delete' ? 'API key deleted successfully' : 'API key revoked successfully'
    });
  } catch (error) {
    console.error('Error managing API key:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to manage API key' },
      { status: 500 }
    );
  }
}