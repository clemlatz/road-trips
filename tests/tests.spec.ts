import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:8080';

test('displays home page', async ({ page }) => {
  await page.goto(BASE_URL);

  await expect(page).toHaveTitle(/Road Trips/);
  await expect(page.getByRole('heading', { name: 'Road Trips' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Islande, juillet 2016' })).toBeVisible();
});

test('displays trip page', async ({ page }) => {
  await page.goto(`${BASE_URL}/iceland/`);

  await expect(page).toHaveTitle(/Road Trips/);
  await expect(page.getByRole('heading', { name: 'Road-Trip en Islande' })).toBeVisible();
  await expect(page.getByRole('link', { name: '1', exact: true })).toBeVisible();
});

test('displays entry page', async ({ page }) => {
  await page.goto(`${BASE_URL}/iceland/1-aeroport-de-keflavik`);

  await expect(page).toHaveTitle(/1. Aéroport de Keflavik — Road-Trip en Islande/);
  await expect(page.getByRole('heading', { name: 'Aéroport de Keflavik' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Un élément indispensable au road-trip réussi : la voiture !' }))
    .toBeVisible();
});
