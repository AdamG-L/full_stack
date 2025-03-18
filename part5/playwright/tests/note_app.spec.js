const { test, expect, describe, beforeEach } = require('@playwright/test')
const {loginWith, createNote} = require('./helper')

describe('Note App', () => {

    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: {
                name: 'Kuro',
                username: 'SillyKuro',
                password: 'prillya'
            }
        })
        await page.goto('/')
    })

    test('front page can be opened', async ({ page }) => {
        const locator = await page.getByText('Notes')
        await expect(locator).toBeVisible()
        await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2024')).toBeVisible()
    })


    test('login form can be opened', async ({ page }) => {
        await loginWith(page, 'SillyKuro', 'prillya')
        await expect(page.getByText('username')).not.toBeVisible()
    })

    test('Login fails w/ invalid data', async ({page}) => {
        await page.getByRole('button', {name: 'Login'}).click()
        await page.getByTestId('username').fill('SillyKuro')
        await page.getByTestId('password').fill('wrongPassword')
        await page.getByRole('button', { name: 'login' }).click()

        const errorDiv = await page.locator('.errorMsg')
        await expect(errorDiv).toContainText('Wrong credentials')
        //await expect(page.getByText('Wrong credentials')).toBeVisible()
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'SillyKuro', 'prillya')
            // Ensure login is complete before proceeding
            await expect(page.getByText('username')).not.toBeVisible()
        })

        test('a new note can be created', async ({ page }) => {
            await createNote(page, 'a note created by playwright')
            await expect(page.getByText('a note created by playwright')).toBeVisible()
        })

        describe('and several notes exists', () => {

            beforeEach(async ({ page }) => {
                await createNote(page, 'first note')
                await createNote(page, 'second note')
                await createNote(page, 'third note')
            })

            test('importance can be changed', async ({ page }) => {
                const noteOneElement = await page.getByText('second note').locator('..')
                await noteOneElement.getByRole('button', {name: 'mark unimportant'}).click()
                await expect(noteOneElement.getByText('mark important')).toBeVisible()
            })
        })
    })
})
