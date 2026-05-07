# 가계부 대시보드 (Vue 3)

## 사용 기술
- Vue 3 (Composition API) + Vite
- Pinia (axios로 json-server 연결)
- Bootstrap 5, FontAwesome 6, Google Charts
- ES6+ 모듈 문법

## 실행 방법
```bash
npm install

# 터미널 1: json-server (포트 3001)
npm run server

# 터미널 2: Vite 개발 서버 (포트 5173)
npm run dev
```

브라우저에서 http://localhost:5173 접속

## 구조
- `db.json` — 샘플 거래 100건
- `src/stores/transaction.js` — Pinia + axios로 json-server 연결
- `src/views/Dashboard.vue` — 통계 카드 + 3개 Google 차트
- `src/views/Transactions.vue` — 거래 목록 + 필터/검색
