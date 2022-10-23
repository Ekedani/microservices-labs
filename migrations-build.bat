:: Run (minikube -p minikube docker-env | Invoke-Expression) before start
set rootDir=%cd%

cd %rootDir%\services\posts\migrations\
docker build -t posts-service-migrations:0.1 .

cd %rootDir%\services\comments\migrations\
docker build -t comments-service-migrations:0.1 .
