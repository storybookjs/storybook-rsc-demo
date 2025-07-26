# Visual Regression Testing with BackstopJS and Storybook

This project implements a dynamic visual regression testing system that automatically generates test scenarios from your Storybook stories.

## Overview

The system consists of:
- **visual-regression-config.ts**: Configuration and scenario extraction logic
- **visual-regression.ts**: Main execution script that generates dynamic BackstopJS config
- **Dynamic configuration**: No need to manually maintain backstop.json scenarios

## Setup

1. **Prerequisites**: Make sure you have Storybook configured with stories
2. **Dependencies**: Already installed (`backstopjs`, `playwright`)

## Usage

### 1. Start Storybook
First, start your Storybook development server:
```bash
npm run storybook
```

### 2. Create Reference Screenshots
Generate reference screenshots from your current stories:
```bash
npm run backstop:reference
```

### 3. Run Visual Regression Tests
After making changes, test against the reference:
```bash
npm run backstop:test
```

### 4. Approve Changes (if needed)
If the changes are intentional, approve them as new references:
```bash
npm run backstop:approve
```

## How It Works

### Step 1: Story Discovery
The system automatically discovers all your Storybook stories by:
- Fetching `stories.json` from the running Storybook instance
- Filtering for actual stories (excludes docs pages)
- Excluding blacklisted stories (configurable)

### Step 2: Scenario Generation
For each story, it creates a BackstopJS scenario with:
- **URL**: `http://localhost:6006/iframe.html?viewMode=story&id={story-id}`
- **Selector**: `#storybook-root` (the main Storybook container)
- **Viewports**: Phone (320x480) and Tablet (1024x768)

### Step 3: Dynamic Configuration
Generates a complete BackstopJS configuration with:
- Playwright engine (instead of Puppeteer)
- Proper paths for screenshots and reports
- Configurable mismatch thresholds

### Step 4: Execution
Runs BackstopJS with the generated configuration in either:
- **Reference mode**: Creates baseline screenshots
- **Test mode**: Compares current state against references

## Configuration

### Blacklisting Stories
Edit `visual-regression-config.ts` to exclude specific stories:
```typescript
export const config = {
  user: {
    blacklistStories: ['LoadingSpinner', 'ErrorState'],
    // ...
  },
  // ...
};
```

### Adjusting Viewports
Modify the viewports in `visual-regression-config.ts`:
```typescript
viewPorts: [
  { label: 'phone', width: 320, height: 480 },
  { label: 'tablet', width: 1024, height: 768 },
  { label: 'desktop', width: 1920, height: 1080 }, // Add more viewports
],
```

### Mismatch Threshold
Adjust sensitivity to visual changes:
```typescript
misMatchThresholdInPercentage: 0.1, // 0.1% difference allowed
```

## Troubleshooting

### "Error reading stories.json"
- Make sure Storybook is running (`npm run storybook`)
- Or build Storybook first (`npm run build-storybook`)

### Playwright Issues
- The system uses Playwright engine scripts in `backstop_data/engine_scripts/playwright/`
- These are automatically configured and should work out of the box

### Selector Issues
- The default selector is `#storybook-root`
- If your Storybook uses a different root element, update it in `visual-regression-config.ts`

## File Structure

```
├── visual-regression-config.ts    # Configuration and scenario extraction
├── visual-regression.ts           # Main execution script
├── backstop_data/                 # BackstopJS data directory
│   ├── bitmaps_reference/         # Reference screenshots
│   ├── bitmaps_test/              # Test screenshots
│   ├── html_report/               # Visual diff reports
│   └── engine_scripts/playwright/ # Playwright scripts
└── package.json                   # Updated with new scripts
```

## Integration with CI/CD

Add to your CI pipeline:
```yaml
- name: Visual Regression Tests
  run: |
    npm run storybook &
    npm run backstop:test
```

The system will exit with code 1 if visual differences are detected, failing the CI build.
