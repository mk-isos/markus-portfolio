export type Locale = "ko" | "en";

export type LocalizedText = {
  ko: string;
  en: string;
};

const text = (ko: string, en: string): LocalizedText => ({ ko, en });

export const siteMeta = {
  title: "Markus | Backend & AI Developer",
  description: text(
    "AI와 백엔드로 문제를 해결하는 개발자 Markus의 개인 브랜딩 포트폴리오 사이트",
    "A personal branding portfolio site for Markus, a developer solving problems with AI and backend systems.",
  ),
  siteUrl: "https://markus-portfolio.vercel.app",
  keywords: [
    "Markus",
    "Backend Developer",
    "AI Developer",
    "Spring Boot",
    "OpenAI API",
    "Portfolio",
    "Resume",
  ],
};

export const hero = {
  name: "Markus",
  role: text("Backend & AI Developer", "Backend & AI Developer"),
  slogan: text("Fail Fast -> Positive Influence", "Fail Fast -> Positive Influence"),
  intro: text(
    "AI와 백엔드로 문제를 해결하는 개발자입니다.",
    "I am a developer who solves real-world problems with AI and backend systems.",
  ),
  summary: text(
    "세상에 대한 호기심을 실행으로 바꾸고, 빠른 피드백 루프로 더 나은 결과를 만드는 개발자입니다.",
    "I turn curiosity into execution and improve outcomes through fast feedback loops.",
  ),
};

export const links = {
  github: "https://github.com/mk-isos",
  email: "mkisos0316@gmail.com",
  blog: "https://mkisos.tistory.com/",
  instagramMain: "https://www.instagram.com/markus_isos/",
  instagramSub: "https://www.instagram.com/mk_isos/",
  linkedin: "https://www.linkedin.com/in/mkisos",
};

export const navigationItems = [
  { id: "about", label: text("About", "About") },
  { id: "projects", label: text("Projects", "Projects") },
  { id: "experience", label: text("Experience", "Experience") },
  { id: "content", label: text("Content", "Content") },
  { id: "resume", label: text("Resume", "Resume") },
  { id: "contact", label: text("Contact", "Contact") },
] as const;

export type NavigationId = (typeof navigationItems)[number]["id"];

export const aboutParagraphs = [
  text(
    "저는 탐구하고 공부하고 기록하는 개발자입니다. 생각을 흘려보내지 않고 붙잡아 정리하는 과정을 통해 한 번 더 이해하고 한 단계 더 성장하는 것을 중요하게 생각합니다.",
    "I am a developer who explores, studies, and documents. I value the process of capturing thoughts, organizing them, and turning them into deeper understanding and growth.",
  ),
  text(
    "일상부터 배움까지 모든 과정을 기록하려고 노력합니다. 매일 아침 운동을 통해 루틴을 만들고 이동 시간에는 떠오른 생각을 정리하고 하루를 돌아보며 피드백을 남깁니다. 이 루틴은 저를 더 나은 방향으로 이끄는 성장 엔진입니다.",
    "I try to document everything from daily routines to technical learning. Morning workouts, notes during commute, and end-of-day reflection build a reliable growth engine for me.",
  ),
  text(
    "저의 핵심 가치관은 Fail Fast입니다. 도전을 미루기보다 빠르게 실행하고 실패에서 얻은 학습을 다음 시도에 반영하는 것을 지향합니다. 계획은 시작점이고 성장은 실행과 피드백의 반복에서 만들어진다고 믿습니다.",
    "My core value is Fail Fast. I prefer rapid execution over hesitation, and I convert failure into learning for the next iteration. Planning is a start, but growth comes from repeated execution and feedback.",
  ),
  text(
    "현재는 Spring 기반 백엔드 개발과 LLM 활용에 집중하고 있습니다. 단순히 기능을 구현하는 개발자를 넘어 AI를 통해 실제 문제를 해결하고 사람에게 긍정적인 영향을 주는 제품을 만드는 것이 목표입니다.",
    "I am currently focused on Spring-based backend engineering and LLM applications. My goal is to go beyond feature delivery and build products that solve real problems while creating positive influence.",
  ),
];

export const focusAreas = [
  text("Backend Systems", "Backend Systems"),
  text("LLM Applications", "LLM Applications"),
  text("AI Product Thinking", "AI Product Thinking"),
  text("Startup Mindset", "Startup Mindset"),
  text("Knowledge Sharing", "Knowledge Sharing"),
];

export type SkillLevel = "Core" | "Experienced" | "Learning";

export type StackGroup = {
  title: LocalizedText;
  icon: string;
  sections: {
    level: SkillLevel;
    description: LocalizedText;
    skills: string[];
  }[];
};

export const stackGroups: StackGroup[] = [
  {
    title: text("Core Skills", "Core Skills"),
    icon: "●",
    sections: [
      {
        level: "Core",
        description: text("잘 아는 기술", "Core"),
        skills: [
          "Java",
          "Spring Boot",
          "MySQL",
          "REST API Design",
          "OpenAI API",
          "LLM Application",
        ],
      },
    ],
  },
  {
    title: text("Experienced Skills", "Experienced Skills"),
    icon: "●",
    sections: [
      {
        level: "Experienced",
        description: text("경험이 있는 기술", "Experienced"),
        skills: [
          "HTML / CSS",
          "JavaScript",
          "React",
          "Next.js",
          "Three.js",
          "Upstage AI (DocParse)",
          "Upstage IE (Information Extraction)",
          "SOLAR API",
          "Kanana API",
          "Git / GitHub",
          "IntelliJ",
          "VS Code",
        ],
      },
    ],
  },
  {
    title: text("Learning Next", "Learning Next"),
    icon: "●",
    sections: [
      {
        level: "Learning",
        description: text("학습 중인 기술", "Learning"),
        skills: ["LangChain", "AI Agent Architecture", "Docker", "AWS"],
      },
    ],
  },
  {
    title: text("Other Skills", "Other Skills"),
    icon: "●",
    sections: [
      {
        level: "Experienced",
        description: text("기타 언어", "Other Languages"),
        skills: ["C", "C++", "Python"],
      },
    ],
  },
];

