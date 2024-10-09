// import dbConnect from "./dbConnect"
// import Story from "./models/Story"

// const API_BASE_URL = 'https://truyen-cua-ba.vercel.app';
const API_BASE_URL = 'https://truyencuaba.vercel.app';
// const API_BASE_URL = 'http://localhost:8000';

export async function getStoriesByCategory(category: string, filters: any) {
  const query = new URLSearchParams(filters).toString()
  const response = await fetch(`${API_BASE_URL}/stories?category=${category}&${query}`)
  if (!response.ok) {
    throw new Error('Failed to fetch stories')
  }
  return response.json()
}

export async function getStories() {
  const response = await fetch(`${API_BASE_URL}/api/stories`, { cache: 'no-store' })
  if (!response.ok) {
    throw new Error('Failed to fetch stories')
  }
  return response.json()
}

export async function getAllStoryIds() {
  const response = await fetch(`${API_BASE_URL}/api/stories`)
  if (!response.ok) {
    throw new Error('Failed to fetch stories')
  }
  const data = await response.json()
  const stories = data.stories

  return stories.map((story: { _id: string }) => ({ id: story._id }))
}

export async function getStoryById(id: string) {
  // const response = await fetch(`/api/stories/${storyId}`, { cache: 'force-cache' })
  const response = await fetch(`${API_BASE_URL}/api/stories/${id}`, {
    next: { revalidate: 600 }
  })

  if (!response.ok) {
    throw new Error('Failed to fetch story data')
  }
  return response.json()
}

export async function getAllAuthors() {
  // await dbConnect();

  // // Use MongoDB's distinct method to get a list of unique authors
  // const authors = await Story.distinct('author');

  return ['Brothers Grimm', 'Hans Christian Andersen', 'Aesop', 'FolkTales', 'LegendTales'];
}

export async function getStoriesByAuthor(author: string) {
  const response = await fetch(`${API_BASE_URL}/api/stories/author?author=${author}`, {
    next: {revalidate: 600}
  })
  if (!response.ok) {
    throw new Error('Failed to fetch story data')
  }
  return response.json()
}

// export { getStoriesByCategory, getStories, getStoryById, getAllStoryIds }
