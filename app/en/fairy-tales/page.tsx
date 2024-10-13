import { Metadata } from 'next';
import Carousel from '@/components/Carousel';
import CategoryHeader from '@/components/CategoryHeader';
import Loading from '@/components/Loading';
import dynamic from 'next/dynamic';
import { getStoriesByAuthor } from '@/lib/api';

export const metadata: Metadata = {
  title: "Fairy Tales - truyencuaba",
  description: "Wonderful fairy tales",
};


export default async function Page() {
  const [storiesByBrothersGrimm, storiesByAndersen, fableAesops] = await Promise.all([
    getStoriesByAuthor('Brothers Grimm'),
    getStoriesByAuthor('Hans Christian Andersen'),
    getStoriesByAuthor('Aesop'),
  ]);

  return (
    <div className='page-container' >
      <hgroup className='page-header'>
        <h1 >A World of Fairy Tales and Fables</h1>
        <p >Welcome to a magical world where imagination comes alive through the timeless charm of fairy tales and fables. This collection brings together beloved stories from legendary authors, offering adventures filled with talking animals, brave heroes, and enchanted lands. Each tale holds a special lesson, whether it’s about kindness, cleverness, or the importance of courage. From the enchanting fairy tales of the Brothers Grimm and Hans Christian Andersen to the thought-provoking fables of Aesop, every story offers a unique doorway to wonder and wisdom. Let the carousels guide you through these captivating tales, and embark on an unforgettable journey into the world of storytelling.</p>
      </hgroup>
      <div>
        <section>
          <CategoryHeader label='Stories of Brothers Grimm' url='/en/fairy-tales/author/Brothers Grimm'></CategoryHeader>
          <Carousel stories={storiesByBrothersGrimm.stories}></Carousel>
        </section>
        <section className='mt-4'>
          <CategoryHeader label='Stories of Andersen' url='/en/fairy-tales/author/Hans Christian Andersen'></CategoryHeader>
          <Carousel stories={storiesByAndersen.stories}></Carousel>
        </section>
        <section className='mt-4'>
          <CategoryHeader label='Fables of Aesop' url='/en/fairy-tales/author/Aesop'></CategoryHeader>
          <Carousel stories={fableAesops.stories}></Carousel>
        </section>
      </div>

    </div>
  )
}

