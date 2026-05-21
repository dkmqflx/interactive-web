# Interactive Web Showcase

Next.js 16 + React 19 기반의 인터랙티브 웹 실험 모음입니다. 각 프로젝트는 독립된 라우트로 제공되며, Canvas 2D / WebGL / GLSL 셰이더를 활용한 시각 효과와 랜딩 페이지 카피를 결합한 형태로 구성되어 있습니다.

---

## Projects

### 01. Vesper Fireworks · `/fireworks`

**Canvas 2D 파티클 시뮬레이션 기반 불꽃놀이 제작사 프로모 사이트**

불꽃 꼬리(Tail)가 화면 아래에서 위로 솟구치고, 정점에서 수십 개의 불꽃(Spark)으로 분열하는 파티클 시스템을 Canvas 2D로 구현한 랜딩 페이지입니다. 불꽃쇼 제작사의 포트폴리오 사이트 형식으로 제작되었으며, 야경 실루엣 이미지를 뷰포트 하단에 고정해 현실감 있는 밤하늘 배경을 연출합니다.

**기술 포인트**
- Canvas 2D requestAnimationFrame 루프 — Tail·Spark 클래스 기반 파티클 생명주기 관리
- HSL 색상 시스템 — 발사체마다 hue를 무작위 배정해 다채로운 색상 표현
- Trail 잔상 효과 — fillRect alpha 합성으로 꼬리 자국 표현
- 폭죽 분열 타이밍 — vy 속도가 임계값 이하로 떨어지는 순간 자동 폭발

**스택**
`Next.js` `TypeScript` `Canvas 2D` `Tailwind CSS`

---

### 02. Liminal Countdown · `/countdown`

**클릭 시작 5초 카운트다운 — 글로우 링·충격파·파티클 버스트 시퀀스**

버튼 클릭으로 시작되는 5초 카운트다운 애니메이션을 Canvas 2D로 구현했습니다. 숫자가 바뀔 때마다 원형 글로우 링이 확장되고, 마지막 0에 도달하면 충격파(Shockwave)와 3색 파티클 버스트가 동시에 발생합니다. 카운트다운 디자인 스튜디오의 포트폴리오 형식으로 구성된 스크롤 에세이가 아래에 이어집니다.

**기술 포인트**
- Shockwave 클래스 — 반지름이 maxR까지 선형 확장되며 opacity fade-out
- 3색 파티클 (White / Cyan / Amber) — 각각 다른 speedMul·fadeRate로 폭발감 차별화
- 글로우 링 — createRadialGradient로 중심부 광원 효과 표현
- 숫자 전환 타이밍 — rAF 기반 경과 시간(elapsed) 측정으로 1초 단위 이벤트 발화

**스택**
`Next.js` `TypeScript` `Canvas 2D` `Tailwind CSS`

---

### 03. Drawn · `/confetti`

**룰렛 당첨자 공개 + 4방향 컨페티 버스트 라이브 추첨 플랫폼**

"Reveal" 버튼을 누르면 이름 목록이 룰렛처럼 빠르게 스크롤되다가 감속 곡선을 그리며 당첨자에 멈추고, 동시에 화면 4개 지점에서 컨페티(원형·사각형 파티클)가 폭발합니다. 브랜드 경품 추첨·커뮤니티 드롭 등에 활용할 수 있는 라이브 추첨 SaaS 형식으로 제작되었습니다.

**기술 포인트**
- 4-source 컨페티 — 화면 상단 좌우·하단 좌우 4개 지점에서 각도·spread 파라미터를 달리해 동시 발사
- 감속 룰렛 — 선택된 이름 인덱스를 목표로 easing 적용, 중앙 정렬 후 정지
- Particle 클래스 — shape(circle/square), widthDelta·heightDelta로 파티클이 회전하며 찌그러지는 효과
- gravity·friction 물리 — vy에 중력 가산, vx·vy에 마찰 계수 적용

**스택**
`Next.js` `TypeScript` `Canvas 2D` `Tailwind CSS`

---

### 04. Credit Card 3D · `/interactive-card`

**Three.js + GSAP 기반 5종 카드 티어 3D 인터랙터 + Toss 스타일 랜딩 페이지**

