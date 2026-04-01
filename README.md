https://markus-portfolio-mu.vercel.app

# Markus Personal Branding Site (V1)

Next.js + TypeScript + Tailwind CSS 기반의 원페이지 개인 브랜딩/이력서/포트폴리오 사이트입니다.

주요 기능:

- 한국어/영어 즉시 전환 (KR/EN 토글 + localStorage 유지)
- 라이트/다크 모드 전환 (OS 초기 감지 + localStorage 유지)
- 데이터/텍스트 분리 구조 (`src/data/portfolio.ts`)

## 실행 방법

```bash
npm run dev
```

브라우저에서 `http://localhost:3000`을 열면 확인할 수 있습니다.

## 빌드/검증

```bash
npm run lint
npm run build
```

## 주요 파일 구조

- `src/app/page.tsx`
  - 실제 랜딩 페이지 진입점
- `src/components/portfolio/portfolio-page.tsx`
  - Hero, About, Projects, Experience, Content, Resume, Contact 등 전체 섹션 UI
  - sticky header / active section / mobile menu / language toggle / theme toggle / content tab 포함
- `src/data/portfolio.ts`
  - 이름, 소개, 기술 스택, 프로젝트, 경험, 수상, 콘텐츠 링크, 연락처 등 데이터 전부
  - 다국어 텍스트는 `ko`, `en` 필드로 관리
  - **사이트 내용 수정은 이 파일만 편집하면 대부분 반영됨**
- `src/components/portfolio/site-preferences-context.tsx`
  - 언어/테마 전역 상태 및 localStorage 저장 로직
- `src/app/providers.tsx`
  - 전역 Provider 주입
- `src/app/layout.tsx`
  - SEO, Open Graph, Twitter 메타데이터, 파비콘 설정
- `src/app/globals.css`
  - 글로벌 스타일, 라이트/다크 컬러 변수, 타이포그래피

## 내 정보 수정 포인트

### 1) 기본 프로필/링크

- 파일: `src/data/portfolio.ts`
- 수정 키:
  - `hero`
  - `links`
  - `aboutParagraphs`
  - `focusAreas`
- 다국어 텍스트 형식:
  - 예: `{ ko: "한국어 문장", en: "English sentence" }`

### 2) 프로젝트/경험/활동/수상

- 파일: `src/data/portfolio.ts`
- 수정 키:
  - `projects`
  - `experiences`
  - `activities`
  - `awards`
  - `education`

### 3) 콘텐츠 허브(Talk / Articles / Books)

- 파일: `src/data/portfolio.ts`
- 수정 키:
  - `contentItems`
  - `contentCategories`
- 카테고리 기준:
  - `stories`, `articles`, `books`

### 4) Resume PDF 연결

1. 이력서 파일을 `public/resume.pdf`로 추가
2. `src/data/portfolio.ts`의 `resume.isReady` 값을 `true`로 변경
3. 필요 시 `resume.updatedAt` 날짜 수정

### 5) 갤러리 이미지 교체

- 기본 placeholder 파일:
  - `public/gallery/placeholder-project.svg`
  - `public/gallery/placeholder-community.svg`
  - `public/gallery/placeholder-routine.svg`
- 교체 방법:
  1. 실제 이미지 파일을 `public/gallery/`에 추가
  2. `src/data/portfolio.ts`의 `galleryItems[].image` 경로를 새 파일명으로 변경

## 배포 팁 (Vercel)

1. GitHub 저장소에 push
2. Vercel에서 저장소 import
3. Framework는 Next.js 자동 인식
4. Deploy 클릭
5. 배포 완료 후 `src/data/portfolio.ts`의 `siteMeta.siteUrl`을 실제 배포 URL로 갱신

## V2 제안

- 영문/국문 라우팅 분리 i18n (`/ko`, `/en`)
- 프로젝트 상세 페이지 동적 라우팅 (`/projects/[slug]`)
- Notion/MD 기반 콘텐츠 연동
- Resume PDF 자동 버전 관리
- 간단한 방문 분석(예: Plausible, GA)
