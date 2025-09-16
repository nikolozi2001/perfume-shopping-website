/////// Climate Svgs
import Women from "./Svgs/Fragrance/Women";
import Men from "./Svgs/Fragrance/Men";
/////// Water Svgs
import FragranceSets from "./Svgs/Gift_Sets/FragranceSets";

const sections = [
  {
    name_ge: "მთავარი",
    name_en: "Main",
    id: 1,
    href: "",
  },
  {
    name_ge: "ბრენდები",
    name_en: "Brands",
    id: 2,
    href: "brands",
  },
  {
    name_ge: "სუნამო",
    name_en: "Fragrance",
    id: 3,
    href: "fragrance",
    links: [
      {
        header_ge: "ქალი",
        header_en: "Women",
        link: "women",
        svg: Women,
      },
      {
        header_ge: "მამაკაცი",
        header_en: "Men",
        link: "men",
        svg: Men,
      },
    ],
  },
  {
    name_ge: "სასაჩუქრე ნაკრები",
    name_en: "Gift Sets",
    id: 4,
    href: "gift_sets",
    links: [
      {
        header_ge: "სუნამოების ნაკრები",
        header_en: "Fragrance Sets",
        link: "fragrance_sets",
        svg: FragranceSets,
      },
    ],
  },
  {
    name_ge: "შეთავაზებები",
    name_en: "Offers",
    id: 6,
    href: "offers",
  },
  {
    name_ge: "კონტაქტი",
    name_en: "Contacts",
    id: 7,
    href: "contacts",
  },
];

export default sections;