export type Project = {
  name: string;
  oneLiner: LocalizedText;
  overview: LocalizedText;
  role: LocalizedText[];
  features: LocalizedText[];
  techStack: {
    backend?: string[];
    ai?: string[];
    frontend?: string[];
    infra?: string[];
    tools?: string[];
  };
  contributions: LocalizedText[];
  troubleshooting: {
    title: LocalizedText;
    problem: LocalizedText;
    solution: LocalizedText[];
    result: LocalizedText[];
  }[];
  achievement: LocalizedText[];
  learnings: LocalizedText[];
  githubUrl: string;
  demoUrl?: string;
  reportUrl?: string;
  status: LocalizedText;
};

export const projects: Project[] = [
  {
    name: "Co-Labor – 외국인 근로자 지원 플랫폼",
    oneLiner: text(
      "외국인 근로자들이 한국에서 안정적으로 정착하고 적응할 수 있도록 돕는 플랫폼으로 일자리 정보 부족 법률 등 다양한 문제 해결을 지원하는 서비스",
      "A platform that helps foreign workers settle and adapt stably in Korea by supporting solutions to diverse issues such as jobs, information gaps, and legal matters.",
    ),
    overview: text(
      "외국인 근로자들이 한국에서 안정적으로 정착하고 적응할 수 있도록 돕기 위해 개발된 플랫폼으로 일자리 정보 부족 법률 등 다양한 문제를 해결할 수 있도록 지원하는 것을 목표로 합니다.",
      "This platform was developed to help foreign workers settle and adapt stably in Korea, with the goal of supporting solutions to diverse challenges including jobs, information gaps, and legal issues.",
    ),
    role: [
      text("Backend 개발 담당 (Spring Boot)", "Backend development lead (Spring Boot)"),
      text("REST API 설계 및 구현 (20+ endpoints)", "Designed and implemented REST APIs (20+ endpoints)"),
      text(
        "Elasticsearch 기반 RAG 챗봇 개발",
        "Developed an Elasticsearch-based RAG chatbot",
      ),
      text(
        "데이터베이스 설계 및 API 구조 개선",
        "Improved database design and API architecture",
      ),
    ],
    features: [
      text("채용 공고 및 기업 리뷰 시스템", "Job posting and company review system"),
      text(
        "위치 기반 지원 센터 및 병원 정보 제공",
        "Location-based support center and hospital information",
      ),
      text("법률 상담 챗봇 (판례 기반 응답)", "Legal consultation chatbot with case-law-based answers"),
    ],
    techStack: {
      backend: ["Spring Boot", "JPA", "MySQL", "REST API"],
      ai: [
        "Elasticsearch (RAG Retrieval System)",
        "Fine-tuned GPT API",
        "Case-law-based QA System",
      ],
    },
    contributions: [
      text("20+ REST API 직접 설계 및 구현", "Designed and implemented 20+ REST APIs"),
      text(
        "판례 데이터 Elasticsearch 색인 및 검색 알고리즘 구현",
        "Implemented Elasticsearch indexing and retrieval algorithms for case-law data",
      ),
      text(
        "RAG 기반 챗봇 응답 생성 파이프라인 구축",
        "Built a RAG-based response generation pipeline for chatbot answers",
      ),
      text(
        "API 구조 개선 및 DTO 재설계",
        "Refactored API architecture and redesigned DTO structures",
      ),
    ],
    troubleshooting: [
      {
        title: text("대용량 판례 데이터 처리 문제", "Large-scale Case-law Data Processing Issue"),
        problem: text(
          "EC2 메모리 부족으로 Elasticsearch 색인 실패",
          "Elasticsearch indexing failed due to insufficient memory on EC2",
        ),
        solution: [
          text("데이터 전처리 최적화", "Optimized data preprocessing"),
          text("swap 메모리 구성", "Configured swap memory"),
          text("Elasticsearch 전용 인스턴스 분리", "Separated a dedicated Elasticsearch instance"),
        ],
        result: [
          text("안정적인 데이터 색인화 성공", "Achieved stable data indexing"),
          text("시스템 안정성 향상", "Improved overall system stability"),
        ],
      },
      {
        title: text("API 설계 문제", "API Design Issue"),
        problem: text(
          "비효율적인 API 구조로 프론트 개발 지연 과도한 API 호출 낮은 재사용성 발생",
          "Inefficient API design caused frontend delays, excessive calls, and low reusability",
        ),
        solution: [
          text("Swagger 기반 API 명세 구축", "Established Swagger-based API specifications"),
          text("DTO 구조 재설계", "Redesigned DTO structures"),
          text("API 구조 정규화", "Normalized API architecture"),
        ],
        result: [
          text("개발 속도 향상", "Improved development speed"),
          text("성능 개선", "Improved performance"),
          text("협업 효율 증가", "Increased collaboration efficiency"),
        ],
      },
    ],
    achievement: [
      text("AI 메이커톤 최우수상 수상", "Grand Prize in AI Makathon"),
      text("공개SW 개발자대회 우수작 선정", "Selected as an excellent project in the Open Source Developer Competition"),
    ],
    learnings: [
      text("실서비스 수준의 REST API 설계 경험", "Hands-on experience in production-grade REST API design"),
      text("RAG 기반 AI 시스템 설계 및 구현 경험", "Experience designing and implementing RAG-based AI systems"),
      text("대용량 데이터 처리 및 인프라 문제 해결 경험", "Experience handling large-scale data and infrastructure issues"),
      text("팀 협업 및 서비스 개선 경험", "Experience in team collaboration and service improvement"),
    ],
    githubUrl: "https://github.com/Co-Labor-Project",
    demoUrl: "https://www.youtube.com/watch?v=qejuaeaR0eI",
    status: text("완료", "Completed"),
  },
  {
    name: "To Gather – 지역 배달 그룹 모집 커뮤니티 애플리케이션",
    oneLiner: text(
      "지역 주민 간 소통과 배달 비용 절감을 위해 이웃 간 그룹 매칭 및 커뮤니티 기능을 제공하는 플랫폼",
      "A platform that provides neighborhood group matching and community features to improve local communication and reduce delivery costs.",
    ),
    overview: text(
      "지역 기반 커뮤니티에서 사용자 간 소통과 배달 그룹 매칭을 통해 비용을 절감하고 이웃 간 상호작용을 활성화하기 위해 개발된 애플리케이션",
      "An application built to reduce costs and activate neighborhood interactions by combining local communication with delivery group matching.",
    ),
    role: [
      text("Backend 개발 담당 (Spring Boot)", "Backend development lead (Spring Boot)"),
      text("REST API 설계 및 구현 (10+ endpoints)", "Designed and implemented REST APIs (10+ endpoints)"),
      text("채팅 기능 개발", "Developed chat functionality"),
      text("데이터베이스 설계 및 API 구조 설계", "Designed database schema and API architecture"),
    ],
    features: [
      text("사용자 휴대폰 기반 SMS 인증", "Phone-based SMS user verification"),
      text("배달 비용 절감을 위한 이웃 간 그룹 매칭 기능", "Neighborhood group matching to reduce delivery costs"),
      text("지역 커뮤니티 게시판", "Local community board"),
      text("사용자 맞춤형 게시글 추천 기능", "Personalized post recommendations"),
      text("사용자 간 채팅 기능", "User-to-user chat"),
      text("채팅 내 비속어 필터링 기능", "Profanity filtering in chat"),
    ],
    techStack: {
      backend: ["Spring Boot", "JPA", "MySQL", "REST API"],
    },
    contributions: [
      text("10+ REST API 직접 설계 및 구현", "Designed and implemented 10+ REST APIs"),
      text("채팅 기능 구현 및 데이터 흐름 설계", "Implemented chat feature and designed data flow"),
      text(
        "API 구조 설계 및 DTO 기반 요청/응답 구조 정의",
        "Defined API structure and DTO-based request/response contracts",
      ),
    ],
    troubleshooting: [
      {
        title: text("백엔드 구조 설계 기준 부재 문제", "Lack of Backend Architecture Standards"),
        problem: text(
          "초기 프로젝트에서 API DB 계층 구조에 대한 기준 없이 개발이 진행되어 기능 증가와 함께 코드 구조가 복잡해졌습니다.",
          "Development started without clear standards for API, DB, and layered architecture, and the codebase became complex as features grew.",
        ),
        solution: [
          text("Controller-Service-Repository 구조 적용", "Applied Controller-Service-Repository architecture"),
          text("기능 단위로 API 책임 분리", "Separated API responsibilities by feature"),
          text("반복적인 리팩토링을 통해 구조 개선", "Improved structure through iterative refactoring"),
        ],
        result: [
          text("계층 기반 설계 이해도 향상", "Improved understanding of layered architecture"),
          text("유지보수 가능한 코드 구조 확보", "Established a maintainable code structure"),
          text("이후 프로젝트에 적용 가능한 설계 기준 수립", "Established reusable architecture standards for later projects"),
        ],
      },
      {
        title: text("채팅 기능 데이터 흐름 설계 문제", "Chat Data Flow Design Challenges"),
        problem: text(
          "메시지 저장 및 조회 방식이 명확하지 않아 데이터 흐름 설계에 어려움이 있었습니다.",
          "Data flow design was difficult because message save/query strategies were initially unclear.",
        ),
        solution: [
          text("메시지 엔티티를 사용자 및 시간 기준으로 구조화", "Structured message entities by user and timestamp"),
          text("채팅 조회 API 설계", "Designed chat retrieval APIs"),
          text("JPA 기반 저장 및 조회 로직 구현", "Implemented JPA-based persistence and query logic"),
        ],
        result: [
          text("채팅 데이터 흐름 구조화", "Structured chat data flow"),
          text("메시지 저장 및 조회 기능 안정화", "Stabilized message save and retrieval"),
          text("실시간 기능 확장을 위한 기반 확보", "Built a foundation for real-time feature expansion"),
        ],
      },
    ],
    achievement: [
      text(
        "SW중심대학사업단 AI 오픈소스 전문프로젝트 최우수상 수상",
        "Grand Prize in the SW-Centered University AI Open Source Specialized Project",
      ),
    ],
    learnings: [
      text("백엔드 구조 설계 및 계층 분리에 대한 이해", "Deeper understanding of backend architecture and layer separation"),
      text("데이터 흐름 기반 기능 설계 경험", "Experience designing features around data flow"),
      text("리팩토링을 통한 코드 구조 개선 경험", "Experience improving code structure through refactoring"),
      text("팀 협업 및 서비스 개선 경험", "Experience in team collaboration and service improvement"),
    ],
    githubUrl: "https://github.com/cbnu-togather",
    demoUrl: "https://www.youtube.com/watch?v=IT6z9czB58s",
    reportUrl: "/togather-report.pdf",
    status: text("완료", "Completed"),
  },
];

