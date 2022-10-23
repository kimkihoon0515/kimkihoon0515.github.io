---
title: Kubernetes - 기본명령어
categories: DevOps
toc: true
toc_sticky: true
toc_label: k8s 명령어 정리
---

## Kubectl 명령어

| 명령어 | 설명 |
| --- | --- |
| apply | 원하는 상태를 적용한다. 보통 -f 옵션으로 파일과 함께 사용한다. |
| get | 리소스 목록을 보여준다. |
| describe | 리소스의 상태를 자세하게 보여준다. |
| delete | 리소스를 제거한다. |
| logs | 컨테이너의 로그를 본다. |
| exec | 컨테이너에 명령어를 전달한다. 컨테이너에 주로 접근할 때 사용한다. |
| config | kubectl 설정을 관리한다. |

## 리소스 목록보기 (get)

출력 형태를 변경할 수 있는 `-o` 와 레이블을 확인할 수 있는 `—show-lables`가 있다.

```bash
# pod 조회
kubectl get pod

# 여러 개 조회 가능
kubectl get pods
kubectl get po

# 여러 type 선택 가능
kubectl get pod,service
# 줄임말 가능
kubectl get po,svc

# pod, replicaset, deployment, service, job 조회 => all
kubectl get all

# 결과 포맷 변경
kubectl get pod -o wide
kubectl get pod -o yaml
kubectl get pod -o json

# label 조회
kubectl get pod --show-labels
```

## 리소스 상태 보기 (describe)

describe 명령어를 통해 해당 리소스의 상세한 정보를 볼 수 있다. 쿠버네티스를 운영하면서 가장 많이 확인하는 부분은 `events` 이다. 현재 pod의 상태를 이벤트 별로 확인할 수 있다.

```bash
# pod 조회로 이름 검색
kubectl get pod

# 조회한 이름으로 상세 확인
kubectl describe pod/[name] 
```

## 컨테이너 로그 조회 (logs)

```bash
# 특정 pod 로그 조회
kubectl logs [pod_name]

# 실시간 로그 보기
kubectl logs -f [pod_name]
```

## 컨테이너 명령 전달 (exec)

shell로 접속하여 컨테이너 상태를 확인하는 경우에 `-it` 옵션을 사용하고 여러 개의 컨테이너가 있는 경우에는 `-c` 옵션으로 컨테이너를 지정한다. 

```bash
kubectl exec -it [pod_name] -- [command]
```

## 설정 관리 (config)

kubectl은 여러 개의 쿠버네티스 클러스터를 context로 설정하고 필요에 따라 선택할 수 있다.
```
# 현재 컨텍스트 확인
kubectl config current-context

# 컨텍스트 설정
kubectl config use-context minikube
```
