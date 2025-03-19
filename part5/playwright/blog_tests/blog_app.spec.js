const { test, expect, beforeEach, describe } = require('@playwright/test')
const { login, create } = require('./test_helper')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await page.goto('/')
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: {
                name: 'Kuro',
                username: 'SillyKuro',
                password: 'prillya'
            }
        })
        await request.post('/api/users', {
            data: {
                name: 'Miyu',
                username: 'SillyMiyu',
                password: 'prillya'
            }
        })
    })

    describe('Login', () => {
        test('Login form is shown', async ({ page }) => {
            // ...
            await expect(page.getByText('username')).toBeVisible()
            await expect(page.getByText('password')).toBeVisible()
        })
        test('Login w/ valid creds', async ({ page }) => {
            await login(page, 'SillyKuro', 'prillya')
            await expect(page.getByText('username')).not.toBeVisible()
        })
        test('Login w/ invalid creds', async ({ page }) => {
            await login(page, 'SillyKuro', 'wrongPassword')
            await expect(page.getByText('username')).toBeVisible()
        })
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await login(page, 'SillyKuro', 'prillya')
            await expect(page.getByText('username')).not.toBeVisible()
        })

        test('a new blog can be created', async ({ page }) => {
            await create(page,
                'Kuro\'s First Blog',
                'Kuro',
                'https://typemoon.fandom.com/wiki/Chloe_von_Einzbern')
            await expect(page.getByText('Kuro\'s First Blog successfully added to database!')).toBeVisible()
        })
        describe('When user creates a blog', () => {
            beforeEach(async ({ page }) => {
                await create(page,
                    'Kuro\'s First Blog',
                    'Kuro',
                    'https://typemoon.fandom.com/wiki/Chloe_von_Einzbern')
                await expect(page.getByText('Kuro\'s First Blog successfully added to database!')).toBeVisible()
            })

            test('User can like a blog', async ({ page }) => {
                await page.getByText('view').click()
                await page.getByRole('button', { name: 'Like' }).click()
                await expect(page.getByText('Likes: 1')).toBeVisible()
            })

            test('User can delete a blog they\'ve created', async ({ page }) => {
                // Create a Handler which accepts window.confirm
                page.on('dialog', async (dialog) => await dialog.accept())
                await page.getByRole('button', { name: 'Delete' }).click()
                await expect(page.getByText('view')).not.toBeVisible()
            })

            test('New user can only view non-user blogs', async ({ page }) => {
                await page.getByRole('button', { name: 'Logout' }).click()
                await login(page, 'SillyMiyu', 'prillya')
                await expect(page.getByText('Current User: SillyMiyu')).toBeVisible()
                await expect(page.getByText('Delete')).not.toBeVisible()
            })

            test('Most liked Blog appears first', async ({ page }) => {
                await create(page,
                    'Kuro\'s Most Liked Blog',
                    'Kuro',
                    'https://typemoon.fandom.com/wiki/Illyasviel_von_Einzbern')
                await expect(page.getByText('Title: Kuro\'s Most Liked Blog')).toBeVisible()
                const mostLikedBlog = await page.getByText('Title: Kuro\'s Most Liked Blog').locator('..')
                await mostLikedBlog.getByRole('button', { name: 'view' }).click()
                await mostLikedBlog.getByRole('button', { name: 'Like' }).click()
                const bottomBlog = await page.getByText('Title: Kuro\'s First Blog').locator('..')
                await page.waitForTimeout(500)
                const bottomBox = await bottomBlog.boundingBox();
                const topBox = await mostLikedBlog.boundingBox();

                await expect(bottomBox.y).toBeGreaterThan(topBox.y);
            })

        })
    })

})