export const experiences = [
  {
    title: "Pixeleye Co., Ltd.",
    period: "06/24/2024 ~ 07/19/2024",
    position: text("Intern", "Intern"),
    description: text(
      "PHP, phpMyAdmin, FileZilla 등 실제 서비스 환경에서 사용되는 웹 개발 도구를 직접 다루며 CMS 기반 콘텐츠 관리와 서버 운영 흐름을 이해했습니다. 또한 실무에서 발생하는 문제를 해결하며 개발 협업 프로세스를 경험했습니다.",
      "I worked directly with production web tools such as PHP, phpMyAdmin, and FileZilla, gaining hands-on understanding of CMS-based content management and server operation workflows. I also experienced real development collaboration by solving practical issues in a working environment.",
    ),
  },
];

export const activities = [
  text("2022 충북대학교 나비 총학생회", "2022 Student Council, Chungbuk National University"),
  text(
    "2022 충북대학교 아벨리오 개신대동체 축제준비위원회 (무대관리팀)",
    "2022 Abelio Festival Committee, Stage Management Team, Chungbuk National University",
  ),
  text("2023 성암야간학교(봉사) 임원진", "2023 Executive Team, Seongam Night School (Volunteer)"),
  text(
    "2022 ~ 2024 소프트웨어 학술동아리 네스트넷 임원진",
    "2022 ~ 2024 Executive Team, NestNet Software Club",
  ),
  text("2026 한빛미디어 나는 리뷰어다", "2026 Hanbit Media Technical Reviewer Program"),
  text("2026 KANANA 429 카카오AI 앰배서더", "2026 KANANA 429 Kakao AI Ambassador"),
];

