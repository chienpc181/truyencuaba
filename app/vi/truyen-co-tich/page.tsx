import { Metadata } from 'next';
import Carousel from '@/components/Carousel';
import CategoryHeader from '@/components/CategoryHeader';
import Loading from '@/components/Loading';

export const metadata: Metadata = {
    title: "Truyện cổ tích - truyencuaba",
    description: "Truyện cổ tích Việt nam và thế giới",
};

const page = 1;
const limit = 5;

async function fetchStoriesByAuthor(author: string) {
    const response = await fetch(`${process.env.BASE_URL}/api/stories/author?author=${author}&limit=${limit}`,
        // { cache: 'no-store' }
    )
    if (!response.ok) {
        throw new Error('Failed to fetch story data')
    }
    return response.json()
}

export default async function Page() {
    const [storiesByBrothersGrimm, storiesByAndersen, fableAesops, folkTales, legendTales] = await Promise.all([
        fetchStoriesByAuthor('Brothers Grimm'),
        fetchStoriesByAuthor('Hans Christian Andersen'),
        fetchStoriesByAuthor('Aesop'),
        fetchStoriesByAuthor('FolkTales'),
        fetchStoriesByAuthor('LegendTales'),
    ]);

    return (
        <div className='page-container' >
            <hgroup className='page-header'>
                <h1 >Thế Giới Của Truyện Cổ Tích và Ngụ Ngôn</h1>
                <p >Chào mừng bạn đến với thế giới diệu kỳ, nơi trí tưởng tượng sống động qua sức hút vượt thời gian của những câu chuyện cổ tích và ngụ ngôn. Bộ sưu tập này tập hợp những câu chuyện được yêu mến từ các tác giả huyền thoại, mang đến những cuộc phiêu lưu đầy thú vị với các loài động vật biết nói, những anh hùng dũng cảm và những vùng đất phép thuật. Mỗi câu chuyện đều chứa đựng một bài học ý nghĩa, dù là về lòng tốt, sự thông minh, hay tầm quan trọng của lòng can đảm. Từ những câu chuyện cổ tích mê hoặc của Anh em Grimm và Hans Christian Andersen đến những câu chuyện ngụ ngôn sâu sắc của Aesop, mỗi câu chuyện là một cánh cửa mở ra thế giới của kỳ diệu và trí tuệ. Hãy để những carousel dẫn bạn qua những câu chuyện cuốn hút này và bắt đầu một hành trình không thể quên vào thế giới của nghệ thuật kể chuyện.</p>
            </hgroup>
            <div></div>
            <section className='mt-4'>
                <CategoryHeader label='Anh em nhà Grimm' url='/vi/truyen-co-tich/tac-gia/Brothers Grimm'></CategoryHeader>
                <Carousel stories={storiesByBrothersGrimm.stories}></Carousel>
            </section>
            <section className='mt-4'>
                <CategoryHeader label='Truyện cổ tích Andersen' url='/vi/truyen-co-tich/tac-gia/Hans Christian Andersen'></CategoryHeader>
                <Carousel stories={storiesByAndersen.stories}></Carousel>
            </section>
            <section className='mt-4'>
                <CategoryHeader label='Truyện ngụ ngôn Aesop' url='/vi/truyen-co-tich/tac-gia/Aesop'></CategoryHeader>
                <Carousel stories={fableAesops.stories}></Carousel>
            </section>
            <section className='mt-4'>
                <CategoryHeader label='Truyện dân gian' url='/vi/truyen-co-tich/tac-gia/FolkTales'></CategoryHeader>
                <Carousel stories={folkTales.stories}></Carousel>
            </section>
            <section className='mt-4'>
                <CategoryHeader label='Truyền thuyết, sự tích' url='/vi/truyen-co-tich/tac-gia/LegendTales'></CategoryHeader>
                <Carousel stories={legendTales.stories}></Carousel>
            </section>
        </div>
    )
}

