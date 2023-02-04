import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

  // Go to http://localhost:3000/
  await page.goto('http://localhost:3000/')
  const embedWrapper = page.locator('div.eleventy-plugin-youtube-embed')
  const embedFrameElement = embedWrapper.locator('iframe')
  const embedFrame = page.frameLocator('iframe')

  // Expect the wrapper to exist
  await expect(embedWrapper).toBeTruthy()

  // Expect the iframe to exist
  await expect(embedFrameElement).toBeTruthy()

  // Expect the iframe to have the correct title
  await expect(embedFrameElement).toHaveAttribute('title', 'Embedded YouTube video')

  // Expect the iframe to have the correct src
  await expect(embedFrameElement).toHaveAttribute('src', 'https://www.youtube-nocookie.com/embed/hIs5StN8J-0')


  // Click [aria-label="Play"]
  await embedFrame.locator('[aria-label="Play"]').click();

  // Click [aria-label="Play \(k\)"]
  await embedFrame.locator('[aria-label="Play \\(k\\)"]').click();

  // Click .ytp-fullscreen-button
  // This fails on webkit for unknown reasons
  // await embedFrame.locator('.ytp-fullscreen-button').click();

  // Click [aria-label="Settings"]
  await embedFrame.locator('[aria-label="Settings"]').click();

  // Click [aria-label="Settings"]
  await embedFrame.locator('[aria-label="Settings"]').click();

  // Click text=Animotion - Obsession >> nth=0
  await embedFrame.locator('text=Animotion - Obsession').first().click()

  // Click [aria-label="Copy link"]
  await embedFrame.locator('[aria-label="Copy link"]').click();

});
