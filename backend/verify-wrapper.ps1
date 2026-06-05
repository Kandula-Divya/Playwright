Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = [System.IO.Compression.ZipFile]::OpenRead('.mvn\wrapper\maven-wrapper.jar')
$zip.Entries | Select-Object -First 20 | ForEach-Object { $_.FullName }
$manifest = $zip.GetEntry('META-INF/MANIFEST.MF')
if ($manifest -ne $null) {
    $reader = [System.IO.StreamReader]::new($manifest.Open())
    $reader.ReadToEnd() | Select-Object -First 20
} else {
    Write-Host 'MANIFEST MISSING'
}
