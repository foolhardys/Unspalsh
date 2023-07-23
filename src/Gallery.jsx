import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useGlobalContext } from './context'

const url = 'https://api.unsplash.com/search/photos?client_id=7Bontr4y3k2X48TkhTqpLJA5oHVu2920mTmjhq0POqg'

const Gallery = () => {
const {searchTerm} = useGlobalContext()


    const response = useQuery({
        queryKey: ['images', searchTerm],
        queryFn: async () => {
            const result = await axios.get(`${url}&query=${searchTerm}`)

            return result.data
        }
    })
    console.log(response)
    if (response.isLoading) {
        return <section className='image-container'>
            <h4>Loading...</h4>
        </section>
    }
    if (response.isError) {
        return <section className='image-container'>
            <h4>Error occurred...</h4>
        </section>
    }

    const results = response.data.results

    if (results.length < 1) {
        return <section className='image-container'>
            <h4>No results found...</h4>
        </section>
    }

    return (
        <section className='image-container'>
            {results.map((item) => {
                const url = item?.urls?.regular
                return <img
                    src={url}
                    key={item.id}
                    alt={item.description}
                    className='img' />
            })}
        </section>
    )
}

export default Gallery
