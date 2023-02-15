# Dynamic List 개발

## 1. 구조

- index.html : Dynamin List 화면 HTML
- /src/css
  - index.css : 전체 컴포넌트의 스타일, item 호버시 margin-right:40px
  - reset.css : 브라우저의 설정되어있는 스타일을 초기화해주는 스타일
- /src/js
  - index.js : 최초 진입점, App 컴포넌트를 시작
  - App.js : 컴포넌트 전체의 흐름을 담당
    - /Components
      - Item/index.js : dynamic하게 움직이는 item들을 담당
      - Item/index.test.js : item 컴포넌트의 test 코드
      - Modal/index.js : item을 click 하면 노출되는 modal을 담당
      - Modal/index.test.js : modal 컴포넌트의 test 코드

## 2. 컴포넌트 상세 설명

- /js/Components/Item

  - contructor()
    - Item 클래스의 생성자 함수로써 parentElement, renderElement, Modal 컴포넌트를 생성한 modal element들을 초기화해주고 이벤트를 바인딩합니다.
  - createRenderElement()
    - App컴포넌트에서 item 갯수를 입력받아, 갯수에 따라 필요한 Item element를 생성해서 리턴합니다. 입력받은 갯수가 number가 아닐경우 디폴트로 6개가 생성되도록 합니다.
  - bindEvents()
    - Item element를 감싸고있는 상위(.item-list) element에 이벤트를 위임하여 mouseover, mouseout 이벤트 핸들러를 바인딩합니다. 마우스 이벤트가 발생하면 처리 로직은 dynamickItems()가 호출됩니다. 그리고 item을 클릭시 modal 인스턴스를 통해 modal을 open해주는 이벤트를 바인딩해줍니다.
  - isItem()
    - 인자로 받은 target이 item인지 판별하여 true / false를 반환합니다.
  - updateNearByItems()
    - isItem 함수로 item인 경우에만 전,후 요소에 near class값을 추가 또는 제거하여 스타일을 변경합니다. 요소의 전,후는 target.previousElementSibling과 target.nextElementSibling 요소로 식별합니다.
  - render()
    - 부모 element에 Item 컴포넌트를 렌더링합니다.
  - init()
    - App.js에서 호출될 함수로, render() 함수를 호출합니다.

- /js/Components/Modal
  - contructor()
    - Modal 클래스의 생성자 함수로써, parentElement는 props로 받아오는데 default값으로 id가 "app"인 element를 parentElemet로 선언하고, renderElement는 Modal의 렌더링 element 입니다. 그리고 이벤트를 바인딩합니다.
  - createRenderElement()
    - static메소드로, 기본적인 Modal Element를 생성하여 반환합니다.
  - bindEvents()
    - modal 최상의 element 자체를 클릭했을 경우에만 close() 메소드를 실행시켜 modal를 닫습니다.
  - open()
    - text 인자를 받아 modal 내부에 span 태그에 innnerHTML로 넣어주고, parentElement에 modal을 추가합니다.
  - close()
    - parentElement에 modal element가 포함되어있는지 체크후에 modal을 parentElement에서 삭제합니다.

## 3. 참고사항

- script type을 module 방식을 사용하였기에 로컬에서 fill:// 프로토콜을 사용해 웹페이지를 열면 import, export 지시자가 동작하지 않습니다. 실행하려면 로컬 HTTP서버로 실행해야만 합니다.
