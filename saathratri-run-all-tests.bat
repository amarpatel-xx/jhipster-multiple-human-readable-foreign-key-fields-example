@echo off
setlocal
REM Windows companion for saathratri-run-all-tests.sh. The harness is a bash
REM script that already targets Windows internally (powershell.exe port cleanup,
REM Windows-ROOT truststore), so this wrapper runs it under Git Bash, forwarding
REM all arguments. NOTE: a bare `bash` must NOT be used here -- on Windows it
REM resolves to the WSL relay in System32, which fails with
REM "execvpe(/bin/bash) failed" when no WSL distro is set up. Resolve Git Bash
REM explicitly instead: derive it from git.exe's location, then standard installs.
set "GITBASH="
for /f "delims=" %%i in ('where git 2^>nul') do if not defined GITBASH if exist "%%~dpi..\bin\bash.exe" set "GITBASH=%%~dpi..\bin\bash.exe"
if not defined GITBASH if exist "%ProgramFiles%\Git\bin\bash.exe" set "GITBASH=%ProgramFiles%\Git\bin\bash.exe"
if not defined GITBASH if exist "%LocalAppData%\Programs\Git\bin\bash.exe" set "GITBASH=%LocalAppData%\Programs\Git\bin\bash.exe"
if not defined GITBASH (
  echo Git Bash not found -- install Git for Windows.
  exit /b 1
)
"%GITBASH%" "%~dp0saathratri-run-all-tests.sh" %*
exit /b %ERRORLEVEL%
