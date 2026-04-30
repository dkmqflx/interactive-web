# PR 생성 자동화

현재 브랜치의 변경사항을 dev 브랜치로 PR을 생성합니다.

## 작업 순서

1. 먼저 현재 브랜치를 origin에 push합니다 (upstream 설정 포함)
2. dev 브랜치와의 차이점을 분석합니다
3. 커밋 히스토리와 변경된 파일들을 확인합니다
4. 아래 PR 템플릿 형식에 맞게 PR을 생성합니다

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

## PR 작성 가이드라인

- **Notion Project / Notion Task**: 노션 링크가 제공되면 해당 링크로 채우고, 없으면 placeholder 텍스트 그대로 둡니다
- **Description**: 커밋 히스토리와 변경된 파일을 기반으로 변경 사항을 간략히 작성합니다
- **Checklist**: 리뷰어가 확인해야 할 항목들을 체크리스트로 작성합니다

## 노션 링크

$ARGUMENTS

위 링크가 있으면 PR 설명의 Notion Project / Notion Task 항목에 포함시킵니다. 링크가 없으면 placeholder 텍스트 그대로 둡니다.

## 실행

`gh pr create` 명령어를 사용하여 dev 브랜치를 base로 PR을 생성합니다.
