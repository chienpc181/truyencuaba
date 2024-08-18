import FairyTalesList from './FairyTalesList'
import {getStories} from '@/lib/api'


export default async function Page() {
  const data = await getStories();
  const initialStories = data.stories;
  return (
    <div className='page-container'>
      <FairyTalesList initialStories={initialStories} />
    </div>
  )
}
