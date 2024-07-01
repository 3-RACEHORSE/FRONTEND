<div align="center" >

# 🎉MEET PLUS

![image](./readme-img/readme_1.png)

### MEET PLUS는 실시간 경매를 통한, 인플루언서 팬미팅 서비스 입니다.

</div>

<div>

</br>

<div align="center">

`2024/04/18 ~ 2024/07/04`

</br>

[MEET PLUS 바로가기](https://fe-meetplus.vercel.app/)

</div>
</div>

</br>

## 🔗목차

<div align="center">

[로컬 실행방법](#🔗로컬-실행-방법)

[버전](#🔗Version)

[서비스 화면](#🔗서비스-화면)

[개발 과정](#🔗개발-과정)

[구현 방법](#🔗구현-방법)

[고민 과정](#🔗고민-과정)

</div>

## 🔗로컬 실행 방법

```
npm i

npm run dev
```

</br>

## 🔗버전

```
node 18.17.1

next 14.2.3

jest 29.7.0

eslint 8

next-auth 5.0.0-beta.17

react-query 5.40.0

sass 1.77.0
```

</br>

## 🔗서비스 화면

<div align="center" >

|               메인 페이지               |               경매 페이지                |           경매 리스트 페이지            |
| :-------------------------------------: | :--------------------------------------: | :-------------------------------------: |
| ![alt text](/public/README/image-9.png) | ![alt text](/public/README/image-11.png) | ![alt text](/public/README/image-7.png) |

|             경메 상세 페이지             |            인플루언서 페이지            |               알림 페이지               |
| :--------------------------------------: | :-------------------------------------: | :-------------------------------------: |
| ![alt text](/public/README/image-10.png) | ![alt text](/public/README/image-8.png) | ![alt text](/public/README/image-2.png) |

|              채팅방 페이지              |              채팅룸 페이지              |               결제 페이지                |
| :-------------------------------------: | :-------------------------------------: | :--------------------------------------: |
| ![alt text](/public/README/image-3.png) | ![alt text](/public/README/image-4.png) | ![alt text](/public/README/image-12.png) |

|          회원가입 관련 페이지           |              마이페이지               |          서비스 다크모드 적용           |
| :-------------------------------------: | :-----------------------------------: | :-------------------------------------: |
| ![alt text](/public/README/image-1.png) | ![alt text](/public/README/image.png) | ![alt text](/public/README/image-5.png) |

</div>

## 🔗개발 과정

### 🧑‍💻개발 개요 <br>

- 팀에서, 프론트엔드를 전체를 담당하게 된 만큼, 책임감과 서비스의 완성에 많이 고민을 했습니다.

<br>

### 🪚설계 방향 선택 <br>

- 현재 서비스는 `데드라인` 이 있으며, `확장성`을 고려해야 합니다.
- 기능을 독립적인 모듈로 분리하여 여러 기능 요구사항을 구현하고, 모듈 재사용 가능성을 고려하여 확장성을 확보하고자 합니다. 또한, 효율적인 관리를 통해 성능을 향상시키고, 각 모듈이 독립적으로 구현되어 식별하는 것이 용이하여 데드라인을 충족할 수 있다고 판단했습니다.
- 따라서, 선택한 설계 방향은 `아토믹 디자인`입니다. ATOM, MOLECULES, ORGANISMS 그리고, 서버컴포넌트를 TEMPLATES로 기준을 세웠습니다.

### 🪚테스트 코드 <br>

- 수정이 많은 api를 기준으로, `jest`를 사용하여 api 테스트 코드를 작성했습니다. 그리고 `github action`을 통해, 모든 테스트 코드가 통과시, merge되도록 하여, main 과 배포 서버를 보호했습니다.

<br>
