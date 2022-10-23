minikube start
minikube addons enable ingress

kubectl apply -f k8s/users-postgres
kubectl apply -f k8s/feed-postgres
kubectl apply -f k8s/users-service
kubectl apply -f k8s/posts-service
kubectl apply -f k8s/comments-service
kubectl apply -f k8s/client

minikube tunnel