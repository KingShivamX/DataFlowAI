# PowerShell wrapper script for Cursor
# This script ignores the -l parameter and executes the remaining command

# Set up logging
$logFile = Join-Path $PSScriptRoot "cursor_wrapper_ps.log"
"$(Get-Date) - Script started with arguments: $($args -join ' ')" | Out-File -FilePath $logFile -Append

param(
    [Parameter(ValueFromRemainingArguments=$true)]
    $RemainingArgs
)

# Log the received arguments
"$(Get-Date) - Received arguments: $($RemainingArgs -join ' ')" | Out-File -FilePath $logFile -Append

# Filter out -l from the arguments
$filteredArgs = $RemainingArgs | Where-Object { $_ -ne "-l" }
"$(Get-Date) - Filtered arguments: $($filteredArgs -join ' ')" | Out-File -FilePath $logFile -Append

# If there are arguments left, execute them
if ($filteredArgs) {
    # Join the arguments into a command string
    $commandString = $filteredArgs -join " "
    
    # Log the command we're about to execute
    "$(Get-Date) - Executing: $commandString" | Out-File -FilePath $logFile -Append
    
    try {
        # Execute the command
        $result = Invoke-Expression $commandString
        "$(Get-Date) - Command completed successfully" | Out-File -FilePath $logFile -Append
        # Output the result
        $result
    } catch {
        # Log any errors
        "$(Get-Date) - Error executing command: $_" | Out-File -FilePath $logFile -Append
    }
} else {
    "$(Get-Date) - No valid arguments to execute" | Out-File -FilePath $logFile -Append
} 