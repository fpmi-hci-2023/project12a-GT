function Format-Json([Parameter(Mandatory, ValueFromPipeline)][String] $json) {
  $indent = 0;
  ($json -Split '\n' |
    % {
      if ($_ -match '[\}\]]') {
        # This line contains  ] or }, decrement the indentation level
        $indent--
      }
      $line = (' ' * $indent * 2) + $_.TrimStart().Replace(':  ', ': ')
      if ($_ -match '[\{\[]') {
        # This line contains [ or {, increment the indentation level
        $indent++
      }
      $line
  }) -Join "`n"
}

function Update-Version([Parameter(Mandatory)][String] $path, [Parameter(Mandatory)][String] $version) {
	$appPackageFileContent = Get-Content $path -raw | ConvertFrom-Json
	$appPackageFileContent.version = $version
	$appPackageFileContent | ConvertTo-Json -Depth 5| Format-Json | set-content $path
}