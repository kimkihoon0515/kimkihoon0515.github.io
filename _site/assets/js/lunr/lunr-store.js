var store = [{
        "title": "Docker",
        "excerpt":"Docker   도커 (Docker)   도커는 컨테이너 기반의 오픈소스 가상화 플랫폼이다. 도커는 서비스를 운영하는데 필요한 실행환경, 라이브러리, 소프트웨어, 시스템 도구, 코드 등을 컨테이너라는 표준화된 단위로 추상화한다. 이렇게 만들어진 컨테이너는 컴퓨팅 환경에 구애받지 않고 서비스가 실행될 수 있도록 한다.   도커는 컨테이너를 어딘가에서 가져와서 서비스를 운영할 컴퓨팅 환경에서 실행하기만 하면 된다. 실행된 서비스는 컴퓨팅 환경과 독립된 가상의 환경에서 실행되며 일관된 결과를 보장한다.   도커를 사용한 서버관리   도커를 사용하면 OS 환경설정, 언어, 라이브러리, 시스템 도구 등이 설치된 환경을 그대로 이미지로 빌드할 수 있다. 이미지는 후술할 Dockerfile 이란 것을 이용하여 만들 수 있다. 개발 환경에서 만들어진 이미지를 그대로 프로덕션 서버에 전달하고, 이미지를 기반으로 컨테이너를 생성하고 실행하면 끝이다.   도커를 통해 패키징하여 컨테이너를 만든다면 어떤 언어, 프레임워크, 런타임을 사용하던 관계없이 모두 동일한 배포 프로세스를 갖게 된다.   이런 표준성 덕분에 도커는 높은 확장성과 이식성을 갖는다. 도커가 설치된 환경이라면 어디서든 컨테이너를 실행할 수 있으며, 이를 통해 프로덕션 서버는 물론, 개발 및 테스트 서버 구축과 운영도 아주 쉬워진다.   단, 도커의 컨테이너는 삭제되면 모든 데이터가 초기화된다. 이를 막기 위해 외부 저장장치에 링크를 하거나, AWS S3 등 별도의 클라우드 스토리지를 사용해야할 필요가 있다.   컨테이너 vs VM      VM에는 하이퍼바이저가 있는데 하이퍼바이저란 Virtual Box나 VM Ware와 같은 가상 머신을 생성하고 실행하는 프로세스이다. 하이퍼바이저는 하드웨어를 에뮬레이션하여 하나의 컴퓨터에서 다수의 운영체제를 운영할 수 있게 해주는 소프트웨어이다.   하이퍼바이저 자체를 실행하는 측을 Host OS 라고 하며, 하이퍼바이저가 구동하는 가상화된 OS를 Guest OS라고 한다. 게스트는 호스트로부터 일정량의 리소스를 할당받아 구동된다. 운영체제 자체를 가상화하여 실행하는 특징으로 도커에 비해 상대적으로 무겁다. Host OS와 Guest OS의 기능 중복으로 인해 약 10 ~ 20%의 오버헤드를 갖는다.   반면 도커는 Guest OS 없이 프로세스를 격리하는 방식으로 Host OS의 모든 기능과 리소스를 컨테이너간에 공유한다. 운영체제 위에 또 다른 운영체제를 구동하지 않아도 되며, 리소스도 공유해서 사용하므로 오버헤드는 3 ~ 5% 이내라고 한다. 또한 운영체제를 별도로 가상화 하지 않으므로 이미지 파일의 용량도 하이퍼바이저에 비해 낮다.   도커 컨테이너는 Kernel 데이터를 갖고 있지 않다. 다만 컨테이너가 필요로 하는 Kernel은 Host OS의 것을 그대로 사용하고, Kernel 외의 데이터만을 패키징하여 컨테이너가 가지고 있는다. 예를 들어 Ubuntu 와 CentOS의 차이점만을 컨테이너에 패키징되어 담고 있는 것이다.   Docker는 Linux 환경에서만 네이티브로 동작하고 그 이외의 환경에서 도커를 사용할 때에는 도커 자체가 OS에서 지원하는 가상화 환경에서 구동된다.   예를 들어 Mac은 xhyve, Windows는 Hyper-V를 사용하여 별도의 Linux 환경을 만들 수 있다. Docker의 핵심인 Docer Engine은 이 가상화 환경의 Linux 위에서 돌아간다.   자주 쓰는 명령어   docker run   run 명령어는 도커 이미지를 다운받고 컨테이너를 실행하는 명령어이다.   docker run &lt;옵션&gt; &lt;이미지 이름:태그&gt; &lt;명령어&gt; &lt;인자&gt;                  옵션       설명                       -d       컨테이너를 백그라운드에서 실행 (Detached Mode)                 -p       호스트 포트와 컨테이너 내부의 포트를 바인드한다.                 -v       컨테이너 내부의 디렉토리를 호스트로 연결한다.                 -e       컨테이너에서 사용되는 환경변수를 설정한다.                 —name       컨테이너의 이름을 설정한다.                 —rm       컨테이너가 종료될 경우 컨테이너 자체를 삭제한다.                 -it       터미널 입력을 위한 옵션. -i 옵션과 -t 옵션은 주로 함께 사용된다.                 -w       WORKDIR를 설정한다.           docker ps   현재 실행되고 있는 컨테이너를 확인한다.   docer ps &lt;옵션&gt;   -a 옵션을 붙이면 Stop 상태의 컨테이너도 볼 수 있다.   docker stop   실행중인 컨테이너를 중지한다.   docer stop &lt;옵션&gt; &lt;컨테이너 이름&gt; &lt;컨테이너 이름....&gt;   docker rm   컨테이너를 제거한다.   docker rm &lt;옵션&gt; &lt;컨테이너 이름&gt; &lt;컨테이너 이름....&gt;   docker logs   컨테이너에 기록된 로그를 확인할 수 있다.   docker logs &lt;옵션&gt; &lt;컨테이너 이름&gt;   -f 옵션을 사용하면, 로그를 일회성으로 보여주고 끝내지 않고 기다리며 새롭게 발생한 로그도 출력해준다.   docker images   현재 설치된 이미지 리스트를 출력한다.   docker images &lt;옵션&gt; &lt;레포지토리 이름&gt;   레포지토리를 넘겨주면 특정 레포지토리의 이미지만 필터링하여 볼 수 있다.   docker rmi   현재 설치된 이미지를 제거한다.   docker rmi &lt;옵션&gt; &lt;이미지 이름&gt; &lt;이미지 이름...&gt;   docker pull   이미지를 도커 레지스트리로부터 다운로드한다. run 명령을 사용할 때 대상 이미지가 설치되지 않은 이미지의 경우 자동으로 pull 해준다.   docker pull &lt;옵션&gt; &lt;이미지 이름:태그&gt;   Docker Compose   도커를 CLI로 조작하는것이 귀찮기 때문에 이를 해결하기 위해 도커 컴포즈라는 것이 있다. 여러 컨테이너를 모아 하나의 어플리케이션을 구성할 때 사용한다.   docker-compose.yml 파일을 생성하고 다음과 같이 입력하면된다.   version: \"3\" # docker-compose 파일 규격 버전 services:   mysql-db: # 컨테이너 이름     image: mysql:5.7 # 이미지     volumes: # -v 옵션       - ./mysql:/var/lib/mysql     environment: # -e 옵션 \t\tplatform: linux/x86_64 # 맥북 M1 사용자를 위해..       MYSQL_ROOT_PASSWORD: wordpress       MYSQL_DATABASE: wordpress       MYSQL_USER: wordpress       MYSQL_PASSWORD: wordpress   Docker 이미지 빌드하기   Node.js 를 통해 간단한 도커 이미지를 빌드하는 방법   npm init &amp;&amp; npm install express   node.js 앱을 초기화하고 웹서버 작성을 위한 express 프레임워크를 설치한다. 그 다음 server.js 파일을 생성한다.   const express = require(\"express\");  const PORT = 8080; const HOST = \"0.0.0.0\";  const app = express(); app.get(\"/\", (req, res) =&gt; {   res.send(\"Hello Docker\"); });  app.listen(PORT, HOST); console.log(`Running on http://${HOST}:${PORT}`);   Dockerfile 작성   이미지를 빌드하기 위해서는 Dockerfile 이라는 파일을 작성해야한다. Dockerfile 은 도커 이미지를 빌드하기 위한 스크립트 파일이다. 도커는 Dockerfile을 읽고 순차적으로 명령을 실행하여 이미지를 빌드한다.   # 사용할 이미지 FROM node:18.11.0  # 작업 디렉토리 WORKDIR /usr/src/app  # 앱 의존성 설치 COPY package*.json ./ RUN npm install  # 앱 소스 추가 COPY ./server.js ./server.js  EXPOSE 8080 CMD [ \"node\", \"server.js\" ]   보다 자세한 방법은 https://docs.docker.com/engine/reference/builder/ 를 참고한다.   FROM에 명시된 이미지를 베이스로 작성된 스크립트가 순서대로 실행되고 새로운 이미지가 빌드된다.   WORKDIR를 통해 컨테이너의 작업 디렉토리를 설정하고 모든 명령이 이 경로를 기준으로 실행된다.   COPY를 통해 npm 패키지 관련 파일을 복사하고   RUN 명령을 통해 npm install 명령을 직접 실행해 node.js의 의존성 모듈을 설치했다.   COPY 명령을 다시 한 번 사용하여 현재 디렉토리의 server.js를 이미지로 복사한다.   EXPOSE를 통해 외부로 8080 포트를 노출한다. 마지막으로 CMD를 통해 컨테이너가 실행된 직후 실행될 명령도 정의해주면 끝이다.   RUN은 이미지 빌드 단계에서 실행되는 명령이다.   CMD는 컨테이너가 실행된 이후 실행될 명령을 정의한다.   Dockerfile은 파일이므로 Git을 통해 관리 가능하며 이미지 변화 히스토리를 추적할 수 있다.   이미지 빌드하기   docker build -t node-app ./   -t node-app 은 이미지의 이름을 설정하는 옵션이며 ./ 은 Dockerfile의 경로이다.   실행하기   docker run -p 3000:8080 node-app   이미지가 조회되면 위 명령으로 도커 컨테이너를 실행할 수 있다.   도커 이미지의 레이어 구조      도커는 다음과 같이 Layer가 겹겹히 쌓여있는 구조로 되어있다.      위 이미지처럼 도커 이미지는 Dockerfile의 FROMdㅣ 명시한 베이스 이미지 위에 또 다른 레이어가 얹혀서 빌드된다.   도커 허브에 배포하기   깃헙 마냥 도커도 도커 레지스트리가 있는데 우리가 만든 이미지를 배포할 수 있다.   docker tag node-app kimkihoon0515/node-app   이미지 이름을 변경하는 명령어이다.   docker login   도커 허브에 로그인한다.   docker push kimkihoon0515/node-app   도커 허브의 자신의 레포지토리에 이미지를 업로드할 수 있다.   docker rmi kimkihoon0515/node-app docer run kimkihoon0515/node-app   로컬에 설치된 이미지를 제거하고 도커 허브에 등록된 이미지를 run 하는 코드이다.  ","categories": ["DevOps"],
        "tags": [],
        "url": "/devops/docker/",
        "teaser": null
      },{
        "title": "Kubernetes - 쿠버네티스의 특징",
        "excerpt":"Kubernetes      전통적인 배포에서 초기 조직은 애플리케이션을 물리 서버에서 실행했다. 물리 서버를 많이 유지하기 위해서 조직에게 많은 비용이 들었다.   가상화된 배포에서는 많은 비용이 드는 전통적인 배포 방식의 단점을 해결하고 가상화를 도입했다. 이를 통해 단일 물리 서버의 CPU에서 여러 가상 시스템(VM)을 실행할 수 있게 했따. 또한 가상화를 통해 VM간에 애플리케이션을 격리하고 그 정보들을 다른 애플리케이션에서 자유롭게 엑세스 할 수 없기 때문에 일정 수준의 보안성이 제공된다.   또한 각각의 VM은 가상화된 하드웨어 상에서 자체 운영체제를 포함한 모든 구성 요소를 실행하는 하나의 완전한 머신이다.   컨테이너 개발에는 VM과 유사하지만 격리 속성을 완화하여 애플리케이션 간에 운영체제를 공유한다. 그렇기 떄문에 가볍다. VM과 마찬가지로 컨테이너에는 자체 파일 시스템, CPU 점유율, 메모리 프로세스 등의 공간이 있다.   다음으로 컨테이너의 장점을 알아보면 다음과 같다.      기민하다.            VM 이미지를 사용하는 것에 비해 이미지 생성이 쉽고 효율적이다.           지속적인 개발 통합 및 배포            안정적이고 주기적으로 컨테이너 이미지를 빌드해서 배포할 수 있다. 또한 효율적인 rollback이 가능하다.           개발과 운영의 분리            배포 시점이 아니라 빌드/릴리스 시점에 컨테이너 이미지를 만들기 때문에 애플리케이션이 infrastructure에서 분리된다.           가시성            OS 수준의 정보와 메트릭에 머무르지 않는다.           일관성            로컬환경, 클라우드 환경 모두 동일하게 구동된다.           클라우드 및 OS 배포판 간 이식성            Ubuntu, CoreOS, On-premise 어디서든 구동된다.           애플리케이션 중심 관리            가상 하드웨어 상에서 OS를 실행하는 수준에서 논리적인 리소스를 사용하는 OS 상에서 애플리케이션을 실행하는 수준으로 추상화 수준이 높아진다.           분산되고 유연하며 자유로운 마이크로서비스            단일 목적의 머신에서 모놀리식 스택으로 구동되지 않고 독립적인 단위로 쪼개져서 동적으로 배포하고 관리될 수 있다.           리소스 격리            애플리케이션의 성능을 예측할 수 있다.           자원 사용량            리소스 사용량이 고효율이다.         K8s란?                   단일 서버에서 도커를 사용하게 되면 오케스트레이션이라고 불리는 쿠버네티스를 사용할 이유가 없다. 그러나 두 개 이상의 서버에서 도커 데몬을 사용하게 된다면 idle 상태인 서버를 선택하여 해당 서버에 컨테이너를 생성해서 운영해야 한다. 이 때 k8s와 같은 오케스트레이션 툴이 필요하다.      오케스트레이션            컨테이너의 수가 많아지면 관리와 운영에 어려움이 따르는데 이러한 다수의 컨테이너 실행을 관리 및 조율하는 시스템이다.           K8s가 필요한 이유   프로덕션 환경에서는 애플리케이션을 실행하는 컨테이너를 관리하고 가동 중지 시간이 없는지 확인해야 한다. → 예를 들어 컨테이너가 다운되면 다른 컨테이너를 다시 시작해야하는데 이것을 자동으로 처리해야한다.   쿠버네티스는 분산 시스템을 탄력적으로 실행하기 위한 프레임 워크를 제공한다. 애플리케이션의 확장과 장애 조치를 처리하고 배포 패턴 등을 제공한다.   쿠버네티스는 다음과 같은 것들을 제공한다.      서비스 디스커버리, 로드 밸런싱            쿠버네티스는 DNS 이름을 사용하거나 자체 IP 주소를 사용하여 컨테이너를 노출한다. 컨테이너에 대한 트래픽이 많으면 그것들을 로드밸런싱하여 배포가 안정적으로 이뤄지게 한다.           스토리지 오케스트레이션            로컬 저장소, 공용 클라우드 공급자 등과 같이 원하는 저장소 시스템을 자동으로 탐재 가능하다.           자동화된 롤아웃과 롤백            배포된 컨테이너의 원하는 상태를 서술하고 현재 상태를 원하는 상태로 설정한 속도에 따라 변경할 수 있다. → 배포용 새 컨테이너를 만들고 기존 것을 제거하고 옮길 수 있다.           자동화된 빈 패킹            각 컨테이너가 필요로 하는 CPU와 RAM을 쿠버네티스에게 지시한다. 쿠버네티스는 컨테이너를 노드에 맞추어서 리소스를 가장 잘 사용할 수 있도록 해준다.           자동화된 복구            실패한 컨테이너를 다시 시작하고 교체한다.           시크릿과 구성 관리            암호, OAuth 토큰 및 SSH 키와 같은 중요한 정보를 저장하고 관리할 수 있다. 컨테이너 이미지를 재구성하지 않고 스택 구성에 시크릿을 노출하지 않고도 시크릿 및 애플리케이션 구성을 배포 및 업데이트 할 수 있다.         K8s의 목적                   | 다중의 도커 서버를 하나의 Pool로 구성   K8s는 다중 서버의 도커 데몬에 연결하여 사용하는데 사용자는 사용하는 서버의 서버가 몇 개인지 도커 컨테이너가 몇 개 실행중인지 알 필요가 없다.   단지 마스터에게 사용자가 필요한 컨테이너를 어떤 목적에 맞는 이미지로 몇 개 만들지만 명령하면 된다.   | 다중 서버에 분산되어 컨테이너 생성   두 개의 워커 노드에 3개의 container를 생성하게 되면 쿠버네티스에서 알아서 컨테이너를 A서버와 B서버에게 할당한다. idle인 서버를 직접 찾지 않아도 된다.   | A서버 B서버 와의 컨테이너 통신   각 서버 컨테이너는 각각의 private ip가 있는데 이러한 컨테이너들간의 통신은 kube-proxy 등을 통해 가능하다.   | 컨테이너 재생성   서버에 문제가 생기거나 컨테이너가 exit 되는 경우 쿠버네티스는 이 상황을 방지하여 동일한 컨테이너를 생성하고 서비스를 지속적으로 제공한다.   | Load Balance   kubernetes 클러스터로 생성된 웹사이트에 3개의 컨테이너가 동작하는데 그 웹사이트의 public ip로 사용자가 접근할 때마다 컨테이너 순서대로 접근할 수 있도록 round-robin 형태의 로드밸런싱이 제공된다.   K8s 특징   쿠버네티스는 컨테이너 수준에서 운영되기 때문에 PaaS가 일반적으로 제공하는 배포, 스케일링, 로드 밸런싱과 같은 기능을 제공하며, 사용자가 로깅, 모니터링 및 알림 솔루션을 통합할 수 있다. 개발자가 플랫폼을 만드는 구성 요소를 제공하지만, 필요한 경우 사용자의 선택권과 유연성을 지켜준다.      쿠버네티스는 stateless, stateful, 데이터 처리를 위한 워크로드르 포함한 다양한 워크로드를 지원하는 것을 목표로 한다.   소스 코드를 배포하지 않으며 애플리케이션을 빌드하지 않는다. CI/CD 워크플로우는 조직 문화와 취향에 따르고 기술적인 요구사항으로 결정된다.   애플리케이션 레벨의 서비스를 제공하지 않는다. 애플리케이션 서비스에는 미들웨어, 데이터 처리 프레임워크, 데이터베이스, 캐시 또는 클러스터 스토리지 시스템 등이 있다.   로깅, 모니터링 또는 경보 솔루션을 포함하지 않는다.   쿠버네티스는 오케스트레이션의 필요성을 없애준다. 오케스트레이션이란 A를 먼저 한 다음 B를 하고 C를 하느 것과 같이 정의된 워크플로우를 수행하는 것이다.   쿠버네티스는 독립적이고 조합 가능한 제어 프로세스들로 구성되어 있다. 이 프로세스는 지속적으로 현재 상태를 입력받은 의도한 상태로 나아가도록 한다. 이로써 시스템이 보다 더 사용하기 쉬워지고 강력해지며 견고하고 회복력을 갖추게 되며 확장 가능해진다.   K8s 용어      master            마스터 노드이며 도커 데몬을 관리하는 역할           worker            도커가 설치되어 있으며 실제 컨테이너들이 생성되어 일하는 노드이다. master의 관리를 받는다.           pod            k8s의 기본 단위이다. 컨테이너 혹은 컨테이너의 묶음이다.           rc            replication controller로 pod를 자동으로 생성 복제해주는 컨트롤러이다. 복제 개수 설정을 3으로 하면 3개의 pod가 서비스상에 계속 active상태가 된다.           service            pod의 group을 식별하는 라벨이라는 기준에 따라 pod들을 하나의 서비스로 외부에서 접근할 수 있게함           yaml            k8s에서 service, rc, pod등 기능을 설명한 데이터 형식 코드이다.           K8s 주요 도구            kubeadm: init(join), 초기화(Bootstrap)       kubernetes 구성과 초기화 그리고 노드 확장할 때 외에는 사용하지 않지만 중요한 요소이다.            kubectl : cmd 작업 수행, k8s object 생성,관리      K8s pod       pod란 k8s의 기본적인 배포단위이며, 컨테이너를 포함한 단위이다. k8s의 특징 중 하나는 container를 개별적으로 하나씩 배포하는 것이 아니라 pod 단위로 배포한다.       pod - replicaset   web container 2개 복제해서 띄어놓겠다고 정의하여 pod를 생성하게 되면 2개의 호스트에 container가 생성되어 서비스를 한다.   랜처  대규모 클러스터 및 기업용 환경에도 적합한 쿠버네티스 관리 플랫폼이다. 오픈소스이다.   랜처의 가장 큰 장점으로는 쿠버네티스 클러스터뿐 아니라 운영에 필요한 모니터링, 보안 관련 기능을 쉽게 설치할 수 있다는 점이다. 랜처의 관리 도구를 사용해서 새로운 쿠버네티스 클러스터를 쉽게 생성하고 여러 클러스터를 한 곳에서 관리할 수 있다.  랜처는 대규모 시스템 관리까지 염두에 둔 플랫폼이므로 자체적인 구성 요소가 많이 포함되어 있으며 이로 인해 다른 도구에 비해 더 무거운 단점이 있다.                  랜처의 특징              용도 : 대규모 기업용 환경에도 활용 가능한 다목적 쿠버네티스 관리 플랫폼   장점 : 기능이 많고 추가 도구 설치 용이, 멀티 클라우드 관리 가능   단점 : 다른 도구에 비해 무겁다.  ","categories": ["DevOps"],
        "tags": [],
        "url": "/devops/kubernetes-1/",
        "teaser": null
      },{
        "title": "Kubernetes - 구성요소",
        "excerpt":"K8s 컴포넌트   쿠버네티스를 배포하면 클러스터를 얻는다. 쿠버네티스 클러스터는 컨테이너화된 애플리케이션을 실행하는 노드라고 하는 워커 머신의 집합이다. 쿠버네티스의 컴포넌트는 크게 쿠버네티스의 기능 제어를 담당하는 컨트롤 플레인과 컴포넌트와 컨트롤 플레인 컴포넌트의 요청을 받아 각 노드에서 동작을 담당하는 노드 컴포넌트로 나누어 볼 수 있다.      노드    쿠버네티스의 작업 장비   워커 노드는 애플리케이션의 구성요소인 파드를  호스트한다.      파드    클러스터에서 실행중인 컨테이너의 집합   컨트롤 플레인은 워커 노드와 클러스터 내 파드를 관리한다.      컨트롤 플레인    컨테이너의 라이프사이클을 정의, 배포, 관리하기 위한 API와 인터페이스들을 노출하는 컨테이너 오케스트레이션 레이어이다.      쿠버네티스 클러스터 구성 요소   쿠버네티스 클러스터란?   컨테이너 형태의 어플리케이션을 호스팅하는 물리/가상 환경의 노드들로 이루어진 집합이다.   쿠버네티스는 호스트 환경에 구성도니 자원들을 클러스터 단위로 추상화해서 관리한다.   하나의 클러스터 안에는 클러스터 내부 요소들을 제어하는 컨트롤 플레인 역할을 수행할 마스터 노드를 두고 관리자는 이 마스터 노드를 통해 클러스터 전체를 제어하는 구성을 따른다.   쿠버네티스 클러스터는 용도에 따라 크게 워커 노드와 마스터 노드로 구분된다.      워커 노드 : 각기 다른 목적과 기능으로 세분화된 컨테이너들이 실제 배치되는 노드이다.   마스터 노드 : 컨테이너 선단을 지휘하는 통제역할을 한다. 대규모 컨테이너를 운영하려면 각 워커 노드들의 가용 리소스 현황을 고려하여 최적의 컨테이너 배치와 모니터링, 그리고 각 컨테이너에 대한 효율적인 추적 관리가 필요하다. 이러한 역할을 수행한다.   쿠버네티스 클러스터의 내부 구조   쿠버네티스에서 클러스터들의 모든 구성 요소는 오직 API 서버를 통해서만 접근이 가능하다.  Kubernetes Master는 마스터 노드에 포함된 컨트롤 플레인에 해당한다.   컨트롤플레인은 클러스터 전체의 workload resource 등 주요 구성 요소들을 배포하고 제어하는 역할을 한다.   컨트롤 플레인 컴포넌트   클러스터에 관한 전반적인 결정을 수행하고 클러스터 이벤트를 감지하고 반응한다.   클러스터 내 어떠한 머신에서든 동작할 수 있다. 그러나 간결성을 위해 구성 스크립트는 보통 동일 머신 상에 모든 컨트롤 플레인 컴포넌트를 구동시키고 사용자 컨테이너는 해당 머신 상에 동작시키지 않는다.      kube-apiserver    API 서버는 쿠버네티스 API를 노출하는 쿠버네티스 컨트롤 플레인 컴포넌트이다. API 서버는 쿠버네티스 컨트롤 플레인의 프론트 엔드이다. kube-apiserver는 수평을 확장되도록 디자인되어서 더 많은 인스턴스를 배포해서 확장할 수 있다. 여러 인스턴스를 실행하고 그것들 간의 트래픽을 균형있게 조절할 수 있다.      etcd    모든 클러스터 데이터를 담는 쿠버네티스 뒷단의 저장소로 사용되는 일관성,고가용성 키-값 저장소이다.   쿠버네티스 클러스터에서 etcd를 뒷단의 저장소로 사용한다면 이 데이터는 반드시 백업해야한다.      kube-scheduler    클러스터는 여러 노드로 구성되어 있고 기본적인 작업의 단위인 파드는 여러 노드 중 특정 노드에 배치되어 동작하게 된다. 이 때 새로 새성된 파드를 감지하여 어떤 노드로 배치할지 결정하는 작업을 스케줄링이라고 한다. 이 스케줄링을 담당하는 컴포넌트가 kube-scheduler이다.      kube-controller-manager    컨트롤러 프로세스를 실행하는 컨트롤 플레인 컴포넌트이다. 각 컨트롤러는 분리된 프로세스이지만 복잡성을 낮추기 위해 모두 단일 바이너리로 컴파일되고 단일 프로세스 내에서 실행된다.      Cloud-Controller-Manager    클라우드별 컨트롤 로직을 포함하는 쿠버네티스 컨트롤 플레인 컴포넌트이다. 클라우드 컨트롤러 매니저를 통해 클러스터를 클라우드 공급자의 API에 연결하고, 해당 클라우드 플랫폼과 상호 작용하는 컴포넌트와 클러스터와만 상호 작용하는 컴포넌트를 구분할 수 있게 해준다.   클라우드 제공자 전용 컨트롤러만 실행한다.   kube-controller-manager와 마찬가지로 논리적으로 독립적인 여러 컨트롤 루프를 단일 프로세스로 실행하는 단일 바이너리로 결합한다. 수평으로 확장해서 성능을 향상시키거나 장애를 견딜 수 있다.      노드 컨트롤러 : 노드가 응답을 멈춘 후 클라우드 상에서 삭제되었는지 판별하기 위해 클라우드 제공 사업자에게 확인하는 것   라우트 컨트롤러 : 기본 클라우드 인프라에 경로를 구성하는 것   서비스 컨트롤러 : 클라우드 제공 사업자 로드밸런서를 생성, 업데이트 그리고 삭제하는 것   노드 컴포넌트   동작중인 파드를 유지시키고 쿠버네티스 런타임 환경을 제공하며, 모든 노드 상에서 동작한다.      Kubelet    클러스터의 각 노드에서 실행되는 에이전트로 파드에서 컨테이너가 확실하게 동작하도록 관리한다.   쿠버네티스를 토앻 생성되지 않는 컨테이너는 관리하지 않는다.      Kube-proxy    클러스터의 각 노드에서 실행되는 네트워크 프록시로, 쿠버네티스의 서비스 개념의 구현부이다.   노드의 규칙을 관리한다.   운영 체제에 가용한 패킷 필터층 계층이 있는 경우엔 이것을 사용하고 아니면 트래픽 자체를 forward한다.      컨테이너 런타임    컨테이너 런타임은 컨테이너 실행을 담당하는 소프트웨어이다.   에드온   쿠버네티스 리소스(데몬셋, 디플로이먼트 등)를 이용하여 클러스터 기능을 구현한다. 이들은 클러스터 단위의 기능을 제공하기 때문에 에드온에 대한 네임스페이스 리소스는 kube-system 네임스페이스에 속한다.   DNS   절대적으로 요구하지는 않지만 많은 예시에서 필요로 하기 때문에 쿠버네티스 클러스터는 클러스터 DNS를 갖추어야만 한다.   클러스터 DNS는 구성환경 내 다른 DNS 서버와 더불어, 쿠버네티스 서비스를 위해 DNS 레코드를 제공해주는 DNS 서버이다.   웹 UI (대시보드)   대시보드는 쿠버네티스의 클러스터에서 동작하는 애플리케이션에 대한 관리와 문제 해결을 할 수 있도록 해준다.   컨테이너 리소스 모니터링   컨테이너 리소스 모니터링은 중앙 데이터베이스 내의 컨테이너들에 대한 포괄적인 시계열 매트릭스를 기록하고 그 데이터를 열람하기 위한 UI를 제공해 준다.   클러스터-레벨 로깅   검색/열람 인터페이스와 함께 중앙 로그 저장소에 컨테이너 로그를 저장하는 책임을 진다.   쿠버네티스 API   쿠버네티스 컨트롤 플레인의 핵심은 API 서버이다. API 서버는 최종 사용자, 클러스터의 다른 부분 그리고 외부 컴포넌트가 서로 통신할 수 있도록 HTTP API를 제공한다.      컨트롤 플레인    컨테이너의 라이프사이클을 정의, 배포, 관리하기 위한 API와 인터페이스들을 노출하는 컨테이너 오케스트레이션 레이어이다.   쿠버네티스 API를 사용하면 쿠버네티스의 API 오브젝트, 네임스페이스 컨피그맵 그리고 이벤트를 질의하고 조작할 수 있다.   파드   파드는 쿠버네티스의 가장 기본적인 배포 단위이다.   마스터 노드에서 워크노드로 pod를 전달하고, 워커노드에서는 pod를 수행하는 구조이다. 그렇기 때문에 한 개의 워커노드에는 N개의 pod가 들어가게 된다.   쿠버네티스는 컨테이너를 개별적으로 배포하는 것이 아니라 Pod 안에 컨테이너를 탑재하여 배포한다.   Pod 안에는 1개 이상의 컨테이너가 탑재될 수 있다. (1pod = N containers)   여러 컨테이너를 pod 단위로 묶어서 배포하는 이유는 다음과 같다.      Pod 내부 컨테이너 간의 IP 및 포트 공유를 통한 통신 용이성 향상            두 컨테이너 A,B가 한 개의 pod에 탑재될 경우 두 컨테이너 끼리는 실시간으로 데이터를 교환하며 그에 따라 상태를 업데이트해야한다. 이 때 두 컨테이너는 별도의 IP 호출없이 localhost를 통해 통신이 가능하다.           pod 내부 컨테이너 간의 디스크 볼륨 공유            pod 내에 함꼐 배포된 컨테이너끼리는 디스크 볼륨을 공유할 수 있기 때문에 서로의 파일을 읽어올 수 있다.       또한 로그 수집기를 사이드카 패턴을 통해 pod에 탑재하여 배포할 경우 pod 내부 컨테이너들의 로그를 모두 수집할 수 있다.           만들어진 pod를 배포하면 단일 인스턴스가 만들어진다. 수평적으로 어플리케이션을 확장하기 위해서는 단일 인스턴스를 만드는 pod를 복제하는 레플리케이션을 수행해야 한다.   Pod 생성   pod는 주로 yaml, JSON 등의 template를 통해 생성한다.  apiVersion: v1 # api의 버전  kind: Pod # 생성할 쿠버네티스 리소스 타입 metadata: \tname: myapp-pod \tlabels: # 특정 쿠버네티스 리소스를 검색할 때 사용하는 Key-Value 형태의 데이터이다. \t\tapp: myapp # myapp이라는 app label을 통해 myapp-pod를 검색할 수 있다. spec: # pod의 구체적인 사양을 정의하는 부분 \tcontainers: \t- name: myapp-container \t\timage: busybox # docker registry를 구체적으로 명시하여 가져올 수 있다. \t\tcommand: ['sh','-c','echo Hello Kubernetes! &amp;&amp; sleep 3600']  Deployment란?   ReplicaSet을 이용하여 pod를 업데이트하고 이력을 관리하여 롤백하거나 특정 버전으로 돌아갈 수 있다.   Deployment는 새로운 이미지로 업데이트하기 위해 ReplicaSet을 이용한다.   apiVersion: apps/v1 kind: Deployment # deployment metadata:   name: echo-deploy spec:   replicas: 4   selector:     matchLabels:       app: echo       tier: app   template:     metadata:       labels:         app: echo         tier: app     spec:       containers:         - name: echo           image: ghcr.io/subicura/echo:v1   버전을 업데이트하면 새로운 ReplicaSet을 생성하고 해당 ReplicaSet이 새로운 버전의 pod를 생성한다.   과정을 그림으로 다음과 같이 나타낼 수 있다.      버전 관리   Deployment는 변경된 상태를 기록한다.   # 히스토리 확인 kubectl rollout history deploy/echo-deploy  # revision 1 히스토리 상세 확인 kubectl rollout history deploy/echo-deploy --revision=1  # 바로 전으로 롤백 kubectl rollout undo deploy/echo-deploy  # 특정 버전으로 롤백 kubectl rollout undo deploy/echo-deploy --to-revision=2   배포 전략 설정   RollingUpdate방식을 사용하여 동시에 업데이트하는 Pod의 개수를 변경하는 코드는 다음과 같다.  apiVersion: apps/v1 kind: Deployment metadata:   name: echo-deploy-st spec:   replicas: 4   selector:     matchLabels:       app: echo       tier: app   minReadySeconds: 5   strategy:     type: RollingUpdate     rollingUpdate:       maxSurge: 3       maxUnavailable: 3   template:     metadata:       labels:         app: echo         tier: app     spec:       containers:         - name: echo           image: ghcr.io/subicura/echo:v1           livenessProbe:             httpGet:               path: /               port: 3000  namespace란?   쿠버네티스의 구조는 다음과 같이 워커 노드 위에 각 pod들이 배포되는 형식이다.   쿠버네티스 오브젝트에는 pod 뿐 아니라 label, deployment, statefulset, secret 등 다양한 리소스가 있는데 용도와 목적이 다른 수많은 오브젝트들이 배포가 되면 비슷한 이름의 수많은 object들이 생기게 될 것이고 이로인해 사용과 관리 측면에서 어려움을 느낄 수 있다.   이를 방지하기 위해 namespace라는 것을 제공한다.   namespace란 쿠버네티스 클러스터 내의 논리적인 분리 단위이다.  namespace는 쿠버네티스 오브젝트를 묶는 하나의 가상공간 또는 그룹이다.   다만 isolation은 되지 않는다.   namespace 사용  apiVersion: v1 kind: Namespace metadata: \tname: test spec: \tlimits: # 리소스의 기본값과 상한값 등을 지정할 수 있다. \t- default: \t\t\tcpu: 1 \t\tdefaultRequest: \t\t\tcpu: 0.5 \t\ttype: Container  또한 namespace는 다음과 같은 명령어를 통해 생성이 가능하다.  kubectl apply -f test-namespace.yaml # 혹은 kubectl create namespace test   namespace의 목적           네임스페이스 별 리소스 할당량 지정     네임스페이스 별 CPU/GPU 할당량을 조절할 수 있다. 그렇게 하여 자원을 최대한 효율적으로 사용할 수 있다.            사용자 별 네임스페이스 접근 권한  사용자 인증 후, 해당 사용자가 api 또는 namespace에 권한이 있는지 체크 후 검증된 사용자만 api를 사용하게 할 수 있다.       ","categories": ["DevOps"],
        "tags": [],
        "url": "/devops/kubernetes-components/",
        "teaser": null
      },{
        "title": "Kubernetes - GPU",
        "excerpt":"Kubernetes - GPU      CPU란?   CPU는 컴퓨터 및 운영 체제에 필요한 명령과 처리를 실행한다. 또한 웹 서핑에서 스프레드시트 제작에 이르는 프로그램의 실행 속도를 결정하는 데에 중요하게 작용한다.   CPU는 다양한 워크로드, 특히 대기 시간이나 코어당 성능이 중요한 워크로드에 적합하다. 코어 수가 적으며 개별적인 작업과 신속한 작업 처리에 이러한 코어를 집중한다. CPU가 일을 할 때 한 개씩, 순차적으로 처리하는데 이것을 직렬 처리방식이라고 한다. 이 때문에 연속적인 컴퓨팅이나 db 실행과 같은 작업에 적합하다.                  핵심 기능 3단계              데이터 가져오기(Fetch)            데이터는 이진수로 표시되며 RAM에서 CPU로 전달된다.       각 실행 작업은 모든 작업의 일부분이므로 CPU는 다음 작업이 뭔지 알아야하는데 이것을 PC에 보관한다.           디코딩            명령을 가져와서 IR에 저장하면 CPU는 명령 해독기라는 회로로 명령을 전달한다.       명령어는 CPU의 다른 부분으로 전달하여 작동을 위해 전달되는 신호로 변환된다.           실행            디코딩된 명령문은 완료될 CPU의 관련 부분으로 전송된다.       결과는 대개 CPU 레지스터에 기록되며 이후 명령문에 의해 참조 될 수 있다.           GPU란?   GPU는 그래픽 처리나 3D 모델링을 위한 프로세서이다.   예전에는 3D 그래픽을 주로 CPU로 구현했으나 더 빠르고 실시간 그래픽 처리가 필요해짐에 따라 GPU가 나오게 되었다.   CPU의 연산을 담당하는 연산장치(ALU)는 구조가 매우 복잡하고 각종 제어 처리를 담당한다.   그에 비해 GPU는 연산장치(ALU)의 구조가 단순하고 작은 제어/캐시 영역을 가진다. 또한 다수의 코어로 이루어져 있다.   이런 구조적인 특징으로 인해 여러 개의 코어를 동시에 병렬로 작동시켜 단순 계산을 빠르게 할 수 있다.   K8s에서의 GPU   디바이스 플러그인   쿠버네티스는 디바이스 플러그인을 구현하여 파드가 GPU와 같이 특별한 하드웨어 기능에 접근할 수 있게 한다.   AMD 혹은 NVDIA 디바이스 플러그인을 사용하여 쿠버네티스는 GPU를 스케쥴 가능한 리소스로써 노출시킨다.  ","categories": ["DevOps"],
        "tags": [],
        "url": "/devops/kubernetes-gpu/",
        "teaser": null
      },{
        "title": "Linux",
        "excerpt":"리눅스 기본 명령어 정리   ls  디렉토리 내 파일 목록 나열  ls  -&gt; 현재 디렉토리 파일 목록 ls /etc/sysconfig    -&gt; /etc/sysconfig 아래 디렉토리 조회 ls -a   -&gt; 숨김 파일 포함 목록 조회 ls -l   -&gt; 자세히 보기 ls *.exe    -&gt; 확장자가 exe인 목록 보여줌 ls -l /etc/sysconfig/a* -&gt; /etc/sysconfig/ 디렉토리 안에 a로 시작하는 목록 자세히 조회   cd  디렉토리 이동  cd  -&gt; 사용자의 홈 디렉토리로 이동 cd~centos   -&gt; centos 사용자의 홈 디렉토리로 이동 cd ..   -&gt; 하위 디렉토리로 이동 cd /etc/sysconfig   -&gt; 절대 경로 이동 cd ../etc/sysconfig -&gt; 상대 경로 이동 (현재 디렉토리의 상위로 이동한 뒤에 다시 /etc/sysconfig 로 이동)   pwd  print working directory, 현재 디렉토리의 전체경로를 print  pwd -&gt; 현재 작업중인 디렉토리 경로 출력   rm  파일, 디렉토리 삭제  rm test.txt -&gt; test.txt 파일 삭제 (내부적으로 rm -i와 연결되어 동작) rm -i test.txt  -&gt; 삭제 확인 후 삭제 rm -f test.txt  -&gt; 강제로 바로 삭제 rm -r abc   -&gt; 디렉토리 삭제 rm -rf abc  -&gt; 디렉토리 하위에 있는 것 전부 삭제   cp  파일, 디렉토리 복사  cp a.txt b.txt  -&gt; a.txt를 b.txt라는 이름으로 바꿔서 복사 cp -r b a   -&gt; b라는 디렉토리를 a라는 디렉토리에 복사   touch  파일크기가 0인 파일 생성, 이미 존재한다면 마지막 수정시간 변경  touch test.txt   mv  파일이나 디렉토리 이름을 변경하거나 다른 디렉토리로 옮길 때 사용  mv test.txt/etc/sysconfig   -&gt; test.txt를 /etc/sysconfig로 이동 mv a b c x  -&gt; a와 b,c 파일 /x 디렉토리로 이동 mv test.txt practice.txt    -&gt; test.txt를 practice.txt로 변경하여 이동   mkdir  디렉토리 생성  mkdir abc   -&gt; abc라는 디렉토리 생성 mkdir -p /parent/child  -&gt; 부모 디렉토리 아래 자식 디렉토리 생성, 부모 디렉토리가 없다면 둘 다 함께 생성   rmdir  비어있는 디렉토리 삭제  rmdir abc   cat  파일 내용 출력 여러개를 붙여서 나열 가능  cat a.txt b.txt   head  파일의 앞 10행 화면 출력, 출력 행 수 지정 가능  head anaconda-ks.cfg head -5 anaconda-ks.cfg   tail  파일의 뒤 10행 화면 출력, 출력 행 수 지정 가능  tail anaconda-ks.cfg tail -5 anaconda-ks.cfg   more  텍스트 형식의 파일을 페이지 단위로 출력한다.  space를 누르면 다음 페이지  b를 누르면 앞페이지로 이동  q를 누르면 종료  more anaconda-ks.cfg more +100 anaconda-ks.cfg   -&gt; 100행부터 출력   less  more에 pgUp pgDn 기능 추가  anaconda-ks.cfg less +100 anaconda-ks.cfg   -&gt; 100gㅐㅇ부터 출력   file  해당파일이 어떤 파일인지 표시한다.  file test.txt file /user/bin/gzip   clear  터미널 화면 지우기  clear   ","categories": ["Language"],
        "tags": [],
        "url": "/language/linux/",
        "teaser": null
      },{
        "title": "Kubernetes - 기본명령어",
        "excerpt":"Kubectl 명령어                  명령어       설명                       apply       원하는 상태를 적용한다. 보통 -f 옵션으로 파일과 함께 사용한다.                 get       리소스 목록을 보여준다.                 describe       리소스의 상태를 자세하게 보여준다.                 delete       리소스를 제거한다.                 logs       컨테이너의 로그를 본다.                 exec       컨테이너에 명령어를 전달한다. 컨테이너에 주로 접근할 때 사용한다.                 config       kubectl 설정을 관리한다.           리소스 목록보기 (get)   출력 형태를 변경할 수 있는 -o 와 레이블을 확인할 수 있는 —show-lables가 있다.   # pod 조회 kubectl get pod  # 여러 개 조회 가능 kubectl get pods kubectl get po  # 여러 type 선택 가능 kubectl get pod,service # 줄임말 가능 kubectl get po,svc  # pod, replicaset, deployment, service, job 조회 =&gt; all kubectl get all  # 결과 포맷 변경 kubectl get pod -o wide kubectl get pod -o yaml kubectl get pod -o json  # label 조회 kubectl get pod --show-labels   리소스 상태 보기 (describe)   describe 명령어를 통해 해당 리소스의 상세한 정보를 볼 수 있다. 쿠버네티스를 운영하면서 가장 많이 확인하는 부분은 events 이다. 현재 pod의 상태를 이벤트 별로 확인할 수 있다.   # pod 조회로 이름 검색 kubectl get pod  # 조회한 이름으로 상세 확인 kubectl describe pod/[name]    컨테이너 로그 조회 (logs)   # 특정 pod 로그 조회 kubectl logs [pod_name]  # 실시간 로그 보기 kubectl logs -f [pod_name]   컨테이너 명령 전달 (exec)   shell로 접속하여 컨테이너 상태를 확인하는 경우에 -it 옵션을 사용하고 여러 개의 컨테이너가 있는 경우에는 -c 옵션으로 컨테이너를 지정한다.   kubectl exec -it [pod_name] -- [command]   설정 관리 (config)   kubectl은 여러 개의 쿠버네티스 클러스터를 context로 설정하고 필요에 따라 선택할 수 있다.  # 현재 컨텍스트 확인 kubectl config current-context  # 컨텍스트 설정 kubectl config use-context minikube  ","categories": ["DevOps"],
        "tags": [],
        "url": "/devops/kubernetes/",
        "teaser": null
      }]
