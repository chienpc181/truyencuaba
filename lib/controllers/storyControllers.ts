import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Story from '@/lib/models/Story';

export async function createStory(request: NextRequest) {
    await dbConnect();  // Connect to the database
    const { title, author, paragraphs, genre, thumbnailUrl, ages } = await request.json();

    if (!title) {
        return NextResponse.json({ message: 'Title and Author are required' }, { status: 400 });
    }

    const story = new Story({
        title,
        author,
        genre,
        paragraphs,
        thumbnailUrl,
        ages
    });

    const createdStory = await story.save();
    return NextResponse.json(createdStory, { status: 201 });
}

export async function updateStory(request: NextRequest, id: string) {
    await dbConnect();  // Connect to the database
    const story = await Story.findById(id);
    if (!story) {
        return NextResponse.json({ message: 'Story not found' }, { status: 404 });
    }

    const updatedData = await request.json();
    Object.keys(updatedData).forEach(key => {
        story[key] = updatedData[key];
    });

    const updatedStory = await story.save();
    return NextResponse.json(updatedStory);
}

export async function getStories(request: NextRequest) {
    await dbConnect();  // Connect to the database
    const url = new URL(request.url);
    const paginationOptions = {
        page: url.searchParams.get('page') || '1',
        limit: url.searchParams.get('limit') || '2'
    };
    const sortingOptions = {
        sort: url.searchParams.get('sort') || 'asc'
    };
    const queryOptions = {}; // Build your query options here

    const page = Number(paginationOptions.page);
    const limit = Number(paginationOptions.limit);
    const sortOrder = sortingOptions.sort === 'asc' ? 1 : -1;
    const sortOption = { title: sortOrder };

    const stories = await Story.find(queryOptions)
        .select('title genre author ages thumbnailUrl description')
        .sort(sortOption)
        .limit(limit)
        .skip((page - 1) * limit);

    const totalStories = await Story.countDocuments(queryOptions);
    const totalPages = Math.ceil(totalStories / limit);

    return NextResponse.json({
        stories,
        totalPages,
        currentPage: page,
    });
}

export async function searchStories(request: NextRequest) {
    await dbConnect();  // Connect to the database
    const url = new URL(request.url);
    const search = url.searchParams.get('search') || '';
    const paginationOptions = {
        page: url.searchParams.get('page') || '1',
        limit: url.searchParams.get('limit') || '10'
    };
    const sortingOptions = {
        sort: url.searchParams.get('sort') || 'asc'
    };

    const query = {};
    if (search) {
        const words = search.split(' ').map(word => word.trim()).filter(Boolean);
        const searchConditions = words.map(word => ({
            $or: [
                { 'title.en': { $regex: word, $options: 'i' } },
                { 'title.vi': { $regex: word, $options: 'i' } },
                { author: { $regex: word, $options: 'i' } },
                { 'paragraphs.en': { $regex: word, $options: 'i' } },
                { 'paragraphs.vi': { $regex: word, $options: 'i' } }
            ]
        }));
        // if (searchConditions.length > 0) {
        //     query.$or = searchConditions;
        // }
    }

    const page = Number(paginationOptions.page);
    const limit = Number(paginationOptions.limit);
    const sortOrder = sortingOptions.sort === 'asc' ? 1 : -1;
    const sortOption = { title: sortOrder };

    const stories = await Story.find(query)
        .select('title genre author ages thumbnailUrl description')
        .sort(sortOption)
        .limit(limit)
        .skip((page - 1) * limit);

    const totalStories = await Story.countDocuments(query);
    const totalPages = Math.ceil(totalStories / limit);

    return NextResponse.json({
        stories,
        totalPages,
        currentPage: page,
    });
}

export async function getStory(request: NextRequest, id: string) {
    await dbConnect();  // Connect to the database
    const story = await Story.findById(id);
    if (story) {
        return NextResponse.json(story);
    } else {
        return NextResponse.json({ message: 'Story not found' }, { status: 404 });
    }
}
