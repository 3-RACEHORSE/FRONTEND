<div align="center" >

# 🎉MEET PLUS

![alt text](/public/README/image.png)

### MEET PLUS는 실시간 경매를 통한, 인플루언서 팬미팅 앱 서비스 입니다.

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

[사용 기술](#🔗사용-기술)

[로컬 실행방법](#🔗로컬-실행-방법)

[버전](#🔗Version)

[서비스 화면](#🔗서비스-화면)

[개발 과정](#🔗개발-과정)

[기능서술 및 구현방법](#🔗기능서술-및-구현방법)

</div>

## 🔗사용 기술

![NEXT.JS](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![Tailwind](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=TailwindCSS&logoColor=white) ![React Query](https://img.shields.io/badge/reactquery-%23FF4154?style=for-the-badge&logo=reactquery&logoColor=white) ![PWA](https://img.shields.io/badge/pwa-%235A0FC8?style=for-the-badge&logo=pwa&logoColor=white) ![SASS](https://img.shields.io/badge/sass-%23CC6699?style=for-the-badge&logo=sass&logoColor=white) ![Jest](https://img.shields.io/badge/jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white) ![Vercel](https://img.shields.io/badge/vercel-%23000000?style=for-the-badge&logo=vercel&logoColor=white) ![Shadcn/ui](https://img.shields.io/badge/shadcnui-%23000000?style=for-the-badge&logo=shadcnui&logoColor=white) ![NextAuthV5](https://img.shields.io/badge/NextAuthV5-000000?style=for-the-badge&logo=NextAuthV5&logoColor=white)
<img src="https://img.shields.io/badge/amazons3-569A31?style=for-the-badge&logo=amazons3&logoColor=white">
<img src="https://img.shields.io/badge/githubactions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white">

</br>

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

|          회원가입 관련 페이지           |                마이페이지                |          서비스 다크모드 적용           |
| :-------------------------------------: | :--------------------------------------: | :-------------------------------------: |
| ![alt text](/public/README/image-1.png) | ![alt text](/public/README/image-13.png) | ![alt text](/public/README/image-5.png) |

</div>

## 🔗개발 과정

### 🧑‍💻개발 개요 <br>

- 팀에서, 프론트엔드 전체를 담당하게 된 만큼, 책임감과 서비스의 완성에 많이 고민을 했습니다.

### 🪚설계 방향 선택 <br>

- 현재 서비스는 `데드라인` 이 있으며, `확장성`을 고려해야 합니다.
- 기능을 독립적인 모듈로 분리하여 여러 기능 요구사항을 구현하고, 모듈 재사용 가능성을 고려하여 확장성을 확보하고자 합니다. 또한, 효율적인 관리를 통해 성능을 향상시키고, 각 모듈이 독립적으로 구현되어 식별하는 것이 용이하여 데드라인을 충족할 수 있다고 판단했습니다.
- 따라서, 선택한 설계 방향은 `아토믹 디자인`입니다. ATOM, MOLECULES, ORGANISMS 그리고, 서버컴포넌트를 TEMPLATES로 기준을 세웠습니다.

### 📱웹 앱이지만, 실제 앱처럼 <br>

- PWA를 사용했습니다. 메타데이터를 수정을 통해, 휴대폰 상단바까지 화면을 확장하였고, 웹앱의 특성인 URL을 보이지 않게 하여, 개인 휴대폰에 앱처럼 사용할 수 있습니다.

### ✏️테스트 코드 <br>

- 수정이 많은 api를 기준으로, `jest`를 사용하여 api 테스트 코드를 작성했습니다. 그리고 `github action`을 통해, 모든 테스트 코드가 통과시, merge되도록 하여, main 과 배포 서버를 보호했습니다.

### 🌐배포 <br>

- 프로젝트 특성상, 많은 페이지 퍼블리싱이 필요했기 때문에, 배포는 간단하게 `vercel`로 진행했습니다. 다만, organization에서의 vercel의 직접적인 접근이 불가능 했기 때문에, fork를 통해 개인 레포지토리까지의 파이프 라인을 구성하고 자동 배포가 되도록 `github action`을 구축했습니다.

<br>

## 🔗기능서술 및 구현방법

### 📌구현기능

- NEXTAUTH v5을 통한 서드파티 로그인
- RQ v5를 사용한, 무한 스크롤 및 서버 인터랙션 표준화
- SSE 연결을 통한, 알림, 채팅, 경매 실시간 통신
- 자주 변경되는 API 테스트 코드 작업
- 배포 및 테코 파이프라인 구성
- S3 연결을 통한 이미지 데이터 관리 및 편집
- 아토믹 디자인 및 shadcnUI를 통한 재사용 가능한 코드 구성
- 자체 실시간 경매 로직 트리거 생성
- 여러 에러 상황 발생 시 예외 처리
- 커스텀 훅을 통한 재사용 가능한 utils 생성
- 시스템 다크모드 적용
- 아임포트 결제 로직 연동
- 라이브러리 의존을 피하기 위해, 자체 애니메이션 로직 구현

`등등 추가적인 여러 기능이 많습니다`

<br>

### SSE 통신 <br>

```
...

    const eventSource = useRef<EventSource | null>(null);

    useEffect(() => {
        const fetchSSE = () => {
        eventSource.current = new EventSourcePolyfill(
            `URL`
            {
            withCredentials: true,
            headers: {
                Authorization: Bearer ${authorization},
                uuid: ${uuid},
            },
            }
        );

        eventSource.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
        };

        eventSource.current.onerror = async () => {
            eventSource.current?.close();
            setTimeout(fetchSSE, 3000);
        };

        eventSource.current.onopen = (event) => {
            console.log("연결 성공:", event);
        };
        };

        fetchSSE();

        return () => {
        eventSource.current?.close();
        };
    }, [authorization, roomNumber, uuid, setChatInfo, setChatNum]);

...
```

`EventSourcePolyfill을 사용하여 서버로 전송할 때, 헤더에 토큰을 보낼 수 있게 했고, 45000ms마다 끊기는 특성에 따라 fetchSSE를 재요청 하는 방식으로 연결을 유지했습니다.`

<br>

### 채팅방 역 무한 스크롤 <br>

```
...

    const chatContainerRef = useRef<HTMLDivElement>(null);
    const prevScrollHeight = useRef<number>(0);
    const isAtBottom = useRef<boolean>(true);

    useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
        if (isAtBottom.current) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
        } else {
        chatContainer.scrollTop +=
            chatContainer.scrollHeight - prevScrollHeight.current;
        }
    }
    }, [chatData]);

    useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
        const handleScroll = () => {
        isAtBottom.current =
            chatContainer.scrollTop + chatContainer.clientHeight >=
            chatContainer.scrollHeight;
        prevScrollHeight.current = chatContainer.scrollHeight;
        };

        chatContainer.addEventListener("scroll", handleScroll);
        return () => chatContainer.removeEventListener("scroll", handleScroll);
    }
    }, []);

    return chatContainerRef;

...
```

`채팅 데이터가 업데이트되면 사용자가 채팅창 맨 아래에 있는 경우 스크롤을 맨 아래로 이동시키고, 그렇지 않으면 새로운 메시지에 맞춰 스크롤 위치를 조정합니다. 이후, 사용자가 스크롤할 때, 채팅창의 현재 스크롤 위치와 높이를 저장하여 이후 스크롤 위치를 올바르게 유지합니다.`

<br>

### 이미지 CROPPER <br>

```
...

    <Cropper
    src={cropperSrc}
    style={{ height: "fit-content", width: "100%" }}
    initialAspectRatio={1}
    aspectRatio={1}
    guides={false}
    ref={cropperRef}
    zoomable={false}
    />

...

...

    // 이미지 데이터를 base64로 인코딩
    const base64Data = croppedCanvas
    .toDataURL()
    .replace(/^data:image\/\w+;base64,/, "");
    const buf = Buffer.from(base64Data, "base64");
    // S3에 업로드할 때 사용할 설정
    const params = {
    Bucket: "cheonma",
    Key: `images/${Date.now()}.png`, // 이미지 파일 이름 설정
    Body: buf,
    ACL: "public-read", // 업로드된 이미지를 공개적으로 접근할 수 있도록 설정
    ContentType: "image/png", // 이미지 파일 타입 지정
    };

    // S3에 이미지 업로드 요청
    const { Location } = await s3.upload(params).promise();

    // 업로드된 이미지의 URL 반환
    return Location;

...
```

`cropper 라이브러리를 사용했습니다. 통일성 있는 이미지 비율을 맞추기 위해, ratio 속성을 설정했으며, 이미지 데이터는 s3를 통해 주소로 변한 한 뒤에, 편집이 가능하도록 하여, 백엔드에서 자장할 시, 데이터 크기 문제를 해결했습니다.`

<br>

### 시스템 다크모드 적용 <br>

```
...

    export const useDarkMode = (): boolean => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
        const savedMode = Cookies.get("mode");
        return savedMode === "dark";
    });

    useEffect(() => {
        const handleDarkModeChange = () => {
        const isDark = document.body.getAttribute("data-theme") === "dark";
        setIsDarkMode(isDark);
        Cookies.set("mode", isDark ? "dark" : "light");
        };

        const observer = new MutationObserver(handleDarkModeChange);
        observer.observe(document.body, {
        attributes: true,
        attributeFilter: ["data-theme"],
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const currentTheme = isDarkMode ? "dark" : "light";
        document.body.setAttribute("data-theme", currentTheme);
    }, [isDarkMode]);

    return isDarkMode;
    };

...
```

`초기값으로 쿠키에 저장된 모드를 불러와 isDarkMode 상태를 설정합니다. data-theme 속성 변화를 감지하는 MutationObserver를 사용하여 테마 변경 시 isDarkMode 상태를 업데이트하고 쿠키에 저장합니다.이후 isDarkMode 상태가 변경되면 data-theme 속성을 업데이트합니다. 최종적으로 현재 다크 모드 상태를 반환합니다.`

---
