$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$nodeDir = Join-Path $root '.tools\node\current'
$node = Join-Path $nodeDir 'node.exe'
$npm = Join-Path $nodeDir 'npm.cmd'

if (Test-Path $node) {
  $env:PATH = "$nodeDir;$env:PATH"
  & $npm run check
  exit $LASTEXITCODE
}

npm run check
exit $LASTEXITCODE
