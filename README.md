# Localization Module

A Laravel module that extends Saucebase core functionality. Designed for seamless integration with the ecosystem.

## Installation

```bash
composer require saucebase/localization
composer dump-autoload
php artisan module:enable Localization
```

## Middleware Configuration

### Localization Middleware

This middleware handles automatic locale detection and sets the application locale based on various factors such as:

- URL segments (e.g., `/en/page`, `/pt-br/page`)
- User preferences stored in session/database
- Browser language preferences
- Default application locale as fallback

### Installation Steps

1. **Import the middleware class:**

   ```php
   use Modules\Localization\Http\Middleware\HandleLocalization;
   ```

2. **Add to the web middleware group in `bootstrap/app.php`:**
   ```php
   ->withMiddleware(function (Middleware $middleware): void {
        $middleware->web(append: [
             HandleInertiaRequests::class,
             AddLinkHeadersForPreloadedAssets::class,
             // Add the localization middleware here
             HandleLocalization::class,
        ]);
   });
   ```

> **Note:** The middleware should be placed after Inertia and asset preloading middleware to ensure proper request handling and response generation.
