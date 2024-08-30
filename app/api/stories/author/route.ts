import { NextRequest, NextResponse } from 'next/server';
import { getStoriesByAuthor } from '@/lib/controllers/storyControllers';

export async function GET(request: NextRequest) {
    return getStoriesByAuthor(request);
}
