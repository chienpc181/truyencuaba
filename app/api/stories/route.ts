import { NextRequest, NextResponse } from 'next/server';
import { getStories, createStory } from '@/lib/controllers/storyControllers';
import { protect, authorize } from '@/lib/middleware/authMiddleware';

export async function GET(request: NextRequest) {
    return getStories(request);
}

export async function POST(request: NextRequest) {
    // await protect(request);
    // await authorize(request, ['admin', 'super admin']);
    return createStory(request);
}
