@echo off
REM This script is a wrapper for PowerShell to handle the -l parameter
REM that Cursor tries to use when executing commands

REM Create a log file for debugging
echo %date% %time% - Script started with arguments: %* > "%~dp0cursor_wrapper.log"

REM Extract all arguments after -l if present
setlocal enabledelayedexpansion
set args=
set skip_next=0
for %%a in (%*) do (
    if "!skip_next!"=="1" (
        set skip_next=0
    ) else if "%%a"=="-l" (
        set skip_next=0
    ) else (
        set args=!args! %%a
    )
)

echo %date% %time% - Filtered arguments: %args% >> "%~dp0cursor_wrapper.log"

REM Call PowerShell with the filtered arguments
echo %date% %time% - Executing: powershell.exe %args% >> "%~dp0cursor_wrapper.log"
powershell.exe %args%
echo %date% %time% - Command completed with exit code: %ERRORLEVEL% >> "%~dp0cursor_wrapper.log" 