## **1. 요구사항 분석**

**필수 요구사항**

### 🎯 **Dixit 보드게임 룰 적용**

게임은 Dixit 보드게임의 점수 계산 룰을 그대로 따름.

| 상황      | 이야기꾼 | 맞힌 사람 | 틀린 사람 | 투표 당한 사람 |
| --------- | -------- | --------- | --------- | -------------- |
| 모두 정답 | 0점      | 3점       | -         | -              |
| 모두 오답 | 0점      | -         | 2점       | -              |
| 일부 정답 | 3점      | 3점       | 0점       | 1점            |

- **모두 정답**: 이야기꾼 제외 모든 플레이어 3점씩
- **모두 오답**: 이야기꾼 제외 모든 플레이어 2점씩
- **일부 정답**: 이야기꾼과 맞힌 사람 3점씩, 자신의 카드가 투표된 사람은 1점씩

### **👤 4명의 플레이어 입력**

- 게임 시작 시 4명의 플레이어 이름을 입력받음.

### 📱 **모바일 웹 환경 대응**

- 모바일과 웹 환경에서 모두 원활하게 동작해야 함.

### **추가 요구사항**

### 📊 **점수 기록 및 수정**

- 각 라운드의 점수를 입력할 수 있음.
- 기존 라운드 점수를 수정할 수 있음.

### 🔢 **총점 계산**

- 플레이어별 총점을 실시간으로 확인 가능해야 함.

### 🏆 **승리 조건 및 종료 알림**

- 승리 조건 달성 시 종료 모달을 띄움.
- 승리한 플레이어를 확인할 수 있음.

### 🚀 **게임 확장성 고려**

- 새로운 라운드의 점수를 자동 계산.
- 플레이어 추가/삭제 가능 (3~6명 지원).
- 각 라운드의 이야기꾼을 표시.

### ⚙ **점수 및 승리 조건 조정 기능**

- 게임 시작 시 득점 점수 및 승리 조건을 조정할 수 있음.

---

## **2. 설계**

### **화면 구성**

1. **홈 화면**: 게임 시작, 플레이어 이름 입력, 설정 버튼
2. **점수판 화면**: 플레이어별 점수 표시, 총점 계산
3. **설정 모달**: 점수 조정, 승리 조건 설정
4. **게임 종료 모달**: 승리자 안내, 홈으로 이동 버튼

### **데이터 인터페이스 설계**

```tsx
const GUESS_TYPE = {
  CORRECT: 'correct',
  INCORRECT: 'incorrect',
} as const

type Player = {
  name: string
  id: string
}

type Vote = Record<
  string,
  { guess: typeof GUESS_TYPE.CORRECT } | { guess: typeof GUESS_TYPE.INCORRECT; votedFor: string }
>

type Scores = {
  [playerId: string]: number
}

type Votes = {
  [playerId: string]: Vote
}

type History = {
  round: number
  storyteller: Player
  scores: Scores
  votes: Votes
}

type Rules = {
  partialPoints: number
  fullPoints: number
  bonusPerVote: number
  winScore: number
}

type DixitGame = {
  players: Player[]
  totals: number[]
  currentRound: number
  history: History[]
  rules: Rules
}
```

### **컴포넌트 설계**

![dixit.drawio (1).png](<attachment:2c464513-d860-48b0-b6b3-9a117edd841c:dixit.drawio_(1).png>)

---

## **3. 개발 계획**

### **사용 기술**

- **Prettier** (코드 포맷팅)
- **ESLint v9.0** (코드 린팅)
- **React Testing Library** (테스트)
- **Jest** (유닛 테스트)
- **TypeDoc** (문서화)
- **TailwindCSS** (스타일링)
- **Vite** (번들러)

**개발 순서**

1. GitHub 프로젝트 세팅: https://github.com/sooooo-an/dixit-game/pull/23
2. ESLint + Prettier 설정: https://github.com/sooooo-an/dixit-game/pull/23
3. TailwindCSS 설정: https://github.com/sooooo-an/dixit-game/pull/23
4. Jest + React Testing Library 설정: https://github.com/sooooo-an/dixit-game/pull/29
5. UI 컴포넌트 개발: https://github.com/sooooo-an/dixit-game/pull/24
6. `DixitApp` 페이지 구현: https://github.com/sooooo-an/dixit-game/pull/24
7. `DixitSetup` 페이지 구현: https://github.com/sooooo-an/dixit-game/pull/24
8. `DixitBoard` 페이지 구현: https://github.com/sooooo-an/dixit-game/pull/28
9. 테스트 코드 작성: https://github.com/sooooo-an/dixit-game/pull/29
10. 코드 수정 및 개선: https://github.com/sooooo-an/dixit-game/pull/29
11. 문서 작성
12. CI/CD 적용

---

## **4. 테스트 계획**

- **현재 진행 중**: 게임 로직 테스트
- **추가 예정**
  - **통합 테스트**: 점수 계산 및 게임 흐름 검증
  - **컴포넌트 유닛 테스트**: UI 요소별 기능 테스트
  - **E2E 테스트**: Cypress를 활용한 전체 게임 흐름 테스트

---

## **5. 배포 계획**

- **Vercel 배포**: [Dixit Game](https://dixit-game-five.vercel.app/)
- **향후 변경 예정**: GitHub Actions, GitHub Pages 적용
- **배포 체크리스트**
  - husky를 통한 git commit 검사
  - 배포 전 테스트 코드 실행

---

## **6. 유지보수 계획**

- GitHub Milestone을 활용한 지속적인 관리

### **📌 v0.0.1 개선 사항**

✅ 게임 히스토리 수정 기능 추가

✅ 통합 테스트 및 유닛 테스트 코드 보강

✅ 승리 조건 UI 개선 (게임 종료 모달)

✅ 웹스토리지 활용한 데이터 저장

✅ 점수 입력 UX 개선

✅ 코드 리팩토링

### **🚀 추가 기능 고려사항**

- 다국어(i18n) 적용
- 게임 로그 기능 추가
- 게임 저장/불러오기 기능 개선
- 접근성(A11y) 강화
- 데이터 인터페이스 수정
