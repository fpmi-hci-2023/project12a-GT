. .\functions.ps1

$appPath = ".\Web"
$webApiPath = ".\API\API"

$appPackageFullPath = $appPath + '\package.json'
$webApiAppsettingsFullPath = $webApiPath + '\appsettings.json'

$Env:TAG= "dev." + (Get-Date -format "yyyyMMdd.HHmmss")

Update-Version $appPackageFullPath $Env:TAG
Update-Version $webApiAppsettingsFullPath $Env:TAG

cd .\Web
npm ci --legacy-peer-deps
ng build -c production --output-path=dist
cd ..

docker-compose -f .\docker-compose-development-localbuild.yml build # --no-cache

docker tag retur/gt/web:latest retur/gt/web:$Env:TAG
docker tag retur/gt/api:latest retur/gt/api:$Env:TAG

git commit -a -m "VERSION: $Env:TAG"
git tag -a $Env:TAG -m "VERSION: $Env:TAG"
# push (same env)
docker push retur/gt/web:$Env:TAG
docker push retur/gt/api:$Env:TAG

