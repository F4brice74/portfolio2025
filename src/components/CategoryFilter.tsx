'use client'

import { Select, Group, Text, Badge } from "@mantine/core"
import { Category } from "@/types/article"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"

interface CategoryFilterProps {
  categories: Category[]
  selectedCategory?: string
}

export default function CategoryFilter({ categories, selectedCategory }: CategoryFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [value, setValue] = useState<string | null>(selectedCategory || null)

  useEffect(() => {
    setValue(selectedCategory || null)
  }, [selectedCategory])

  const handleCategoryChange = (categorySlug: string | null) => {
    setValue(categorySlug)

    const params = new URLSearchParams(searchParams.toString())

    if (categorySlug) {
      params.set('category', categorySlug)
    } else {
      params.delete('category')
    }

    // Reset to page 1 when filtering
    params.delete('page')

    const newUrl = params.toString() ? `?${params.toString()}` : ''
    router.push(`/${newUrl}`)
  }

  const clearFilter = () => {
    setValue(null)
    const params = new URLSearchParams(searchParams.toString())
    params.delete('category')
    params.delete('page')

    const newUrl = params.toString() ? `?${params.toString()}` : ''
    router.push(`/${newUrl}`)
  }

  const selectData = [
    { value: '', label: 'Toutes les catégories' },
    ...categories.map((category: Category) => ({
      value: category.slug,
      label: `${category.name}`
    }))
  ]

  return (
    <Group justify="space-between" mb="md" wrap="wrap">
      <Group gap="sm">
        <Text size="sm" fw={500} c="var(--mantine-color-gray-7)">
          Filtrer par catégorie :
        </Text>
        <Select
          placeholder="Sélectionner une catégorie"
          data={selectData}
          value={value}
          onChange={handleCategoryChange}
          clearable
          allowDeselect
          size="sm"
          w={250}
          styles={{
            input: {
              borderColor: 'var(--mantine-color-blue-3)',
              '&:focus': {
                borderColor: 'var(--mantine-color-blue-5)',
              }
            }
          }}
        />
        {value && (
          <Badge
            color="blue"
            variant="light"
            size="sm"
            style={{ cursor: 'pointer' }}
            onClick={clearFilter}
          >
            Effacer le filtre
          </Badge>
        )}
      </Group>

      {value && (
        <Text size="xs" c="dimmed">
          Filtrage actif
        </Text>
      )}
    </Group>
  )
}