export const education = [
  {
    school: "Seonggwang High School",
    period: "03/2018 ~ 02/2020",
    location: "Daegu, Korea",
  },
  {
    school: "Chungbuk National University",
    period: "03/2021 ~ Present",
    location: "Cheongju, Korea",
  },
];

export type Certification = {
  name: LocalizedText;
  issuer: string;
  date: string;
};

export const certifications: Certification[] = [
  {
    name: text("정보처리기사", "Engineer Information Processing"),
    issuer: "",
    date: "2025",
  },
  {
    name: text("SQLD", "SQLD"),
    issuer: "",
    date: "2025",
  },
];

export const awards = [
  {
    title: text("SW중심대학사업단 AI 오픈소스 전문프로젝트", "SW-Centered University AI Open Source Project"),
    detail: text("영어발표회 최우수상 수상", "Grand Prize in English Presentation"),
    date: "2024.06",
  },
  {
    title: text("2024 새싹 해커톤", "2024 Saessak Hackathon"),
    detail: text(
      "본선 진출 (서울시, 서울경제진흥원, Google 주최)",
      "Finalist (Hosted by Seoul Metropolitan Government, SBA, and Google)",
    ),
    date: "2024.07",
  },
  {
    title: text("2024 AI 메이커톤 경진대회", "2024 AI Makathon Competition"),
    detail: text(
      "최우수상 수상 (충청북도 산업인공지능연구센터 주최)",
      "Grand Prize (Hosted by Chungbuk Industrial AI Research Center)",
    ),
    date: "2024.09",
  },
  {
    title: text("2024 공개 SW 개발자대회", "2024 Open Source Developer Competition"),
    detail: text(
      "본선 진출 및 우수작 선정 (과학기술정보통신부 주최, 정보통신산업진흥원 주관)",
      "Finalist and Excellent Project Selection (MSIT / NIPA)",
    ),
    date: "2024.11",
  },
];

export const resume = {
  filePath: "/resume.pdf",
  updatedAt: text("업데이트 예정", "Update pending"),
  isReady: false,
};

export const contentCategories = [
  { id: "life-tools", label: text("인생 도구", "Life Tools") },
  { id: "knowledge-tools", label: text("지식 도구", "Knowledge Tools") },
  { id: "dev-tools", label: text("개발 도구", "Development Tools") },
  { id: "reflection-tools", label: text("사색 도구", "Reflection Tools") },
] as const;

export type ContentCategoryId = (typeof contentCategories)[number]["id"];

export type ContentItem = {
  categoryId: ContentCategoryId;
  title: LocalizedText;
  description: LocalizedText;
  href: string;
  source: string;
  date: string;
};