Classic·Gold·Platinum·Signature·Infinite 5가지 카드 등급을 Three.js로 3D 렌더링합니다. 카드 앞면에는 CanvasTexture로 그라디언트·카드번호·홀더명을 실시간 드로잉하고, OrbitControls로 자유 회전이 가능합니다. 티어 전환 시 GSAP 애니메이션으로 카드가 부드럽게 교체됩니다. 하단 랜딩 영역은 Toss의 시각 언어를 차용해 파란색·하얀색 톤, 좌우 교차 피처 블록(Unsplash 이미지), 가격제 스타일 티어 비교(Most popular 강조), shadcn Accordion 기반 FAQ, 그리고 스크롤 진행도에 따라 좌우로 늘어나며 풀-블리드(78vw → 100vw)로 전환되는 GSAP ScrollTrigger 이미지 배너로 구성됩니다.

**기술 포인트**
- CanvasTexture 실시간 드로잉 — 2D Canvas에 그라디언트·텍스트를 렌더링해 Three.js 텍스처로 적용
- ExtrudeGeometry — 둥근 모서리 곡률을 가진 카드 형상을 Shape + bevel로 절차 생성
- GSAP 카드 전환 — y축 회전 트윈으로 티어 전환 시 자연스러운 플립 모션
- ScrollTrigger 풀-블리드 확장 — 스크롤 진행도에 따라 이미지 컨테이너의 width와 border-radius를 동시에 스크럽해 화면을 가득 채우는 영상감 연출
- shadcn Accordion — Radix UI 기반 단일 펼침 FAQ, Tailwind v4 keyframe(`accordion-down`/`up`)으로 높이 트랜지션

**스택**
`Next.js` `TypeScript` `Three.js` `GSAP` `ScrollTrigger` `Radix UI` `shadcn/ui` `Tailwind CSS`

---

### 05. Three.js Fireworks · `/three-fireworks`

**WebGL 포인트 스프라이트 기반 불꽃 패턴 4종 자동 발사 시스템**

Peony·Ring·Willow·Chrysanthemum 4가지 패턴의 폭죽이 3초 간격으로 자동 발사되는 WebGL 파티클 시스템입니다. 클릭하면 즉시 해당 위치에 폭죽이 추가됩니다. 각 폭죽은 수천 개의 포인트 스프라이트로 구성되며, Additive Blending으로 겹치는 파티클이 더 밝게 빛납니다.

**기술 포인트**
- 4종 패턴 분기 — Peony(구형 균등 분산), Ring(기울어진 평면 원형), Willow(강한 중력으로 수양버들 형태), Chrys(방사형 선다발)
- BufferGeometry Float32Array — 수천 개 파티클의 position·color를 typed array로 직접 관리
- Additive Blending — THREE.AdditiveBlending으로 파티클 겹침 시 발광 효과
- 수명 기반 fade-out — 각 파티클의 life·decay 값으로 opacity 감소 후 Firework 오브젝트 제거

**스택**
`Next.js` `TypeScript` `Three.js` `Tailwind CSS`

---

### 06. Starlight Earth · `/depth-effect`

**커스텀 GLSL 셰이더 3종으로 구성된 WebGL 지구본**

지구 텍스처 이미지를 기반으로 세 개의 레이어드 셰이더가 하나의 지구를 표현합니다. 기본 구체(base sphere), 대륙 윤곽을 드러내는 포인트 클라우드, 뒷면 대기권 글로우가 겹쳐지며 거리에 따라 강도가 변합니다. OrbitControls로 드래그 회전·스크롤 줌이 가능합니다.

**기술 포인트**
- Base sphere 셰이더 — viewDistance 기반으로 원거리일수록 어두워지는 뎁스 감쇠 적용
- Points 셰이더 — gl_PointCoord circle SDF로 원형 포인트 렌더링, uTime uniform으로 깜빡임 노이즈
- Backside glow 셰이더 — THREE.BackSide 메시에 대기권 발광 색상을 뎁스와 연동해 표현
- 초기 플래시 방지 — 텍스처 로드 완료 후 렌더러 DOM 삽입으로 흰 화면 깜빡임 제거

**스택**
`Next.js` `TypeScript` `Three.js` `GLSL` `Tailwind CSS`

---

## Getting Started

```bash
pnpm install
pnpm dev
```

| Route | Project |
|---|---|
| `/` | 전체 프로젝트 인덱스 |
| `/fireworks` | Vesper Fireworks |
| `/countdown` | Liminal Countdown |
| `/confetti` | Drawn |
| `/interactive-card` | Credit Card 3D |
| `/three-fireworks` | Three.js Fireworks |
| `/depth-effect` | Starlight Earth |
