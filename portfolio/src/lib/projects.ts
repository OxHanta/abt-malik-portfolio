export interface Project {
    id: number;
    title: string;
    date: string;
    category: string;
    img: string;
    client: string;
    role: string;
    services: string[];
    description: string;
    challenge: string;
    solution: string;
    gallery?: string[];
    link?: string;
    socialEmbeds?: string[];
    youtubeEmbeds?: string[];
}

export const PROJECTS: Project[] = [
    {
        id: 1,
        title: "Lagos Water Corporation",
        date: "2025",
        category: "Social Media Design",
        img: "https://res.cloudinary.com/dba2kof3v/image/upload/v1783891866/lwc_toorzg.jpg",
        client: "Lagos Water Corporation",
        role: "Designer",
        services: ["Social Media Post"],
        description: "Social Media Post design for Lagos Water Corporation.",
        challenge: "Creating engaging social media content for public awareness.",
        solution: "Designed visually appealing posts to convey the message effectively.",
        gallery: [],
        socialEmbeds: [
            "https://www.instagram.com/p/Dap5TW8K4LM",
            "https://www.instagram.com/p/DXywSuLDIft",
            "https://www.instagram.com/p/DXraVakDBrf",
            "https://www.instagram.com/p/C-lVc35t0Hu",
            "https://www.instagram.com/reel/DB3VJK3Nr0A/",
            "https://www.instagram.com/p/DWT5AS2DDvK/"
        ]
    },
    {
        id: 2,
        title: "Teo Ignis",
        date: "Dec 2025",
        category: "Social Media Design",
        img: "https://res.cloudinary.com/dba2kof3v/image/upload/v1783508693/TEO_yvdner.jpg",
        client: "Teo Ignis Ltd",
        role: "Creative Designer & Content Creator",
        services: ["Social Media Post", "Graphic Design", "Content Strategy"],
        description: "A series of highly engaging, visually striking social media posts designed to elevate Teo Ignis's brand presence and product showcasing across digital channels.",
        challenge: "Creating distinct, eye-catching visual layouts that communicate product features instantly while maintaining brand consistency in a crowded social feed.",
        solution: "We designed bold typographic layouts, product-focused visual framing, and high-contrast color hierarchies to drive user engagement and conversion.",
        gallery: [
            "https://res.cloudinary.com/dba2kof3v/image/upload/v1777839225/Crunch_ezlb6h.png",
            "https://res.cloudinary.com/dba2kof3v/image/upload/v1777839225/order_ohgjoh.png",
            "https://res.cloudinary.com/dba2kof3v/image/upload/v1777839222/tictac_ghfl6w.png",
            "https://res.cloudinary.com/dba2kof3v/image/upload/v1777839222/Eastereaster_fvs1cv.jpg",
            "https://res.cloudinary.com/dba2kof3v/image/upload/v1777839222/Purchase_pxfc1u.png",
            "https://res.cloudinary.com/dba2kof3v/image/upload/v1777839221/Comfort_cveloy.jpg"
        ]
    },
    {
        id: 3,
        title: "Ojah",
        date: "Oct 2024",
        category: "Logo Design · Branding",
        img: "https://res.cloudinary.com/dba2kof3v/image/upload/v1780531311/cover_axywta.jpg",
        client: "Ojah",
        role: "Lead Identity Designer",
        services: ["Logo Design", "Brand Identity", "Visual Direction"],
        description: "Ojah is a Yoruba word meaning market. In essence, it is an e-commerce marketplace dedicated to showcasing and selling authentic, high-quality products made by African artisans and creators.",
        challenge: "Translating the traditional heritage of African artistry into a modern, sleek digital marketplace experience, while honoring the cultural significance of the Yoruba concept of 'Ojah'.",
        solution: "We designed a minimalist brand identity centered around a clean, line-art Cowrie shell logo (a historical symbol of wealth and trade in Africa), paired with a refined typographic system and an elegant online presence.",
        link: "https://ojah.uk/",
        socialEmbeds: [
            "https://www.instagram.com/p/DXcLQLhDIZd/?igsh=a2IxMm82MDZsMmF2",
            "https://www.instagram.com/p/DX_t5QADD9B/?igsh=OG02c3QzeDE5dDBs",
            "https://www.instagram.com/p/DV84QfnjJG-/?igsh=M3cwaDJib2Zqand1",
            "https://www.instagram.com/p/DQmMttqDHrh/?igsh=MWowaGo4ZHQxbDEwYw=="
        ],
        gallery: [
            "https://res.cloudinary.com/dba2kof3v/image/upload/v1780519010/Ojah_-_Cowrie.White2_dxhuge.jpg",
            "https://res.cloudinary.com/dba2kof3v/image/upload/v1780531318/O_cowrie_dxkqik.jpg",
            "https://res.cloudinary.com/dba2kof3v/image/upload/v1780531299/asok_ch3fia.jpg"
        ]
    },
    {
        id: 4,
        title: "Burbles",
        date: "Nov 2024",
        category: "Media · Branding · Web Design",
        img: "https://res.cloudinary.com/dba2kof3v/image/upload/v1781226428/main_bub_zsdys9.png",
        client: "Burbles Media",
        role: "Lead Brand Identity & Web Designer",
        services: ["Brand Architecture", "Creative Playground Design", "Web Design"],
        description: "Burbles Media is the new disruptive playground for readers who want more. They provide the extra that differentiates ordinary from extraordinary.",
        challenge: "Reimagining modern media layouts to engage digital readers with content that stands out, moving past typical news feeds to create an interactive sensory playground.",
        solution: "Built a sleek, content-focused visual identity using bright neon accents, clean type layouts, and long immersive canvas designs that showcase media columns without visual fatigue.",
        gallery: [
            "https://res.cloudinary.com/dba2kof3v/image/upload/v1781225392/burblArtboard_1_copy_3_kwb2bw.jpg",
            "https://res.cloudinary.com/dba2kof3v/image/upload/v1781225392/burblArtboard_1_copy_2_iiieoi.jpg"
        ]
    },
    {
        id: 5,
        title: "Social Video Portfolio",
        date: "Ongoing",
        category: "Video Editing",
        img: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop",
        client: "Various Creators & Brands",
        role: "Video Editor",
        services: ["Video Editing", "Short-Form Reels"],
        description: "A premium collection of high-retention, engaging social media videos and promotions. Edited from client socials, this selection showcases versatile pacing, visual storytelling, and high-impact motion additions tailored for modern attention spans across YouTube and Instagram.",
        challenge: "Creating digital video content that instantly grabs user attention in the first 2 seconds, maintaining high retention rates while keeping client branding fluid and native to the platform.",
        solution: "Utilized cinematic grading, rhythmic sound design, dynamic zooms, and clean motion overlays to optimize content flow and visual engagement for both short-form and interview style formats.",
        gallery: [],
        youtubeEmbeds: [
            "https://www.youtube.com/embed/0F5Rq7apMdI"
        ],
        socialEmbeds: [
            "https://www.instagram.com/reel/DCofIgSMPlV/",
            "https://www.instagram.com/reel/CikQzpdjAAY/",
            "https://www.instagram.com/reel/DIeQOUNKc-u/",
            "https://www.instagram.com/reel/DE2UvvFNq20/",
            "https://www.instagram.com/reel/DELQ736t1zl/"
        ]
    },
];
