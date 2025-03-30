/*
Example RTK Query code. Saves data to the store as cache.

*/

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// Define API Slice
const  anecdotesApi = createApi({
    reducerPath: 'anecdotesApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001/'}),
    endpoints: (builder) => ({
        getNotes: builder.query({
            query: () => 'anecdotes'
        })
    })
})

export const {useGetAnecdotesQuery} = anecdotesApi
export default anecdotesApi
