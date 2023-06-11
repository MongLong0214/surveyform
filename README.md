## 시작하기

```bash
1. npm install
   =>필요한 패키지를 설치합니다.
 
2. json-server --watch db.json --port 5000
   => json-server를 실행합니다. (mock server)

3. 만약, json-server가 실행되지 않는다면 아래 명령어를 실행합니다.
   => Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted
      (PowerShell 스크립트에 대한 실행 정책을 'Unrestricted'로 설정하는 명령어입니다. 
       실행 정책은 PowerShell 스크립트가 어떻게 실행되는지를 제어합니다.)

4. npm start
   => 앱을 실행합니다.
   
5.  혹시, 3번 항목을 실행했다면 아래 명령을 사용하여 앱 테스트가 끝난 후 기본 상태로 돌릴 수 있습니다.
     (PowerShell의 기본 실행 정책은 "Restricted"입니다.)
     
   => Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Restricted
     (기본 상태로 돌리는 명령어입니다.)
```

```
로컬 실행 도메인 : http://localhost:3000

## 앱 사용법

  + 버튼을 눌러 설문지를 생성합니다.
  생성 된 설문지는 '수정'버튼을 눌러 수정합니다.
  생성 된 설문지는 '삭제'버튼을 눌러 삭제합니다. 


