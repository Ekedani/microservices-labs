minikube start
minikube addons enable ingress

kubectl apply -f k8s/users-postgres
kubectl apply -f k8s/feed-postgres
kubectl apply -f k8s/users
kubectl apply -f k8s/posts
kubectl apply -f k8s/comments
kubectl apply -f k8s/client

minikube tunnel