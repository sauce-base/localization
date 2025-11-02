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

## Frontend Integration

### Language Selector Component

The module provides a `LanguageSelector` Vue component that can be integrated into your application's UI in two modes:

#### Installation Steps

1. **Import the component:**

   ```vue
   import LanguageSelector from
   '@modules/Localization/resources/js/components/LanguageSelector.vue';
   ```

2. **Use in your templates:**

   **Standalone mode** (for landing pages, headers):

   ```vue
   <LanguageSelector mode="standalone" />
   ```

   **Submenu mode** (for dropdown menus, user navigation):

   ```vue
   <LanguageSelector mode="submenu" />
   ```

#### Component Props

- `mode`: `'standalone' | 'submenu'` - Display mode of the selector
- `triggerClass`: Custom CSS classes for the standalone mode trigger button

#### Usage Examples

##### Example 1: Header Component (Standalone Mode)

```vue
<template>
  <header>
    <nav>
      <div class="flex items-center space-x-3">
        <LanguageSelector mode="standalone" />
        <ThemeSelector mode="standalone" />
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import LanguageSelector from '@modules/Localization/resources/js/components/LanguageSelector.vue';
</script>
```

##### Example 2: User Navigation Menu (Submenu Mode)

```vue
<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <!-- User menu trigger -->
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuGroup>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <LanguageSelector mode="submenu" />
        <ThemeSelector mode="submenu" />
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import LanguageSelector from '@modules/Localization/resources/js/components/LanguageSelector.vue';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
</script>
```

##### Example 3: Custom Trigger Styling

```vue
<template>
  <LanguageSelector
    mode="standalone"
    trigger-class="rounded-full p-3 hover:bg-blue-500 text-white"
  />
</template>

<script setup lang="ts">
import LanguageSelector from '@modules/Localization/resources/js/components/LanguageSelector.vue';
</script>
```

### Using the Localization Store

The module includes a Pinia store for managing language state:

```typescript
import { useLocalizationStore } from '@modules/Localization/resources/js/stores';

const store = useLocalizationStore();

// Get current language
const currentLang = store.language;

// Set language programmatically
await store.setLanguage('pt_BR');
```
