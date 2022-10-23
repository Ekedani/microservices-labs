:: I'm too tired of building images manually so I've created this .bat
:: Minikube must be started

minikube -p minikube docker-env | Invoke-Expression
set rootDir=%cd%

cd %rootDir%\services\users\
docker build -t users:0.1 .

cd %rootDir%\services\posts\
docker build -t posts:0.1 .

cd %rootDir%\services\comments\
docker build -t comments:0.1 .

cd %rootDir%\services\users\migrations\
docker build -t users-service-migrations:0.1 .

cd %rootDir%\client\
docker build -t cleint:0.1 .

:: Add your migrations here after you create them 