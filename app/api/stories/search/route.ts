import { NextRequest, NextResponse } from 'next/server';
import { searchStories } from '@/lib/controllers/storyControllers';

export async function GET(request: NextRequest) {
    return searchStories(request);
}
