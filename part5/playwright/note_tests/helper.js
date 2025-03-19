const { expect } = require('@playwright/test')

const loginWith = async (page, username, password) => {
    await page.getByRole('button', { name: 'Login' }).click()
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByRole('button', { name: 'login' }).click()
}

const createNote = async (page, content) => {
    await page.getByRole('button', { name: 'New Note' }).click()
    await page.getByRole('textbox').fill(content)
    await page.getByRole('button', { name: 'Save' }).click()
    await page.getByText(content).waitFor()
}

export { loginWith, createNote }