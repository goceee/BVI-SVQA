Set oShell = CreateObject ("Wscript.Shell")
Dim strArgs
strArgs = "cmd /c command.bat"
oShell.Run strArgs, 0, false