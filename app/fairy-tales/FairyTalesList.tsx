'use client'

import { useState, useEffect } from 'react'
import StoryCard from '@/components/StoryCard'
import {getStories} from '@/lib/api'

interface Story {
  _id: string
  title: string
  description: string
  content: string
}

interface FairyTalesListProps {
  initialStories: Story[]
}

export default function FairyTalesList({ initialStories }: FairyTalesListProps) {
  const [stories, setStories] = useState<Story[]>(initialStories)
  const [filters, setFilters] = useState({
    sortBy: 'popular',
    ageGroup: 'all',
    genre: 'all',
  })

//   useEffect(() => {
//     if (filters.sortBy !== 'popular' || filters.ageGroup !== 'all' || filters.genre !== 'all') {
//       api.getStoriesByCategory('fairy-tale', filters)
//         .then(data => setStories(data))
//         .catch(error => console.error('Failed to fetch stories:', error))
//     }
//   }, [filters])


const [language, setLanguage] = useState('vi');

useEffect(() => {
  const savedLanguage = localStorage.getItem('language');
  if (savedLanguage) {
    setLanguage(savedLanguage);
  }
}, []);

  const handleFilterChange = (filterType: string, value: string) => {
    // setFilters(prevFilters => ({ ...prevFilters, [filterType]: value }))

    getStories()
    .then(data => setStories([data.stories[0], data.stories[1]]))
    .catch(error => console.error('Failed to fetch stories:', error))
  }

    

  return (
    <div>
      <h1 className="text-3xl font-bold">Fairy Tales</h1>

      <div className="flex space-x-4 my-4">
        <select 
          value={filters.sortBy} 
          onChange={(e) => handleFilterChange('sortBy', e.target.value)} 
          className="border p-2"
        >
          <option value="popular">Most Popular</option>
          <option value="new">New Arrivals</option>
        </select>

        <select 
          value={filters.ageGroup} 
          onChange={(e) => handleFilterChange('ageGroup', e.target.value)} 
          className="border p-2"
        >
          <option value="all">All Ages</option>
          <option value="kids">Kids</option>
          <option value="teens">Teens</option>
          <option value="adults">Adults</option>
        </select>

        <select 
          value={filters.genre} 
          onChange={(e) => handleFilterChange('genre', e.target.value)} 
          className="border p-2"
        >
          <option value="all">All Genres</option>
          <option value="fantasy">Fantasy</option>
          <option value="adventure">Adventure</option>
          <option value="mystery">Mystery</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stories.map((story: any) => (
          <StoryCard key={story._id} story={story} language={language}/>
        ))}
      </div>
    </div>
  )
}
