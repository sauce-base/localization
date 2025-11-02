import { type App } from 'vue';
import { i18nVue, loadLanguageAsync } from 'laravel-vue-i18n';
import { useLocalizationStore } from './stores';
import { resolveLanguage } from '@/lib/utils';


/**
 * Localization module setup
 * Called during app initialization before mounting
 */
export function setup(app: App) {
    console.log('Localization module loaded');

    app.use(i18nVue, {
        resolve: resolveLanguage,
    });

    const { language } = useLocalizationStore();
    if (language !== 'en') {
        loadLanguageAsync(language);
    }

    app.provide('localization', {
        locales: ['en', 'pt-BR'],
        currentLanguage: () => {
            const store = useLocalizationStore();
            return store.language;
        },
        setLanguage: async (lang: string) => {
            const store = useLocalizationStore();
            store.setLanguage(lang);
            await loadLanguageAsync(lang);
        },
    });
}

/**
 * Called after the app is mounted
 * Initializes the language from the store
 */
export function afterMount() {
    console.log('Localization module after mount');
}
