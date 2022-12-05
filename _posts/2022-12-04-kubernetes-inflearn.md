---
title: Kubernetes-inflearn
categories: DevOps
toc: true
toc_sticky: true
toc_label: Kubernetes-inflearn
---

# Kubernetes 강의 정리

# Pod

쿠버네티스에서 관리하는 가장 작은 배포 단위이다.

도커는 컨테이너를 만들고 쿠버네티스는 Pod를 만든다.

Pod는 한 개 또는 여러 개의 컨테이너를 포함한다.

## Pod 생성 분석

<img width="587" alt="image" src="https://user-images.githubusercontent.com/63439911/205489541-d06f8bd1-b08f-4d72-ad67-e43840e26512.png">

Pod는 다음과 같이 클러스터 안에 Pod가 있고 그 안에 컨테이너가 있는 형식이다.

Pod이 생성되는 과정은 다음과 같다.

<img width="698" alt="image" src="https://user-images.githubusercontent.com/63439911/205489602-97a5acbd-6156-4d10-8ee4-b1114edea260.png">

1. `Scheduler`는 API 서버를 감시하면서 할당되지 않은 `Pod` 유무를 체크한다.
2. `Scheduler`는 할당되지 않은 `Pod`를 감지하고 적절한 노드에 할당한다.
3. 노드에 설치된 `kubelet`은 자신의 노드에 할당된 `Pod`가 있는지 체크한다.
4. `kubelet`은 `Scheduler`에 의해 자신에게 할당된 Pod의 정보를 확인하고 컨테이너를 생성한다.
5. `kubelet`은 자신에게 할당된 `Pod`의 상태를 `API` 서버에 전달한다.

## YAML 파일

| 정의 | 설명 | 예 |
| --- | --- | --- |
| version | 오브젝트 버전 | v1, app/v1, networking.k8s.io/v1 |
| kind | 종류 | Pod, ReplicaSet, Deployment, Service |
| metadata | 메타데이터 | name과 label, annotaion(주석)으로 구성 |
| spec | 상세명세 | 리소스 종류마다 다름 |

# ReplicaSet

Pod를 단독으로 만들면 그 Pod이 죽었을 때 자동으로 복귀되지 않는다. 이러한 Pod를 정해진 수만큼 복제하고 관리하는 것이 ReplicaSet이다.

<img width="683" alt="image" src="https://user-images.githubusercontent.com/63439911/205489621-5d381eaa-9e0f-497c-b67d-b4d325c5b8aa.png">

ReplicaSet은 label을 체크해서 원하는 수의 Pod이 없으면 새로운 Pod을 생성한다.

| 정의 | 설명 |
| --- | --- |
| spec.selector | label 체크 조건 |
| spec.replicas | 원하는 Pod의 개수 |
| spec.template | 생성할 Pod의 명세 |

ReplicaSet은 다음과 같이 동작한다.

<img width="700" alt="image" src="https://user-images.githubusercontent.com/63439911/205489642-ed46d9a9-619b-432b-befe-62e48aeee3d6.png">

1. `ReplicaSet Controller`는 ReplicaSet조건을 감시하면서 현재 상태와 원하는 상태가 다른지 체크한다.
2. `ReplicaSet Controller`가 원하는 상태가 되도록 Pod를 생성하거나 제거한다.
3. `Scheduler`는 API 서버를 감시하면서 할당되지 않은 Pod이 있는지 체크한다.
4. `Scheduler`는 할당되지 않은 새로운 Pod을 감지하고 적절한 노드에 배치
5. 이후 노드는 기존대로 동작한다.

ReplicaSet은 ReplicaSet Controller가 관리하고 Pod의 할당은 Scheduler가 관리한다.

## 정리

ReplicaSet은 Pod의 개수를 유지하는 역할을 담당한다. label을 통해 Pod를 체크하기 때문에 겹치지 않게 신경써야하나다.

실전에서는 Deployment가 ReplicaSet을 이용하고 주로 Deployment를 사용한다.

# Deployment

쿠버네티스에서 가장 널리 사용되는 오브젝트이다. ReplicaSet을 이용하여 Pod을 업데이트하고 이력을 관리하여 롤백하거나 특정 버전으로 돌아갈 수 있다.