export const contentItems: ContentItem[] = [
  {
    categoryId: "life-tools",
    title: text("실리콘밸리 상륙작전", "Silicon Valley Landing Plan"),
    description: text(
      "구글·애플 등 글로벌 기업 개발자들에게 콜드메일을 보내 커피챗 기회를 직접 확보하고 이를 학교 연수 프로그램과 연결해 실리콘밸리 경험으로 확장한 실행 기록입니다.",
      "An execution series documenting how I secured coffee chats through cold outreach to developers at global companies like Google and Apple, then connected that momentum to a school training program for a Silicon Valley experience.",
    ),
    href: "https://mkisos.tistory.com/category/%EC%9D%B8%EC%83%9D%20%EB%8F%84%EA%B5%AC/%EC%8B%A4%EB%A6%AC%EC%BD%98%EB%B0%B8%EB%A6%AC%20%EC%83%81%EB%A5%99%EC%9E%91%EC%A0%84?page=2",
    source: "Tistory",
    date: "Series",
  },
  {
    categoryId: "life-tools",
    title: text("가디언과의 만남", "Meeting with a Guardian"),
    description: text(
      "가디언을 만나다 시리즈입니다. 각 분야의 가디언(멘토)을 직접 만나 인사이트를 기록하고 다양한 삶과 커리어를 통해 나의 방향성을 설계해가는 인터뷰 시리즈입니다.",
      "An interview series where I meet guardians (mentors) from different fields, document insights, and shape my direction through diverse life and career stories.",
    ),
    href: "https://mkisos.tistory.com/category/%EC%9D%B8%EC%83%9D%20%EB%8F%84%EA%B5%AC/%EA%B0%80%EB%94%94%EC%96%B8%EA%B3%BC%EC%9D%98%20%EB%A7%8C%EB%82%A8",
    source: "Tistory",
    date: "Series",
  },
  {
    categoryId: "life-tools",
    title: text("2024년 하기 계절학기 인턴십", "2024 Summer Internship Journal"),
    description: text(
      "2024년 하기 계절학기 인턴십을 진행하며 실무에서의 경험과 배움을 기록한 인턴 일지 시리즈입니다.",
      "A series of internship logs documenting practical experience and learning from my 2024 summer semester internship.",
    ),
    href: "https://mkisos.tistory.com/category/%EC%BD%94%EB%94%A9%20%EB%8F%84%EA%B5%AC/%EC%9D%B8%ED%84%B4%EC%8B%AD",
    source: "Tistory",
    date: "Series",
  },
  {
    categoryId: "knowledge-tools",
    title: text("경제금융용어", "Economic & Financial Terms"),
    description: text(
      "경제·금융 기초를 다지기 위해 ‘경제금융용어 700’을 꾸준히 학습하고 LLM을 활용해 개념을 정리·재구성하며 이해를 확장한 시리즈입니다.",
      "A series where I consistently study ‘700 Economic & Financial Terms’ and use LLMs to reorganize concepts and deepen understanding.",
    ),
    href: "https://mkisos.tistory.com/category/%EC%A7%80%EC%8B%9D%20%EB%8F%84%EA%B5%AC/%EA%B2%BD%EC%A0%9C%EA%B8%88%EC%9C%B5%EC%9A%A9%EC%96%B4",
    source: "Tistory",
    date: "Series",
  },
  {
    categoryId: "knowledge-tools",
    title: text("독서/서평", "Reading / Book Reviews"),
    description: text(
      "관심 기반으로 도서를 선정하고 출판사 서평단으로 책을 지원받아 읽으며 인사이트를 구조화·재해석해 콘텐츠로 확장하는 독서 기록 시리즈입니다.",
      "A reading series where I select books by interest, participate in publisher review programs, and turn insights into structured content.",
    ),
    href: "https://mkisos.tistory.com/category/%EC%A7%80%EC%8B%9D%20%EB%8F%84%EA%B5%AC/%EB%8F%85%EC%84%9C",
    source: "Tistory",
    date: "Series",
  },
  {
    categoryId: "dev-tools",
    title: text("LG Aimers", "LG Aimers"),
    description: text(
      "대학교 2학년 종료 후 LG Aimers 4기로 선발되어 AI 강의를 수강하며 학습 내용을 정리·기록한 시리즈입니다.",
      "A series documenting AI lectures and learning notes from LG Aimers 4th cohort after sophomore year.",
    ),
    href: "https://mkisos.tistory.com/category/%EC%BD%94%EB%94%A9%20%EB%8F%84%EA%B5%AC/LG%20Aimers?page=1",
    source: "Tistory",
    date: "Series",
  },
  {
    categoryId: "dev-tools",
    title: text("자격증", "Certifications"),
    description: text(
      "정보처리기사, SQLD 등 자격증 취득 과정에서의 학습 내용과 효과적인 공부 방법을 정리한 기록입니다.",
      "A series covering certification prep for Engineer Information Processing and SQLD with effective study methods.",
    ),
    href: "https://mkisos.tistory.com/category/%EC%BD%94%EB%94%A9%20%EB%8F%84%EA%B5%AC/%EC%9E%90%EA%B2%A9%EC%A6%9D",
    source: "Tistory",
    date: "Series",
  },
  {
    categoryId: "dev-tools",
    title: text("직무분석", "Job Analysis"),
    description: text(
      "대학교 2학년부터 개발자 채용 공고를 분석하며 요구 역량을 정리하고 포트폴리오와 지원서를 직접 작성해본 직무 분석 시리즈입니다.",
      "A job-analysis series where I reviewed developer hiring posts, mapped required skills, and drafted portfolios and applications from sophomore year.",
    ),
    href: "https://mkisos.tistory.com/category/%EC%BD%94%EB%94%A9%20%EB%8F%84%EA%B5%AC/%EC%A7%81%EB%AC%B4%EB%B6%84%EC%84%9D",
    source: "Tistory",
    date: "Series",
  },
  {
    categoryId: "dev-tools",
    title: text("카카오 AI 앰배서더 KANANA 429", "Kakao AI Ambassador KANANA 429"),
    description: text(
      "카카오 AI 앰배서더 KANANA 429 2기로 활동하며 AI 기술을 학습·활용하고 그 과정과 콘텐츠를 기록한 활동 시리즈입니다.",
      "An activity series documenting learning and practical use of AI as a member of Kakao AI Ambassador KANANA 429 (2nd cohort).",
    ),
    href: "https://mkisos.tistory.com/category/%EC%BD%94%EB%94%A9%20%EB%8F%84%EA%B5%AC/%EC%B9%B4%EC%B9%B4%EC%98%A4%20AI%20%EC%95%B0%EB%B0%B0%EC%84%9C%EB%8D%94%20KANANA%20429",
    source: "Tistory",
    date: "Series",
  },
  {
    categoryId: "dev-tools",
    title: text("기술 & 정보 글 (Tech & Knowledge)", "Tech & Knowledge"),
    description: text(
      "기술 & 정보 글 (Tech & Knowledge)",
      "Tech & Knowledge",
    ),
    href: "https://mkisos.tistory.com/category/%EC%BD%94%EB%94%A9%20%EB%8F%84%EA%B5%AC/%EA%B8%B0%EC%88%A0%20%26%20%EC%A0%95%EB%B3%B4%20%EA%B8%80%20%28Tech%20%26%20Knowledge%29",
    source: "Tistory",
    date: "Series",
  },
  {
    categoryId: "dev-tools",
    title: text("프론트엔드 개발 (Frontend Development)", "Frontend Development"),
    description: text(
      "프론트엔드 개발 공부하면서 작성한 글들입니다.",
      "Posts written while studying frontend development.",
    ),
    href: "https://mkisos.tistory.com/category/%EC%BD%94%EB%94%A9%20%EB%8F%84%EA%B5%AC/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C%20%EA%B0%9C%EB%B0%9C%20%28Frontend%20Development%29",
    source: "Tistory",
    date: "Series",
  },
  {
    categoryId: "dev-tools",
    title: text("백엔드 개발 (Backend Development)", "Backend Development"),
    description: text(
      "백엔드 개발 공부하면서 작성한 글들입니다.",
      "Posts written while studying backend development.",
    ),
    href: "https://mkisos.tistory.com/category/%EC%BD%94%EB%94%A9%20%EB%8F%84%EA%B5%AC/%EB%B0%B1%EC%97%94%EB%93%9C%20%EA%B0%9C%EB%B0%9C%20%28Backend%20Development%29",
    source: "Tistory",
    date: "Series",
  },
  {
    categoryId: "dev-tools",
    title: text("개발 도구 & 환경 (Dev Tools & Environment)", "Dev Tools & Environment"),
    description: text(
      "개발 공부 과정에서 마주한 환경 설정 및 도구 문제를 해결하며 해결 과정을 정리·기록한 시리즈입니다.",
      "A series documenting how I solved environment setup and tooling issues encountered during development study.",
    ),
    href: "https://mkisos.tistory.com/category/%EC%BD%94%EB%94%A9%20%EB%8F%84%EA%B5%AC/%EA%B0%9C%EB%B0%9C%20%EB%8F%84%EA%B5%AC%20%26%20%ED%99%98%EA%B2%BD%20%28Dev%20Tools%20%26%20Environment%29",
    source: "Tistory",
    date: "Series",
  },
  {
    categoryId: "dev-tools",
    title: text("프로젝트 & 경험 (Projects & Experiences)", "Projects & Experiences"),
    description: text(
      "다양한 프로젝트를 기획하고 실행하며 개발 과정에서의 경험과 시행착오를 기록한 프로젝트 아카이브입니다.",
      "A project archive documenting planning, execution, and trial-and-error across various development projects.",
    ),
    href: "https://mkisos.tistory.com/category/%EC%BD%94%EB%94%A9%20%EB%8F%84%EA%B5%AC/%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%20%26%20%EA%B2%BD%ED%97%98%20%28Projects%20%26%20Experiences%29",
    source: "Tistory",
    date: "Series",
  },
  {
    categoryId: "reflection-tools",
    title: text("삶과 생각", "Life & Thoughts"),
    description: text(
      "‘주간회GO’ 시리즈를 통해 하루의 선택과 행동을 돌아보고 이를 한 주 단위로 정리하며 지속적으로 스스로를 피드백하는 기록입니다. 하루 한 주 한 달 그리고 1년을 반복적으로 돌아보며 성장의 흐름을 만들고 나의 방향성과 가치관을 점검해 나갑니다. 이 기록은 단순한 일상이 아니라 미래의 나와 가족에게 남기는 삶의 발자국이자 성장의 기록입니다.",
      "A reflective series that reviews daily decisions and actions in weekly cycles, building consistent self-feedback. By repeatedly revisiting each day, week, month, and year, I track growth flow and refine my values and direction. These notes are not just daily logs but footprints for my future self and family.",
    ),
    href: "https://mkisos.tistory.com/category/%EC%82%AC%EC%83%89%20%EB%8F%84%EA%B5%AC/%EC%82%B6%EA%B3%BC%20%EC%83%9D%EA%B0%81",
    source: "Tistory",
    date: "Series",
  },
];

