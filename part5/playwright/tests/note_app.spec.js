const { test, expect, describe, beforeEach } = require('@playwright/test')


describe('Note App', () => {

    beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173')
    })

    test('front page can be opened', async ({ page }) => {
        const locator = await page.getByText('Notes')
        await expect(locator).toBeVisible()
        await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2024')).toBeVisible()
    })


    test('login form can be opened', async ({ page }) => {
        await page.getByRole('button', { name: 'Login' }).click()
        await page.getByTestId('username').fill('Illya')
        await page.getByTestId('password').fill('prillya')

        await page.getByRole('button', { name: 'login' }).click()

        await expect(page.getByText('Create a new note')).toBeVisible()
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            console.log('Running beforeEach')
            await page.getByRole('button', { name: 'Login' }).click()
            await page.getByTestId('username').fill('Illya')
            await page.getByTestId('password').fill('prillya')

            await page.getByRole('button', { name: 'login' }).click()
            // Ensure login is complete before proceeding
            await expect(page.getByText('Create a new note')).toBeVisible()
        })

        test('a new note can be created', async ({ page }) => {
            await page.getByRole('textbox').fill('a note created by playwright')
            await page.getByRole('button', { name: 'save' }).click()
            await expect(page.getByText('a note created by playwright')).toBeVisible()
        })
    })
})
