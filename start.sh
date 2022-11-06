minikube start
minikube addons enable ingress

kubectl apply -f k8s/databases/users-postgres
kubectl apply -f k8s/databases/posts-postgres
kubectl apply -f k8s/jobs

kubectl apply -f k8s/services/users
kubectl apply -f k8s/services/posts
kubectl apply -f k8s/services/comments

kubectl apply -f k8s/client

minikube tunnel