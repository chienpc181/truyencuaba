import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Story from '@/lib/models/Story';

export async function createStory(request: NextRequest) {
    await dbConnect();  // Connect to the database
    const { title, author, paragraphs, genre, thumbnailUrl, introduction } = await request.json();

    if (!title) {
        return NextResponse.json({ message: 'Title and Author are required' }, { status: 400 });
    }

    const story = new Story({
        title,
        author,
        genre,
        paragraphs,
        thumbnailUrl,
        introduction
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
        limit: url.searchParams.get('limit') || '10'
    };
    const sortingOptions = {
        sort: url.searchParams.get('sort') || 'asc'
    };
    const queryOptions = {}; // Build your query options here

    const page = Number(paginationOptions.page);
    const limit = Number(paginationOptions.limit);
    const sortOrder = sortingOptions.sort === 'asc' ? 1 : -1;
    const sortOption: any = { createdAt: sortOrder };
    const stories = await Story.find(queryOptions)
        .select('title genre author thumbnailUrl introduction createdAt')
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

export async function getStoriesByAuthor(request: NextRequest) {
    await dbConnect();  // Connect to the database
    const url = new URL(request.url);
    const author = url.searchParams.get('author') || '';
    const sortingOptions = {
        sort: url.searchParams.get('sort') || 'asc'
    };
    const limit = url.searchParams.get('limit') || '100';

    const sortOrder = sortingOptions.sort === 'asc' ? 1 : -1;
    const sortOption: any = { 'title.en': sortOrder };

    const stories = await Story.find({ author: new RegExp(author, 'i') })  // Case-insensitive search for author
        .select('title genre author thumbnailUrl introduction createdAt')
        .sort(sortOption)
        .limit(Number(limit));

    return NextResponse.json({
        stories,
        totalStories: stories.length,
    });
}

export async function searchStories(request: NextRequest) {
    try {
        await dbConnect();  // Connect to the database
        const url = new URL(request.url);
        const search = url.searchParams.get('search') || '';
        const paginationOptions = {
            page: url.searchParams.get('page') || '1',
            limit: url.searchParams.get('limit') || '10'
        };
        const sortingOptions = {
            sort: url.searchParams.get('sort') || 'desc'
        };

        let query: any = {};

        if (search) {
            const words = search.split(' ').map(word => word.trim()).filter(Boolean);
            if (words.length > 0) {
                query.$and = words.map(word => ({
                    $or: [
                        { 'title.en': { $regex: word, $options: 'i' } },
                        { 'title.vi': { $regex: word, $options: 'i' } },
                        { author: { $regex: word, $options: 'i' } },
                        { 'paragraphs.en': { $regex: word, $options: 'i' } },
                        { 'paragraphs.vi': { $regex: word, $options: 'i' } }
                    ]
                }));
            }
        }

        const page = Number(paginationOptions.page);
        const limit = Number(paginationOptions.limit);
        const sortOrder = sortingOptions.sort === 'desc' ? -1 : 1;
        const sortOption: any = { createdAt: sortOrder }; // Sort by createdAt
        const stories = await Story.find(query)
            .select('title genre author thumbnailUrl introduction createdAt')
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
    } catch (error) {
        return NextResponse.json({ error: 'An error occurred while searching for stories.' }, { status: 500 });
    }
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

export async function getAllAuthors() {
    await dbConnect();
  
    // Use MongoDB's distinct method to get a list of unique authors
    const authors = await Story.distinct('author');
  
    return authors;
  }
