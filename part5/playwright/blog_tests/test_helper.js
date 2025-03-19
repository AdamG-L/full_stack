const login = async (page, username, password) => {
    await page.getByTestId('username').clear()
    await page.getByTestId('password').clear()
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByText('login').click()
}

const create = async (page, title, author, url) => {
    await page.getByText('Add Post').click()
    await page.getByTestId('title').fill(title)
    await page.getByTestId('author').fill(author)
    await page.getByTestId('url').fill(url)
    await page.getByText('Create Blog').click()
}

export { login, create }