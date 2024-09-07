
export default function AuthorIntroduce_VI({ author }: { author: string }) {
    const generateHeader = () => {
        if (author === 'Brothers Grimm') {
            return 'Khám Phá Thế Giới Kỳ Diệu Của Anh Em Nhà Grimm'
        }
        else if (author === 'Hans Christian Andersen') {
            return 'Hans Christian Andersen: Nhà Văn Lỗi Lạc Của Những Câu Chuyện Cổ Tích'
        }
        else if (author === 'Aesop') {
            return 'Ngụ Ngôn Aesop: Bài Học Cuộc Sống Qua Những Câu Chuyện'
        }
        else if (author === 'FolkTales') {
            return 'Truyện Dân Gian: Những Câu Chuyện Về Sự Thông Minh và Nhân Hậu'
        } 
        else if (author === 'LegendTales') {
            return 'Vietnamese Legend Tales: Sự Ra Đời Của Các Anh Hùng và Truyền Thống Dân Tộc'
        } 
        else {
            return 'Stories by ' + author
        }
    }
    const generateIntroduction = () => {
        if (author === 'Brothers Grimm') {
            return "Hãy bước vào vũ trụ huyền diệu của Anh em Grimm, nơi mỗi câu chuyện là cánh cửa mở ra một thế giới đầy kỳ quan, bí ẩn và những bài học vượt thời gian. Anh em tác giả người Đức đã chiếm trọn trái tim của biết bao thế hệ với các câu chuyện như Lọ Lem, Bạch Tuyết và Hansel và Gretel. Từ những anh hùng dũng cảm và kẻ láu cá thông minh đến sinh vật phép thuật và vùng đất thần tiên, mỗi câu chuyện đều tràn ngập trí tưởng tượng và sự khôn ngoan. Dù bạn tìm kiếm cuộc phiêu lưu hay một bài học đạo đức, những câu chuyện của Anh em Grimm vẫn tiếp tục mê hoặc cả trẻ em lẫn người lớn. Hãy khám phá bộ sưu tập kỳ diệu của họ và để cuộc phiêu lưu bắt đầu!"
        }
        else if (author === 'Hans Christian Andersen') {
            return "Hãy bước vào thế giới của Hans Christian Andersen, tác giả người Đan Mạch được yêu mến với những câu chuyện cổ tích vượt thời gian đã khơi gợi trí tưởng tượng của trẻ em và người lớn khắp thế giới. Với những câu chuyện mê hoặc như Nàng Tiên Cá, Chú Vịt Con Xấu Xí và Nữ Hoàng Tuyết, Andersen đưa chúng ta vào những cuộc hành trình không thể quên qua những vùng đất phép màu, đầy cảm xúc và bài học sâu sắc về cuộc sống. Những câu chuyện của ông không chỉ tràn ngập phép thuật mà còn chứa đựng những thông điệp cảm động về tình yêu, lòng dũng cảm và tinh thần con người. Hãy đắm mình trong thế giới của ông và khám phá lại sự kỳ diệu của nghệ thuật kể chuyện qua những tác phẩm không thể nào quên của Andersen."
        }
        else if (author === 'Aesop') {
            return "Hãy bước vào thế giới của Aesop, người kể chuyện cổ xưa đã định hình cách chúng ta hiểu về trí tuệ, đạo đức và bản chất con người trong suốt nhiều thế kỷ qua. Nổi tiếng với những câu chuyện ngắn nhưng sâu sắc như Rùa và Thỏ và Cáo và Chùm Nho, những câu chuyện ngụ ngôn của Aesop mang đến những bài học cuộc sống vượt thời gian thông qua sức hấp dẫn của các nhân vật động vật và những câu chuyện đơn giản. Mỗi câu chuyện đều chứa đựng một thông điệp mạnh mẽ vang vọng qua nhiều thế hệ, nhắc nhở chúng ta về những đức tính như sự chân thành, lòng tốt và kiên trì. Hãy khám phá bộ sưu tập của Aesop và tìm ra những sự thật vĩnh cửu trong những câu chuyện quý giá này."
        }
        else if (author === 'FolkTales') {
            return "Hãy khám phá tinh hoa văn hóa Việt Nam qua những câu chuyện cổ tích hấp dẫn, nơi các nhân vật giản dị thường vượt qua khó khăn bằng sự thông minh và những yếu tố phép thuật hòa quyện với cuộc sống thường ngày. Những câu chuyện như Cây Tre Trăm Đốt và Thạch Sanh đưa người đọc vào thế giới của những người nông dân thông minh, anh hùng dũng cảm và các bài học đạo đức phản ánh trí tuệ của dân tộc Việt Nam. Mỗi câu chuyện là một kho tàng giá trị văn hóa, dạy chúng ta về lòng nhân ái, dũng cảm và tầm quan trọng của việc bảo vệ điều đúng đắn. Hãy khám phá những câu chuyện cổ tích vượt thời gian này và tìm hiểu di sản phong phú của Việt Nam."
        } 
        else if (author === 'LegendTales') {
            return "Hãy bước vào thế giới cổ xưa của truyện truyền thuyết Việt Nam, nơi các vị thần, anh hùng và sinh vật huyền thoại định hình số phận của cả một dân tộc. Những câu chuyện sử thi như Sơn Tinh Thủy Tinh và Sự Tích Bánh Chưng Bánh Dày tiết lộ nguồn gốc của các truyền thống và sức mạnh bền bỉ của tinh thần Việt Nam. Từ những trận chiến oai hùng đến sự ra đời của các phong tục văn hóa được yêu mến, mỗi câu chuyện đều thấm đẫm lịch sử và niềm tin của dân tộc Việt. Hãy hành trình qua những câu chuyện truyền thuyết này và khám phá những câu chuyện vẫn tiếp tục truyền cảm hứng và định hình bản sắc của quốc gia."
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
