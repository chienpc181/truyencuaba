
type CategoryMapping = {
    name: string,

}

class LiteratureAndArtCategory {
    name = "LiteratureAndArt";
    displayNameEN = "Literature and Art";
    displayNameVI = "Văn Học và Nghệ Thuật";
    hrefEN = "/en/people/field/literature-and-art";
    hrefVI = "/vi/danh-nhan/linh-vuc/van-hoc-nghe-thuat"
}

class PeopleCategory {
    literatureAndArt = {
        name: "LiteratureAndArt",
        slugEN: "literature-and-art",
        slugVI: "van-hoc-nghe-thuat",
        displayNameEN: "Literature and Art",
        displayNameVI: "Văn Học và Nghệ Thuật",
        hrefEN: "/en/people/field/literature-and-art",
        hrefVI: "/vi/danh-nhan/linh-vuc/van-hoc-nghe-thuat"
    };
    scienceAndTechnology = {
        name: "ScienceAndTechnology",
        slugEN: "science-and-technology",
        slugVI: "khoa-hoc-cong-nghe",
        displayNameEN: "Science and Technology",
        displayNameVI: "Khoa Học và Công Nghệ",
        hrefEN: "/en/people/field/science-and-technology",
        hrefVI: "/vi/danh-nhan/linh-vuc/khoa-hoc-cong-nghe"
    };
    militaryAndPolitic = {
        name: "MilitaryAndPolitic",
        slugEN: "military-and-politic",
        slugVI: "quan-su-chinh-tri",
        displayNameEN: "Military and Politic",
        displayNameVI: "Quân Sự và Chính Trị",
        hrefEN: "/en/people/field/military-and-politic",
        hrefVI: "/vi/danh-nhan/linh-vuc/quan-su-chinh-tri"
    };
    sports = {
        name: "Sports",
        slugEN: "sports",
        slugVI: "the-thao",
        displayNameEN: "Sports",
        displayNameVI: "Thể Thao",
        hrefEN: "/en/people/field/sports",
        hrefVI: "/vi/danh-nhan/linh-vuc/the-thao"
    };
    entertainment = {
        name: "Entertainment",
        slugEN: "entertainment",
        slugVI: "giai-tri",
        displayNameEN: "Entertainment",
        displayNameVI: "Giải Trí",
        hrefEN: "/en/people/field/entertainment",
        hrefVI: "/vi/danh-nhan/linh-vuc/giai-tri"
    };
    
}

function getRouteByPeopleCategory(category: string, lang: string) {
    const peopleCategory = new PeopleCategory();
    if (lang === 'en') {
        switch (category) {
            case (peopleCategory.literatureAndArt.name): return peopleCategory.literatureAndArt.hrefEN
            case (peopleCategory.scienceAndTechnology.name): return peopleCategory.scienceAndTechnology.hrefEN
            case (peopleCategory.militaryAndPolitic.name): return peopleCategory.militaryAndPolitic.hrefEN
            case (peopleCategory.sports.name): return peopleCategory.sports.hrefEN
            case (peopleCategory.entertainment.name): return peopleCategory.entertainment.hrefEN
        }
    }
    else if (lang === 'vi') {
        switch (category) {
            case (peopleCategory.literatureAndArt.name): return peopleCategory.literatureAndArt.hrefVI
            case (peopleCategory.scienceAndTechnology.name): return peopleCategory.scienceAndTechnology.hrefVI
            case (peopleCategory.militaryAndPolitic.name): return peopleCategory.militaryAndPolitic.hrefVI
            case (peopleCategory.sports.name): return peopleCategory.sports.hrefVI
            case (peopleCategory.entertainment.name): return peopleCategory.entertainment.hrefVI
        }
    }
    
    return ''
}

function getDisplayNameByPeopleCategory(category: string, lang: string) {
    const peopleCategory = new PeopleCategory();
    if (lang === 'en') {
        switch (category) {
            case (peopleCategory.literatureAndArt.name): return peopleCategory.literatureAndArt.displayNameEN
            case (peopleCategory.scienceAndTechnology.name): return peopleCategory.scienceAndTechnology.displayNameEN
            case (peopleCategory.militaryAndPolitic.name): return peopleCategory.militaryAndPolitic.displayNameEN
            case (peopleCategory.sports.name): return peopleCategory.sports.displayNameEN
            case (peopleCategory.entertainment.name): return peopleCategory.entertainment.displayNameEN
        }
    }
    else if (lang === 'vi') {
        switch (category) {
            case (peopleCategory.literatureAndArt.name): return peopleCategory.literatureAndArt.displayNameVI
            case (peopleCategory.scienceAndTechnology.name): return peopleCategory.scienceAndTechnology.displayNameVI
            case (peopleCategory.militaryAndPolitic.name): return peopleCategory.militaryAndPolitic.displayNameVI
            case (peopleCategory.sports.name): return peopleCategory.sports.displayNameVI
            case (peopleCategory.entertainment.name): return peopleCategory.entertainment.displayNameVI
        }
    }
    
    return ''
}

function getDisplayNameByPeopleSlug(slug: string, lang: string) {
    const peopleCategory = new PeopleCategory();
    if (lang === 'en') {
        switch (slug) {
            case (peopleCategory.literatureAndArt.slugEN): return peopleCategory.literatureAndArt.displayNameEN
            case (peopleCategory.scienceAndTechnology.slugEN): return peopleCategory.scienceAndTechnology.displayNameEN
            case (peopleCategory.militaryAndPolitic.slugEN): return peopleCategory.militaryAndPolitic.displayNameEN
            case (peopleCategory.sports.slugEN): return peopleCategory.sports.displayNameEN
            case (peopleCategory.entertainment.slugEN): return peopleCategory.entertainment.displayNameEN
        }
    }
    else if (lang === 'vi') {
        switch (slug) {
            case (peopleCategory.literatureAndArt.slugVI): return peopleCategory.literatureAndArt.displayNameVI
            case (peopleCategory.scienceAndTechnology.slugVI): return peopleCategory.scienceAndTechnology.displayNameVI
            case (peopleCategory.militaryAndPolitic.slugVI): return peopleCategory.militaryAndPolitic.displayNameVI
            case (peopleCategory.sports.slugVI): return peopleCategory.sports.displayNameVI
            case (peopleCategory.entertainment.slugVI): return peopleCategory.entertainment.displayNameVI
        }
    }
    
    return ''
}


export {PeopleCategory, getRouteByPeopleCategory, getDisplayNameByPeopleCategory, getDisplayNameByPeopleSlug}