## 리엑트 라이브러리 컴포넌트 만들기

1.  pnpm을 활용해서 모노레포 구조를 통해 실제 라이브러리로 배포해야 하는 부분과 웹에 게시할 홈페이지를 구분합니다.

    - packages/components: React components library Source
    - apps/applications: web app

2.  Storybook을 활용해서 리엑트 컴포넌트 라이브러리에 대한 페이지를 제작합니다.

3.  pnpm, rollup을 활용한 이유

    - 현재 package @kd-monorepo/components 관리는 rollup 과 pnpm으로 관리합니다. 해당 페키지에서 관리하는 타입 파일과, js 파일은 모두 rollup을 통해 build 된 파일을 가리키고 있습니다.
    - pnpm은 패키지를 심볼릭 링크로 활용합니다. 따라서 개발 단계에서 apps/applicaitions에서 패키지를 실제로 복사하는 대신, 해당 패키지의 소스가 있는 경로를 참조해서 링크를 생성합니다. 이 덕분에 소스
      코드가 변경되면 해당 코드의 변경 사항이 즉시 반영됩니다. 또한 Turborepo 등의 다른 모노레포 서비스를 빌리지 않고 모노레포 환경을 구성해본다는 점에서 pnpm을 선택했습니다.
    - packages/componensts는 실제로 라이브러리로 배포하기 위한 목적입니다. 이때 vite, webpack을 사용하지 않고 rollup을 사용하는 이유는 빌드 결과물을 ES6 모듈 형태로 만들수 있습니다. 즉 라이브러리를 사용하는 쪽에서 전체를 불러오는게 아닌 필요한 소스 코드만 불러와서 사용할 수 있다는 것을 의미합니다. 실제로 사용하지 않는 코드를 빌드 단에서 제서하는 트리 쉐이킹 기법을 활용할 수 있기 때문에 빌드 크기를 효율적으로 줄일 수 있습니다. 이러한 이유로 rollup은 주로 라이브러리를 제작하기 위한 번들러로 채택됩니다.

4.  pnpm 명령어 root 설정하기
    다음과 같이 pnpm 명령어를 root package.json에 설정했습니다.

```json
{
  "scripts": {
    "app": "pnpm -F @kd-monorepo/application",
    "components": "pnpm -F @kd-monorepo/components"
  }
}
```

이를 통해 `pnpm app <명령어>` 등을 통해 쉽게 특정 package를 통제할 수 있습니다. -F 는 filter를 의미합니다.
