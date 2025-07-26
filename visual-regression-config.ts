export const config = {
    user: {
        blacklistStories: ['LoadingSpinner'],
        misMatchThresholdInPercentage: 0.1,
    },
    backstopCapture: {
        id: 'backstop_default',
        viewPorts: [
            {
                label: 'phone',
                width: 320,
                height: 480,
            },
            {
                label: 'tablet',
                width: 1024,
                height: 768,
            },
            {
                label: 'desktop',
                width: 1920,
                height: 1080,
            }
        ],
        scenarioDefault: {
            selectorExpansion: true,
            requireSameDimensions: true,
            delay: 2000,
            postInteractionWait: 500,
            hideSelectors: [],
            removeSelectors: [],
        },
        browser: {
            engine: 'playwright',
            engineOptions: {
                args: ['--no-sandbox'],
            },
            asyncCaptureLimit: 5,
            asyncCompareLimit: 50,
            debug: false,
            debugWindow: false,
        },
        scripts: {
            onBeforeScript: 'playwright/onBefore.js',
            onReadyScript: 'playwright/onReady.js',
            base: 'backstop_data/engine_scripts',
        },
        locations: {
            bitmaps_reference: 'backstop_data/bitmaps_reference',
            bitmaps_test: 'backstop_data/bitmaps_test',
            html_report: 'backstop_data/html_report',
            ci_report: 'backstop_data/ci_report',
        },
    },
    buildProcess: {
        locations: {
            referenceServePort: 6006,
            changedServePort: 6006,
        },
    },
};

export interface StoryJSON {
    entries: Record<string, {
        id: string;
        title: string;
        name: string;
        tags: string[];
        type: string;
    }>;
}

export function constructScenarios(stories: StoryJSON, baseUrl: string) {
    console.assert(!baseUrl.endsWith('/'), 'baseUrl should not end with a /', baseUrl);

    return Object.values(stories.entries)
        .filter(
            story =>
                // Filter for actual stories (not docs)
                story.type === 'story' &&
                // remove blacklisted stories (e.g. loading spinner, what ever is not static)
                !config.user.blacklistStories.includes(story.id)
        )
        .map(entry => {
            const { title, name, id } = entry;
            return {
                ...config.backstopCapture.scenarioDefault,
                // backstop waits for this to appear, before taking the screenshot
                readySelector: '#storybook-root',
                label: `${title} ${name}`,
                // custom url is required to isolate the storybook component in its own frame
                url: `${baseUrl}/iframe.html?viewMode=story&id=${id}`,
                selectors: ['#storybook-root'],
                misMatchThreshold: config.user.misMatchThresholdInPercentage,
                // cookiePath: 'backstop_data/engine_scripts/cookies.json',
            };
        })
        .filter(defined);
}

function defined<T>(x: T | undefined): x is T {
    return Boolean(x);
}
