import { NextRequest, NextResponse } from 'next/server';
import { getStory, updateStory } from '@/lib/controllers/storyControllers';
import { protect, authorize } from '@/lib/middleware/authMiddleware';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    return getStory(request, params.id);
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
    // await protect(request);
    // await authorize(request, ['admin', 'super admin']);
    return updateStory(request, params.id);
}
