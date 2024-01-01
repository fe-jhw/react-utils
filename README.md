# react-utils

> 리액트 개발에서 공통적으로 쓰이는 hooks, util 함수들을 모아놨습니다.

## fp

함수형 프로그래밍

- try: 에러발생시 값 처리 (에러 사유 포함)
- option: 에러발생시 값 처리 (에러 사유 미포함)

## hooks

- useIntersectionObserverRef : IntersectionObserver 사용하는 RefObject or RefCallback 리턴
- useToggle: 토글 추상화
- useInterval: 리액트 내에서 setInterval
- useDebounce: 디바운스

## utils

- ObjectHandler: Object 관련 util 함수들
- RobustContext: React Context에 최적화 몇가지 더한 것
- StringUtils: String 관련 util 함수들
- EventUtils: Event 관련 util 함수들 (많아지면 추후 폴더로 관리)
- TestUtils: Test 관련 util 함수들

## TODO

- 롤업으로 라이브러리로 말기