버전을 업데이트하면 새로운 ReplicaSet을 생성하고 해당 ReplicaSet이 새로운 버전의 Pod을 생성한다.

<img width="700" alt="image" src="https://user-images.githubusercontent.com/63439911/205489667-ffac8a2d-b38c-4c4f-9599-0a97c8aa1905.png">

1. `Deployment Controller`는 Deployment 조건을 감시하면서 현재 상태와 원하는 상태가 다른지 체크한다.
2. `Deployment Controller`가 원하는 상태가 되도록 `ReplicaSet` 설정한다.
3. `ReplicaSet Controller`는 ReplicaSet조건을 감시하면서 현재 상태와 원하는 상태가 다른지 체크한다.
4. `ReplicaSet Controller`가 원하는 상태가 되도록 `Pod`을 생성하거나 제거한다.
5. `Scheduler`는 API서버를 감시하면서 할당되지 않은 `Pod`이 있는지 체크한다.
6. `Scheduler`는 할당되지 않은 새로운 Pod을 감지하고 적절한 `노드`에 배치한다.

Deployment는 Deployment Controller가 관리하고 ReplicaSet과 Pod는 기존 Controller와 Scheduler가 관리한다.

# Service

Pod는 자체 IP를 가지고 다른 Pod과 통신할 수 있지만 쉽게 사라지기 때문에 직접 통신하는 대신 별도의 고정된 IP를 가진 서비스를 만들고 그 서비스를 통해 접근하는 방식을 사용한다.

<img width="697" alt="image" src="https://user-images.githubusercontent.com/63439911/205489681-fe7ab63b-d413-4def-b18b-a7b97c595be3.png">

같은 클러스터에서 생성된 Pod이라면 도메인 이름으로 Pod에 접근할 수 있다.

ClusterIP 서비스의 설정은 다음과 같다.

| 정의 | 설명 |
| --- | --- |
| spec.ports.port | 서비스가 생성할 Port |
| spec.ports.targetPort | 서비스가 접근할 Pod의 Port (기본: port랑 동일) |
| spec.selector | 서비스가 접근할 Pod의 label 조건 |

## Service 생성 흐름

<img width="701" alt="image" src="https://user-images.githubusercontent.com/63439911/205489699-e50354cd-7b65-4eaf-bd71-f75d5ea08c93.png">

1. `Endpoint Controller`는 `Service`와 `Pod`을 감시하면서 조건에 맞는 Pod의 IP를 수집한다.
2. `Endpoint Controller`가 수집한 IP를 가지고 `Endpoint` 생성한다.
3. `Kube-Proxy`는 `Endpoint` 변화를 감시하고 노드의 iptables을 설정한다.
4. `CoreDNS`는 `Service`를 감시하고 서비스 이릅과 IP를 `CoreDNS`에 추가한다.

여기서 `iptables`는 커널 레벨의 네트워크 도구이고 `CoreDNS`는 빠르고 편리하게 사용할 수 있는 클러스트 내부용 도메인 네임 서버이다. 각각의 역할은 iptables 설정으로 여러 IP에 트래픽을 전달하고 CoreDNS를 이용하여 IP 대신 도메인 이름을 사용한다.

`ClusterIP`는 클러스터 내부에서만 접근이 가능하고 `NodePort`는 외부에서도 접근이 가능하다.

그리고 이 `NodePort`는 3000~32767번까지의 포트를 사용한다.

<img width="703" alt="image" src="https://user-images.githubusercontent.com/63439911/205489713-5f2e207d-2265-4a02-a93d-08fbe11a8f21.png">

하지만 `NodePort`도 단점이 있는데 바로 노드가 사라졌을 때 자동으로 다른 노드를 통해 접근이 불가능하다는 점이다. 예를 들면, 3개의 노드가 있다면 이 3개중에 아무 노드로 접근해도 NodePort로 연결할 수 있지만 어떤 노드가 살아 있는지는 알 수 없다.

