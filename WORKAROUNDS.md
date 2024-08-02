## FALSE_POSITIVE_POINTER_EVENTS

When running vitest in browser mode, the pointer events are not correctly simulated. This can be related to this [known issue](https://github.com/microsoft/playwright/issues/12821). The bug also appears not only in chromium, but also in webkit. The workaround is to use `userEvent` events with the setting `{ pointerEventsCheck: 0 }` to disable the pointer events check.

```javascript
await userEvent.type(titleInput, 'New Note Title', { pointerEventsCheck: 0 })
```
