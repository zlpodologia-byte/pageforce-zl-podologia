import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 60_000,
  fullyParallel: false,
  workers: 1,
  expect: {
    toHaveScreenshot: {
      pathTemplate:
        "tests/visual/__snapshots__{/projectName}/{testFileName}/{arg}{ext}",
    },
  },
  use: {
    baseURL: "http://127.0.0.1:3001",
    trace: "on",
    video: "on",
    screenshot: "only-on-failure",
    viewport: { width: 1440, height: 900 },
  },
  reporter: [["list"]],
  webServer: {
    command: "npm run dev -- --port 3001",
    url: "http://127.0.0.1:3001",
    reuseExistingServer: true,
    timeout: 120_000,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