export const timeline = [
  {
    year: "2021",
    title: text("개발 학습 시작", "Started Developer Journey"),
    description: text(
      "컴퓨터공학 기반을 다지며 문제 해결 관점으로 개발 공부를 시작했습니다.",
      "I started studying development with a strong computer science foundation and a problem-solving mindset.",
    ),
  },
  {
    year: "2024",
    title: text("프로젝트 집중", "Focused on AI Projects"),
    description: text(
      "AI 오픈소스 프로젝트, 해커톤, 개발 대회를 통해 실제 문제 해결형 개발을 경험했습니다.",
      "I gained hands-on experience in problem-driven development through AI projects, hackathons, and competitions.",
    ),
  },
  {
    year: "2026",
    title: text("브랜딩 확장", "Expanded Personal Branding"),
    description: text(
      "카카오 AI 앰배서더 및 리뷰어 활동을 기반으로 기술과 콘텐츠를 함께 확장하고 있습니다.",
      "Through ambassador and reviewer roles, I am expanding both technical depth and content-driven influence.",
    ),
  },
  {
    year: "Next",
    title: text("AI + Backend Product Builder", "AI + Backend Product Builder"),
    description: text(
      "실사용자 문제를 해결하는 AI 제품을 만들고, 팀과 함께 확장 가능한 시스템을 구축하는 개발자로 성장 중입니다.",
      "I am growing into a builder who ships AI products for real user problems and scales systems with teams.",
    ),
  },
];

