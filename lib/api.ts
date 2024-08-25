// const API_BASE_URL = 'https://truyen-cua-ba.vercel.app';
const API_BASE_URL = 'https://truyencuaba.vercel.app';

async function getStoriesByCategory(category: string, filters: any) {
    const query = new URLSearchParams(filters).toString()
    const response = await fetch(`${API_BASE_URL}/stories?category=${category}&${query}`)
    if (!response.ok) {
      throw new Error('Failed to fetch stories')
    }
    return response.json()
  }

async function getStories() {
    const response = await fetch(`${API_BASE_URL}/api/stories`, { cache: 'no-store' })
    if (!response.ok) {
      throw new Error('Failed to fetch stories')
    }
    return response.json()
}

async function getAllStoryIds() {
    const response = await fetch(`${API_BASE_URL}/api/stories`, { cache: 'no-store' })
    if (!response.ok) {
        throw new Error('Failed to fetch stories')
      }
    const data = await response.json()
    const stories = data.stories
  
    return stories.map((story: { _id: string }) => ({id: story._id}))
  }

async function getStoryById(id: string) {
    // const response = await fetch(`${API_BASE_URL}/api/stories/${storyId}`, { cache: 'force-cache' })
    const response = await fetch(`${API_BASE_URL}/api/stories/${id}`, { cache: 'no-store' })
    
    if (!response.ok) {
      throw new Error('Failed to fetch story data')
    }
    return response.json()
  }

export {getStoriesByCategory, getStories, getStoryById, getAllStoryIds}
  