---
title: Kubernetes - 구성요소
categories: DevOps
toc: true
toc_sticky: true
toc_label: k8s 컴포넌트 정리
---

## K8s 컴포넌트

쿠버네티스를 배포하면 클러스터를 얻는다. 쿠버네티스 클러스터는 컨테이너화된 애플리케이션을 실행하는 노드라고 하는 워커 머신의 집합이다.
<span style="color: red">쿠버네티스의 컴포넌트는 크게 쿠버네티스의 기능 제어를 담당하는 컨트롤 플레인과 컴포넌트와 컨트롤 플레인 컴포넌트의 요청을 받아 각 노드에서 동작을 담당하는 노드 컴포넌트로 나누어 볼 수 있다.</span>

> 노드
    
    쿠버네티스의 작업 장비
    

워커 노드는 애플리케이션의 구성요소인 파드를  호스트한다.

> 파드
    
    클러스터에서 실행중인 컨테이너의 집합
    

컨트롤 플레인은 워커 노드와 클러스터 내 파드를 관리한다. 

> 컨트롤 플레인
    
    컨테이너의 라이프사이클을 정의, 배포, 관리하기 위한 API와 인터페이스들을 노출하는 컨테이너 오케스트레이션 레이어이다.
    

![쿠버네티스 구성요소](https://user-images.githubusercontent.com/63439911/196174687-0d812161-41ea-45fc-9e0a-273454abff03.png)

쿠버네티스 클러스터 구성 요소

## 쿠버네티스 클러스터란?

컨테이너 형태의 어플리케이션을 호스팅하는 물리/가상 환경의 노드들로 이루어진 집합이다.

쿠버네티스는 호스트 환경에 구성도니 자원들을 클러스터 단위로 추상화해서 관리한다. 

하나의 클러스터 안에는 클러스터 내부 요소들을 제어하는 `컨트롤 플레인 역할`을 수행할 `마스터 노드`를 두고 관리자는 이 마스터 노드를 통해 클러스터 전체를 제어하는 구성을 따른다.

쿠버네티스 클러스터는 용도에 따라 크게 `워커 노드`와 `마스터 노드`로 구분된다.

- 워커 노드 : 각기 다른 목적과 기능으로 세분화된 컨테이너들이 실제 배치되는 노드이다.
- 마스터 노드 : 컨테이너 선단을 지휘하는 통제역할을 한다. 대규모 컨테이너를 운영하려면 각 워커 노드들의 가용 리소스 현황을 고려하여 최적의 컨테이너 배치와 모니터링, 그리고 각 컨테이너에 대한 효율적인 추적 관리가 필요하다. 이러한 역할을 수행한다.

## 쿠버네티스 클러스터의 내부 구조

쿠버네티스에서 클러스터들의 모든 구성 요소는 오직 API 서버를 통해서만 접근이 가능하다.
![image](https://user-images.githubusercontent.com/63439911/197381920-d2d64192-4960-4f81-9619-efc682e790b8.png)
`Kubernetes Master`는 마스터 노드에 포함된 `컨트롤 플레인`에 해당한다.

컨트롤플레인은 클러스터 전체의 workload resource 등 주요 구성 요소들을 배포하고 제어하는 역할을 한다.

## 컨트롤 플레인 컴포넌트

클러스터에 관한 전반적인 결정을 수행하고 클러스터 이벤트를 감지하고 반응한다.

클러스터 내 어떠한 머신에서든 동작할 수 있다. 그러나 간결성을 위해 구성 스크립트는 보통 동일 머신 상에 모든 컨트롤 플레인 컴포넌트를 구동시키고 사용자 컨테이너는 해당 머신 상에 동작시키지 않는다. 

> kube-apiserver

API 서버는 쿠버네티스 API를 노출하는 쿠버네티스 컨트롤 플레인 컴포넌트이다. API 서버는 쿠버네티스 컨트롤 플레인의 프론트 엔드이다. kube-apiserver는 수평을 확장되도록 디자인되어서 더 많은 인스턴스를 배포해서 확장할 수 있다. 여러 인스턴스를 실행하고 그것들 간의 트래픽을 균형있게 조절할 수 있다.

> etcd

모든 클러스터 데이터를 담는 쿠버네티스 뒷단의 저장소로 사용되는 일관성,고가용성 키-값 저장소이다.

쿠버네티스 클러스터에서 etcd를 뒷단의 저장소로 사용한다면 이 데이터는 반드시 백업해야한다.

> kube-scheduler

클러스터는 여러 노드로 구성되어 있고 기본적인 작업의 단위인 파드는 여러 노드 중 특정 노드에 배치되어 동작하게 된다. 이 때 새로 새성된 파드를 감지하여 어떤 노드로 배치할지 결정하는 작업을 스케줄링이라고 한다. 이 스케줄링을 담당하는 컴포넌트가 kube-scheduler이다.

> kube-controller-manager

컨트롤러 프로세스를 실행하는 컨트롤 플레인 컴포넌트이다. 각 컨트롤러는 분리된 프로세스이지만 복잡성을 낮추기 위해 모두 단일 바이너리로 컴파일되고 단일 프로세스 내에서 실행된다. 

> Cloud-Controller-Manager

클라우드별 컨트롤 로직을 포함하는 쿠버네티스 컨트롤 플레인 컴포넌트이다. 클라우드 컨트롤러 매니저를 통해 클러스터를 클라우드 공급자의 API에 연결하고, 해당 클라우드 플랫폼과 상호 작용하는 컴포넌트와 클러스터와만 상호 작용하는 컴포넌트를 구분할 수 있게 해준다.

클라우드 제공자 전용 컨트롤러만 실행한다. 

kube-controller-manager와 마찬가지로 논리적으로 독립적인 여러 컨트롤 루프를 단일 프로세스로 실행하는 단일 바이너리로 결합한다. 수평으로 확장해서 성능을 향상시키거나 장애를 견딜 수 있다.

- 노드 컨트롤러 : 노드가 응답을 멈춘 후 클라우드 상에서 삭제되었는지 판별하기 위해 클라우드 제공 사업자에게 확인하는 것
- 라우트 컨트롤러 : 기본 클라우드 인프라에 경로를 구성하는 것
- 서비스 컨트롤러 : 클라우드 제공 사업자 로드밸런서를 생성, 업데이트 그리고 삭제하는 것

## 노드 컴포넌트

동작중인 파드를 유지시키고 쿠버네티스 런타임 환경을 제공하며, 모든 노드 상에서 동작한다.

> Kubelet

클러스터의 각 노드에서 실행되는 에이전트로 파드에서 컨테이너가 확실하게 동작하도록 관리한다.

쿠버네티스를 토앻 생성되지 않는 컨테이너는 관리하지 않는다.

> Kube-proxy

클러스터의 각 노드에서 실행되는 네트워크 프록시로, 쿠버네티스의 서비스 개념의 구현부이다.

노드의 규칙을 관리한다. 

운영 체제에 가용한 패킷 필터층 계층이 있는 경우엔 이것을 사용하고 아니면 트래픽 자체를 forward한다.

> 컨테이너 런타임

컨테이너 런타임은 컨테이너 실행을 담당하는 소프트웨어이다.

## 에드온

쿠버네티스 리소스(데몬셋, 디플로이먼트 등)를 이용하여 클러스터 기능을 구현한다. 이들은 클러스터 단위의 기능을 제공하기 때문에 에드온에 대한 네임스페이스 리소스는 kube-system 네임스페이스에 속한다.

## DNS

절대적으로 요구하지는 않지만 많은 예시에서 필요로 하기 때문에 쿠버네티스 클러스터는 클러스터 DNS를 갖추어야만 한다.

클러스터 DNS는 구성환경 내 다른 DNS 서버와 더불어, 쿠버네티스 서비스를 위해 DNS 레코드를 제공해주는 DNS 서버이다.

## 웹 UI (대시보드)

대시보드는 쿠버네티스의 클러스터에서 동작하는 애플리케이션에 대한 관리와 문제 해결을 할 수 있도록 해준다.

## 컨테이너 리소스 모니터링

컨테이너 리소스 모니터링은 중앙 데이터베이스 내의 컨테이너들에 대한 포괄적인 시계열 매트릭스를 기록하고 그 데이터를 열람하기 위한 UI를 제공해 준다.

## 클러스터-레벨 로깅

검색/열람 인터페이스와 함께 중앙 로그 저장소에 컨테이너 로그를 저장하는 책임을 진다.

## 쿠버네티스 API

쿠버네티스 컨트롤 플레인의 핵심은 API 서버이다. API 서버는 최종 사용자, 클러스터의 다른 부분 그리고 외부 컴포넌트가 서로 통신할 수 있도록 HTTP API를 제공한다.

> 컨트롤 플레인
    
    컨테이너의 라이프사이클을 정의, 배포, 관리하기 위한 API와 인터페이스들을 노출하는 컨테이너 오케스트레이션 레이어이다.
    

쿠버네티스 API를 사용하면 쿠버네티스의 API 오브젝트, 네임스페이스 컨피그맵 그리고 이벤트를 질의하고 조작할 수 있다.

## 파드
<img width="381" alt="image" src="https://user-images.githubusercontent.com/63439911/197164930-5157b0ed-34b8-4895-96fc-68091fdc2ce5.png">
파드는 쿠버네티스의 가장 기본적인 배포 단위이다.

마스터 노드에서 워크노드로 pod를 전달하고, 워커노드에서는 pod를 수행하는 구조이다. 그렇기 때문에 한 개의 워커노드에는 N개의 pod가 들어가게 된다.

쿠버네티스는 컨테이너를 개별적으로 배포하는 것이 아니라 Pod 안에 컨테이너를 탑재하여 배포한다.

Pod 안에는 1개 이상의 컨테이너가 탑재될 수 있다. (<span style="color: blue">1pod = N containers</span>)

여러 컨테이너를 pod 단위로 묶어서 배포하는 이유는 다음과 같다.

1. Pod 내부 컨테이너 간의 IP 및 포트 공유를 통한 통신 용이성 향상
    - 두 컨테이너 A,B가 한 개의 pod에 탑재될 경우 두 컨테이너 끼리는 실시간으로 데이터를 교환하며 그에 따라 상태를 업데이트해야한다. 이 때 두 컨테이너는 별도의 IP 호출없이 localhost를 통해 통신이 가능하다.
2. pod 내부 컨테이너 간의 디스크 볼륨 공유
    - pod 내에 함꼐 배포된 컨테이너끼리는 디스크 볼륨을 공유할 수 있기 때문에 서로의 파일을 읽어올 수 있다.
    - 또한 로그 수집기를 사이드카 패턴을 통해 pod에 탑재하여 배포할 경우 pod 내부 컨테이너들의 로그를 모두 수집할 수 있다.

만들어진 pod를 배포하면 단일 인스턴스가 만들어진다. 수평적으로 어플리케이션을 확장하기 위해서는 단일 인스턴스를 만드는 pod를 복제하는 레플리케이션을 수행해야 한다.

## Pod 생성

pod는 주로 yaml, JSON 등의 template를 통해 생성한다.
```
apiVersion: v1 # api의 버전 
kind: Pod # 생성할 쿠버네티스 리소스 타입
metadata:
	name: myapp-pod
	labels: # 특정 쿠버네티스 리소스를 검색할 때 사용하는 Key-Value 형태의 데이터이다.
		app: myapp # myapp이라는 app label을 통해 myapp-pod를 검색할 수 있다.
spec: # pod의 구체적인 사양을 정의하는 부분
	containers:
	- name: myapp-container
		image: busybox # docker registry를 구체적으로 명시하여 가져올 수 있다.
		command: ['sh','-c','echo Hello Kubernetes! && sleep 3600']
```
## Deployment란?

ReplicaSet을 이용하여 pod를 업데이트하고 이력을 관리하여 롤백하거나 특정 버전으로 돌아갈 수 있다.

Deployment는 새로운 이미지로 업데이트하기 위해 ReplicaSet을 이용한다. 

```bash
apiVersion: apps/v1
kind: Deployment # deployment
metadata:
  name: echo-deploy
spec:
  replicas: 4
  selector:
    matchLabels:
      app: echo
      tier: app
  template:
    metadata:
      labels:
        app: echo
        tier: app
    spec:
      containers:
        - name: echo
          image: ghcr.io/subicura/echo:v1
```

버전을 업데이트하면 새로운 ReplicaSet을 생성하고 해당 ReplicaSet이 새로운 버전의 pod를 생성한다.

과정을 그림으로 다음과 같이 나타낼 수 있다.
![image](https://user-images.githubusercontent.com/63439911/197397137-e71ff68e-1d00-4acb-984b-a7174e9c8b66.png)![image](https://user-images.githubusercontent.com/63439911/197397150-b6adb45e-2a57-4b5e-b625-46fa5878bc26.png)
![image](https://user-images.githubusercontent.com/63439911/197397160-ff433ce8-f14a-4368-b24e-3a02e5938146.png)
![image](https://user-images.githubusercontent.com/63439911/197397168-c63b8149-2865-4614-bae9-855b2bd538f9.png)
![image](https://user-images.githubusercontent.com/63439911/197397174-dfd5cd29-ff0e-4a4e-9359-c622ee05e9b4.png)
### 버전 관리

Deployment는 변경된 상태를 기록한다.

```bash
# 히스토리 확인
kubectl rollout history deploy/echo-deploy

# revision 1 히스토리 상세 확인
kubectl rollout history deploy/echo-deploy --revision=1

# 바로 전으로 롤백
kubectl rollout undo deploy/echo-deploy

# 특정 버전으로 롤백
kubectl rollout undo deploy/echo-deploy --to-revision=2
```

### 배포 전략 설정

RollingUpdate방식을 사용하여 동시에 업데이트하는 Pod의 개수를 변경하는 코드는 다음과 같다.
```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: echo-deploy-st
spec:
  replicas: 4
  selector:
    matchLabels:
      app: echo
      tier: app
  minReadySeconds: 5
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 3
      maxUnavailable: 3
  template:
    metadata:
      labels:
        app: echo
        tier: app
    spec:
      containers:
        - name: echo
          image: ghcr.io/subicura/echo:v1
          livenessProbe:
            httpGet:
              path: /
              port: 3000
```
## namespace란?
![image](https://user-images.githubusercontent.com/63439911/197184866-a8091438-13c3-4872-b16a-579e4fe463d8.png)
쿠버네티스의 구조는 다음과 같이 워커 노드 위에 각 pod들이 배포되는 형식이다.

쿠버네티스 오브젝트에는 pod 뿐 아니라 label, deployment, statefulset, secret 등 다양한 리소스가 있는데 용도와 목적이 다른 수많은 오브젝트들이 배포가 되면 비슷한 이름의 수많은 object들이 생기게 될 것이고 이로인해 사용과 관리 측면에서 어려움을 느낄 수 있다.

이를 방지하기 위해 namespace라는 것을 제공한다.

namespace란 쿠버네티스 클러스터 내의 논리적인 분리 단위이다.
![image](https://user-images.githubusercontent.com/63439911/197184960-45248431-3e03-4949-a20c-e6d4cecb00c5.png)
namespace는 쿠버네티스 오브젝트를 묶는 하나의 가상공간 또는 그룹이다.

다만 isolation은 되지 않는다.

### namespace 사용
```
apiVersion: v1
kind: Namespace
metadata:
	name: test
spec:
	limits: # 리소스의 기본값과 상한값 등을 지정할 수 있다.
	- default:
			cpu: 1
		defaultRequest:
			cpu: 0.5
		type: Container
```  
또한 namespace는 다음과 같은 명령어를 통해 생성이 가능하다.
```
kubectl apply -f test-namespace.yaml # 혹은
kubectl create namespace test
```

### namespace의 목적

- 네임스페이스 별 리소스 할당량 지정  
 ![image](https://user-images.githubusercontent.com/63439911/197187510-fd39b5f5-cc25-4a4e-a24e-f71147a0157c.png)
 네임스페이스 별 CPU/GPU 할당량을 조절할 수 있다. 그렇게 하여 자원을 최대한 효율적으로 사용할 수 있다.  

- 사용자 별 네임스페이스 접근 권한  
사용자 인증 후, 해당 사용자가 api 또는 namespace에 권한이 있는지 체크 후 검증된 사용자만 api를 사용하게 할 수 있다.  