export type GalleryItem = {
  title: LocalizedText;
  caption: LocalizedText;
  image: string;
};

export const galleryItems: GalleryItem[] = [
  {
    title: text("Project Session", "Project Session"),
    caption: text(
      "프로젝트 회고와 다음 실행 계획을 정리한 기록",
      "A snapshot of project retrospectives and next execution plans.",
    ),
    image: "/gallery/placeholder-project.svg",
  },
  {
    title: text("Community", "Community"),
    caption: text(
      "커뮤니티 활동과 네트워킹에서 얻은 배움",
      "Learning moments from community activities and networking.",
    ),
    image: "/gallery/placeholder-community.svg",
  },
  {
    title: text("Daily Routine", "Daily Routine"),
    caption: text(
      "운동 독서 기록으로 실행력을 다지는 루틴",
      "A routine built on exercise, reading, and writing.",
    ),
    image: "/gallery/placeholder-routine.svg",
  },
];

export const galleryIntroLines = [
  text("기록은 남고, 성장은 쌓입니다.", "Records remain, and growth compounds."),
  text(
    "이 공간은 나의 과정과 순간을 담아갈 아카이브입니다.",
    "This space is an archive of my process and meaningful moments.",
  ),
  text("사진은 곧 추가될 예정입니다.", "Photos will be added soon."),
];

export const sectionCopy = {
  about: {
    eyebrow: text("ABOUT ME", "ABOUT ME"),
    title: text("성장 루틴이 있는 Backend & AI Developer", "Backend & AI Developer with a Growth Routine"),
    description: text(
      "기술은 도구이고 실행은 습관입니다. 저는 문제를 발견하고 빠르게 시도하며 기록과 공유를 통해 성장의 밀도를 높입니다.",
      "Technology is a tool, and execution is a habit. I identify problems, run fast experiments, and increase growth density through documentation and sharing.",
    ),
  },
  stack: {
    eyebrow: text("TECH STACK", "TECH STACK"),
    title: text("무엇을 잘 다루고, 무엇을 확장 중인지", "What I do well and what I am expanding"),
    description: text(
      "잘 아는 기술과 학습 중인 기술을 구분해 실제 역량과 성장 방향을 동시에 보여줍니다.",
      "I separate core strengths from learning areas to show both current capability and growth direction.",
    ),
  },
  projects: {
    eyebrow: text("PROJECTS", "PROJECTS"),
    title: text("문제 정의부터 결과와 학습까지", "From problem framing to outcomes and learning"),
    description: text(
      "프로젝트마다 내가 무엇을 했고, 왜 만들었고, 무엇을 배웠는지 한 번에 볼 수 있도록 구성했습니다.",
      "Each project is structured to show what I built, why I built it, and what I learned.",
    ),
  },
  experience: {
    eyebrow: text("EXPERIENCE", "EXPERIENCE"),
    title: text("실무와 준실무 경험", "Hands-on experience"),
    description: text(
      "협업 맥락에서 문제를 다루고, 전달 가능한 결과로 만드는 경험을 쌓아왔습니다.",
      "I have built experience in solving problems in collaborative environments and delivering clear outcomes.",
    ),
  },
  activities: {
    eyebrow: text("ACTIVITIES", "ACTIVITIES"),
    title: text("협업과 커뮤니티 활동", "Collaboration and Community"),
    description: text(
      "기술 밖에서도 사람과 조직을 움직이는 경험을 통해 실행력과 리더십을 확장했습니다.",
      "Beyond engineering, I developed execution and leadership through people-focused and organizational activities.",
    ),
  },
  education: {
    eyebrow: text("EDUCATION", "EDUCATION"),
    title: text("학습 기반과 성장 배경", "Learning foundation and growth background"),
    description: text("", ""),
  },
  certifications: {
    eyebrow: text("CERTIFICATIONS", "CERTIFICATIONS"),
    title: text("자격증", "Certifications"),
    description: text("", ""),
  },
  awards: {
    eyebrow: text("AWARDS & HONORS", "AWARDS & HONORS"),
    title: text("경험으로 검증된 실행 결과", "Execution validated by results"),
    description: text(
      "수상과 본선 진출 경험을 통해 문제 해결력과 전달력을 함께 증명해왔습니다.",
      "Awards and finalist records validate both problem-solving and communication capability.",
    ),
  },
  content: {
    eyebrow: text("CONTENT HUB", "CONTENT HUB"),
    title: text("인생 실험실", "Life Experiment Lab"),
    description: text(
      "기록은 개인 메모가 아니라 영향력의 시작이라고 믿습니다. 콘텐츠를 통해 학습과 실행의 흔적을 공유합니다.",
      "I believe documentation is not private notes but the start of influence. I share traces of learning and execution through content.",
    ),
  },
  timeline: {
    eyebrow: text("TIMELINE", "TIMELINE"),
    title: text("Markus Growth Timeline", "Markus Growth Timeline"),
    description: text(
      "짧은 시간 안에 성장 흐름을 이해할 수 있도록 핵심 전환점만 정리했습니다.",
      "I summarized key turning points so people can understand my growth trajectory quickly.",
    ),
  },
  gallery: {
    eyebrow: text("GALLERY", "GALLERY"),
    title: text("Markus Archive", "Markus Archive"),
    description: text("", ""),
  },
  resume: {
    eyebrow: text("RESUME", "RESUME"),
    title: text("이력서 열람/다운로드", "Resume Preview / Download"),
    description: text(
      "`public/resume.pdf` 파일을 넣으면 다운로드와 미리보기가 활성화됩니다.",
      "Drop your file in `public/resume.pdf` to enable download and preview instantly.",
    ),
  },
  contact: {
    eyebrow: text("CONTACT", "CONTACT"),
    title: text("함께 성장할 기회를 기다리고 있습니다.", "I am open to opportunities to grow together."),
    description: text(
      "채용, 협업, 프로젝트 제안 등 어떤 대화든 환영합니다.",
      "I welcome conversations about hiring, collaboration, and product ideas.",
    ),
  },
};

