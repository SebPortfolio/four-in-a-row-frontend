# UTF-8 Encoding verwenden
$OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "===== START: Api-Build Script ====="

# Api Ordner löschen
if (Test-Path .\openapi) {
    Write-Host "Lösche alte OpenAPI-API..."
    Remove-Item .\openapi -Recurse -Force
}

# NPM Befehl ausführen
Write-Host "Generiere neue OpenAPI-API..."

npx openapi-generator-cli generate `
    -i .\four-in-a-row-api.yaml `
    -g typescript-angular `
    -o .\openapi `
    --additional-properties="serviceSuffix=Api,serviceFileSuffix=.api,modelSuffix=Wdto,withCredentials=true"

    
Write-Host "===== ENDE: Api-Build Script ====="