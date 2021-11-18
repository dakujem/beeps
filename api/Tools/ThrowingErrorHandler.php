<?php

declare(strict_types=1);

namespace App\Tools;

use ErrorException;

/**
 * A callable error handler that turns every reported error (warning, notice, ...) into an exception.
 * Use with `set_error_handler` function.
 * @see ErrorException
 *
 * Usage:
 *    $handler = new ThrowingErrorHandler();
 *    $originalErrorHandler = set_error_handler($handler);
 *    try{ fopen($file); } catch(ErrorException) { ... }
 *
 * @author Andrej Rypak <xrypak@gmail.com>
 */
final class ThrowingErrorHandler
{
    /**
     * The fatal error types that cannot be silenced using the @ operator in PHP 8+.
     *
     * Taken from Sentry.
     * @see ErrorHandler::$PHP8_UNSILENCEABLE_FATAL_ERRORS
     */
    private const PHP8_UNSILENCEABLE_FATAL_ERRORS = \E_ERROR | \E_PARSE | \E_CORE_ERROR | \E_COMPILE_ERROR | \E_USER_ERROR | \E_RECOVERABLE_ERROR;

    public function __invoke($severity, $message, $file, $line)
    {
        // The error was suppressed with the @-operator (Note, this works until PHP 8, see below).
        $isSilencedError = 0 === error_reporting();

        // This IF code block is taken from Sentry ErrorHandler
        if (\PHP_MAJOR_VERSION >= 8) {
            // Starting from PHP8, when a silenced error occurs the `error_reporting()`
            // function will return a bitmask of fatal errors that are unsilenceable.
            // If by subtracting from this value those errors the result is 0, we can
            // conclude that the error was silenced.
            $isSilencedError = 0 === (error_reporting() & ~self::PHP8_UNSILENCEABLE_FATAL_ERRORS);

            // However, starting from PHP8 some fatal errors are unsilenceable,
            // so we have to check for them to avoid reporting any of them as
            // silenced instead
            if ($severity === (self::PHP8_UNSILENCEABLE_FATAL_ERRORS & $severity)) {
                $isSilencedError = false;
            }
        }

        // The error is included in the error-reporting level setting.
        $isErrorReported = error_reporting() & $severity;

        if ($isSilencedError || !$isErrorReported) {
            // This error code is not included in error_reporting
            // or was silenced by the @ operator.
            return false;
        }
        throw new ErrorException($message, 0, $severity, $file, $line);
    }
}