![image](https://user-images.githubusercontent.com/63439911/205489091-b69a8aac-5485-4d4f-b96c-70f4c23ff232.png)

자동으로 살아 있는 노드에 접근하기위해 모든 노드를 보고 있는 `Load Balancer` 가 필요하다. 브라우저는 NodePort에 직접 요청을 보내는 것이 아니라 Load Balancer에 요청하고 Load Balancer가 알아서 살아있는 Node에 접근하는식으로 NodePort의 단점을 없앨 수 있다.

# Ingress

하나의 클러스터에서 여러 서비스를 운영할 때 NodePort를 사용하면 서비스 개수만큼 포트를 열어야한다. 

예를 들면 아래와 같은 서비스를 구축할 수 있을 것이다.

<img width="698" alt="image" src="https://user-images.githubusercontent.com/63439911/205658886-cf1c0713-d225-4bef-bc84-5b9e921224fb.png">


`example.com` , `subicura.com/blog` , `subicura.com/help` 주소로 서로 다른 서비스에 접근하는 모습이다. 하나의 포트로 여러 개의 서비스를 연결할 때에는 Ingress를 사용한다.

## Ingress 생성 흐름
<img width="702" alt="image" src="https://user-images.githubusercontent.com/63439911/205659874-88d56429-1b56-43fa-821f-235f799d78d8.png">

1. `Ingress Controller`는 `Ingress` 변화를 체크
2. `Ingress Controller`는 변경된 내용을 `Nginx`에 설정하고 프로세스를 재시작한다.

Ingress가 하는일을 보면 단순히 YAML로 만든 Ingress 설정을 단순히 nginx 설정으로 바꾸기만 한다. 

Ingress를 사용하면 YAML 설정만으로 도메인, 경로 설정을 손쉽게 할 수 있다.

# Volume

쿠버네티스는 Volume을 이용하여 컨테이너의 디렉토리를 외부 저장소와 연결하고 다양한 플로그인을 지원하여 대부분의 스토리지를 별도 설정없이 사용할 수 있다.

- PV/PVC
    
    데이터 저장이 필요한 경우 흔히 Persistent Volume(PV), Persistent Volume Claim(PVC)를 사용한다.
    

Pod 안에 속한 컨테이너 간 디렉토리를 공유하는 방법은 보통 사이드카라는 패턴에서 사용한다.

<img width="527" alt="image" src="https://user-images.githubusercontent.com/63439911/205660006-41035c2d-3053-43ed-9ff2-e06ad128016b.png">

`app` 컨테이너는 `/var/log/example.log` 에 로그 파일을 만들고 `sidecar` 컨테이너는 해당 로그 파일을 처리하도록 한다.

```bash
apiVersion: v1
kind: Pod
metadata:
  name: sidecar
spec:
  containers:
    - name: app
      image: busybox
      args:
        - /bin/sh
        - -c
        - >
          while true;
          do
            echo "$(date)\n" >> /var/log/example.log;
            sleep 1;
          done
      volumeMounts:
        - name: varlog
          mountPath: /var/log
    - name: sidecar
      image: busybox
      args: [/bin/sh, -c, "tail -f /var/log/example.log"]
      volumeMounts:
        - name: varlog
          mountPath: /var/log
  volumes:
    - name: varlog
      emptyDir: {}
```

## hostpath

호스트 디렉토리를 컨테이너 디렉토리에 다음과 같은 그림의 형식으로 연결해볼 수 있다.

<img width="700" alt="image" src="https://user-images.githubusercontent.com/63439911/205660168-edbefdf3-5e76-437f-95ab-3030cd23c297.png">

호스트의 `/var/log` 를 컨테이너의 `/host/var/log` 디렉토리로 마운트한다.

```bash
apiVersion: v1
kind: Pod
metadata:
  name: host-log
spec:
  containers:
    - name: log
      image: busybox
      args: ["/bin/sh", "-c", "sleep infinity"]
      volumeMounts:
        - name: varlog
          mountPath: /host/var/log
  volumes:
    - name: varlog
      hostPath:
        path: /var/log
```

# ConfigMap

컨테이너에서 설정 파일을 관리하는 방법은 이미지를 빌드할 때 복사하거나, 컨테이너를 실행할 때 외부 파일을 연결하는 방법이 있다. 쿠버네티스는 이를 `ConfigMap`으로 관리한다.

# Secret

쿠버네티스는 `ConfigMap`과 유사하지만, 보안 정보를 관리하기 위해 `Secret`을 별도로 제공한다. ConfigMap과 차이점은 데이터가 `base64`로 저장된다는 점이다.
