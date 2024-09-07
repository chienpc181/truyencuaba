
export default function AuthorIntroduce_EN({ author }: { author: string }) {
    const generateHeader = () => {
        if (author === 'Brothers Grimm') {
            return 'Discover the Magical World of the Brothers Grimm'
        }
        else if (author === 'Hans Christian Andersen') {
            return 'Hans Christian Andersen: Master of Fairy Tales'
        }
        else if (author === 'Aesop') {
            return 'Aesop’s Fables: Lessons of Life Through Story'
        }
        else if (author === 'FolkTales') {
            return 'Folk Tales: Stories of Wisdom and Kindness'
        } 
        else if (author === 'LegendTales') {
            return 'Legend Tales: The Birth of Heroes and Traditions'
        } 
        else {
            return 'Stories by ' + author
        }
    }
    const generateIntroduction = () => {
        if (author === 'Brothers Grimm') {
            return "Step into the enchanting universe of the Brothers Grimm, where every story is a doorway to a world of wonder, mystery, and timeless lessons. These legendary storytellers from Germany captured the hearts of generations with tales like Cinderella, Snow White, and Hansel and Gretel. From brave heroes and clever tricksters to magical creatures and enchanted lands, each tale is filled with imagination and wisdom. Whether you seek adventure or a moral lesson, the Brothers Grimm's stories continue to captivate young and old alike. Explore their magical collection and let the adventure begin!"
        }
        else if (author === 'Hans Christian Andersen') {
            return "Enter the world of Hans Christian Andersen, the beloved Danish author whose timeless fairy tales have sparked the imaginations of children and adults worldwide. With enchanting stories like The Little Mermaid, The Ugly Duckling, and The Snow Queen, Andersen takes us on unforgettable journeys through magical lands filled with wonder, emotion, and profound life lessons. His tales are not only filled with fantasy but also with heartwarming messages about love, bravery, and the human spirit. Dive into his world and rediscover the magic of storytelling with Andersen's unforgettable creations."
        }
        else if (author === 'Aesop') {
            return "Step into the world of Aesop, the ancient storyteller whose fables have shaped our understanding of wisdom, morality, and human nature for centuries. Famous for short, impactful tales like The Tortoise and the Hare and The Fox and the Grapes, Aesop’s fables offer timeless life lessons wrapped in the charm of animal characters and simple narratives. Each story carries a powerful message that resonates across generations, reminding us of virtues like honesty, kindness, and perseverance. Explore Aesop’s collection and uncover the timeless truths within these treasured fables."
        }
        else if (author === 'FolkTales') {
            return "Dive into the heart of Vietnamese culture through its captivating folk tales, where simple characters often outwit the odds and magical elements blend seamlessly with everyday life. Tales like Cây Tre Trăm Đốt and Thạch Sanh transport readers to a world of clever farmers, brave heroes, and moral lessons that reflect the wisdom of the Vietnamese people. Each story is a treasure trove of cultural values, teaching us about kindness, courage, and the importance of standing up for what’s right. Explore these timeless folk tales and uncover the rich heritage of Vietnam."
        } 
        else if (author === 'LegendTales') {
            return "Step into the ancient world of Vietnamese legend tales, where gods, heroes, and mythical creatures shape the destiny of a nation. These epic stories, such as Sơn Tinh Thủy Tinh and Sự Tích Bánh Chưng Bánh Dày, reveal the origins of traditions and the enduring strength of the Vietnamese spirit. From epic battles to the birth of beloved cultural customs, each tale is steeped in the history and beliefs of Vietnam. Journey through these legendary tales and discover the stories that continue to inspire and define the nation’s identity."
        }
        else {

        }
    }
    return (
        <hgroup className='page-header'>
            <h1 >{generateHeader()}</h1>
            <p>{generateIntroduction()}</p>
        </hgroup>

    );
}
