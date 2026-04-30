# 커밋 + PR + 브랜치 정리 자동화

현재 변경사항을 커밋하고, PR을 생성한 뒤, dev 브랜치로 복귀합니다.

## 작업 순서

1. 현재 브랜치 확인 — dev 또는 master면 중단하고 사용자에게 알립니다
2. `git status`로 변경사항 확인
3. 변경사항이 있으면 스테이징 후 커밋 (커밋 메시지는 변경 내용을 분석해서 작성)
4. 현재 브랜치를 origin에 push (upstream 설정 포함)
5. dev 브랜치와의 차이를 분석해 PR 생성 (.github/PULL_REQUEST_TEMPLATE.md 형식 사용)
6. dev 브랜치로 checkout
7. origin/dev 기준으로 pull
8. 이전 feature 브랜치를 로컬에서 삭제

## 커밋 메시지 규칙

`.gitmessage.txt` 컨벤션을 따릅니다:
- 형식: `<type>: <subject>`
- type: feat / fix / style / chore / refactor / docs

## PR 템플릿 형식

```markdown
## Notion Project

- [Project 이름](https://www.notion.so/...)

## 🔗 Notion Task

- [Task 이름](https://www.notion.so/...)

## 📝 Description

<!-- 변경 사항을 간략히 설명해주세요. -->

## ✅ Checklist

<!-- - [ ] 셀프 리뷰 완료 -->
```

## 노션 링크

$ARGUMENTS

위 링크가 있으면 PR의 Notion Project / Notion Task 항목에 포함시킵니다. 없으면 placeholder 텍스트 그대로 둡니다.

## PR 제목 형식

`[Type] 제목` — type은 대괄호 안에 대문자로 (예: `[Feat]`, `[Fix]`, `[Chore]`, `[Refactor]`, `[Style]`, `[Docs]`)

## 실행

`gh pr create` 명령어로 dev 브랜치를 base로 PR을 생성합니다.
