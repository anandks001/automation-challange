import { defineConfig } from 'cypress';
import { addMatchImageSnapshotPlugin } from '@simonsmith/cypress-image-snapshot/plugin';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import createEsbuildPlugin from '@badeball/cypress-cucumber-preprocessor/esbuild';
import cypressEslint from 'cypress-eslint-preprocessor';

async function setupNodeEvents(on, config) {
    await addCucumberPreprocessorPlugin(on, config);

    on(
        'file:preprocessor',
        createBundler({
            plugins: [createEsbuildPlugin(config)],
        }),
        cypressEslint(),
    );
    require('cypress-mochawesome-reporter/plugin')(on);
    addMatchImageSnapshotPlugin(on, config);
    return config;
}

export default defineConfig({
    e2e: {
        setupNodeEvents,
        specPattern: '**/*.feature',
        baseUrl: 'https://qachallenge.spectrm.io/#',
        video: true,
        chromeWebSecurity: false,
        retries: {
            runMode: 2,
            openMode: 0,
        },
        numTestsKeptInMemory: 0,
        pageLoadTimeout: 80000,
        defaultCommandTimeout: 8000,
    },
    reporter: 'cypress-mochawesome-reporter',
});