export const uiCopy = {
  skipToContent: text("본문으로 이동", "Skip to content"),
  navAria: text("주요 메뉴", "Primary navigation"),
  mobileNavAria: text("모바일 메뉴", "Mobile navigation"),
  menuButton: text("메뉴", "Menu"),
  languageAria: text("언어 선택", "Language selector"),
  themeLight: text("라이트", "Light"),
  themeDark: text("다크", "Dark"),
  languageKo: "KR",
  languageEn: "EN",
  heroBadge: text("BACKEND & AI PERSONAL BRAND", "BACKEND & AI PERSONAL BRAND"),
  resumeButton: text("Resume", "Resume"),
  githubButton: text("GitHub", "GitHub"),
  contactButton: text("Contact", "Contact"),
  coreMessage: text("핵심 메시지", "Core message"),
  coreMessageBody: text(
    "개발자 + 성장하는 사람 + 콘텐츠를 만드는 사람 + 실행력 있는 사람",
    "Developer + Growth-minded Builder + Content Creator + Action-oriented Person",
  ),
  missionLabel: text("방향성", "Direction"),
  missionBody: text(
    "기술로 실제 문제를 해결하고, 배운 것을 다시 사람들과 나눕니다.",
    "Solve real problems with technology and return value through sharing.",
  ),
  valueLabel: text("핵심 가치", "Core value"),
  valueBody: text(
    "빠른 실행, 정직한 피드백, 꾸준한 개선",
    "Fast execution, honest feedback, and continuous improvement",
  ),
  projectOverview: text("Overview", "Overview"),
  projectProblem: text("Problem / Goal", "Problem / Goal"),
  projectRole: text("Role", "Role"),
  projectOutcome: text("Outcome", "Outcome"),
  projectLearning: text("What I Learned", "What I Learned"),
  projectFeatures: text("Key Features", "Key Features"),
  projectContributions: text("Key Contributions", "Key Contributions"),
  projectTroubleshooting: text("Troubleshooting", "Troubleshooting"),
  projectAchievement: text("Achievement", "Achievement"),
  projectTechStack: text("Tech Stack", "Tech Stack"),
  projectTechBackend: text("Backend", "Backend"),
  projectTechAi: text("AI", "AI"),
  projectTechFrontend: text("Frontend", "Frontend"),
  projectTechInfra: text("Infra", "Infra"),
  projectTechTools: text("Tools", "Tools"),
  projectDetailOpen: text("상세보기", "View Details"),
  projectDetailClose: text("접기", "Collapse"),
  projectReport: text("Project Report", "Project Report"),
  troubleshootingProblem: text("문제", "Problem"),
  troubleshootingSolution: text("해결", "Solution"),
  troubleshootingResult: text("결과", "Result"),
  demoPreparing: text("Demo 준비 중", "Demo coming soon"),
  contentHint: text("카테고리를 선택해 확인하세요.", "Choose a category to browse."),
  contentLoading: text("콘텐츠를 불러오는 중...", "Loading content..."),
  lastUpdated: text("마지막 업데이트", "Last updated"),
  resumePreparing: text(
    "현재는 이력서 파일이 준비 중입니다. 파일 준비 후 `public/resume.pdf`로 추가하면 즉시 다운로드 버튼이 활성화됩니다.",
    "Resume file is currently pending. Add `public/resume.pdf` and the download button will be enabled instantly.",
  ),
  downloadPdf: text("PDF 다운로드", "Download PDF"),
  pdfPending: text("PDF 준비 중", "PDF pending"),
  openOnMobile: text("모바일에서 열기", "Open on mobile"),
  resumePlaceholder: text(
    "Resume 미리보기 영역입니다.\n`public/resume.pdf` 파일을 업로드하면 이 영역에 PDF가 자동 표시됩니다.",
    "This is the resume preview area.\nUpload `public/resume.pdf` and the PDF will render automatically here.",
  ),
  linkedinPending: text("링크 추가 예정", "Link coming soon"),
  footer: text("Built with Next.js and intention.", "Built with Next.js and intention."),
  readMore: text("읽어보기", "Read"),
  stackLevel: {
    Core: text("Core", "Core"),
    Experienced: text("Experienced", "Experienced"),
    Learning: text("Learning", "Learning"),
  },
};
