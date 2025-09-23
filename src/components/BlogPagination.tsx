'use client'

import { Pagination, Center } from "@mantine/core"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

interface BlogPaginationProps {
    totalPages: number
    currentPage: number
}

export default function BlogPagination({ totalPages, currentPage }: BlogPaginationProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [activePage, setActivePage] = useState(currentPage)

    const handlePageChange = (page: number) => {
        setActivePage(page)

        // Update URL with new page parameter
        const params = new URLSearchParams(searchParams.toString())
        if (page === 1) {
            params.delete('page')
        } else {
            params.set('page', page.toString())
        }

        const queryString = params.toString()
        const newUrl = queryString ? `/?${queryString}` : '/'

        router.push(newUrl)
    }

    return (
        <Center mt="xl">
            <Pagination
                total={totalPages}
                value={activePage}
                onChange={handlePageChange}
                styles={{
                    control: {
                        '&[dataActive]': {
                            backgroundColor: 'var(--mantine-color-blue-6)',
                        },
                    },
                }}
            />
        </Center>
    )
}
