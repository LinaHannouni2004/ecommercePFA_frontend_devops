'use client'
import { useState } from 'react'

const SearchBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All categories')

  const categories = [
    {name: 'All categories'},
    { name: 'Smartphones' },
    { name: 'Cameras' },
    { name: 'Smartwatches' },
    { name: 'Laptops' }
  ]

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const selectCategory = (category) => {
    setSelectedCategory(category)
    setIsDropdownOpen(false)
  }

  return (
    <form className="w-full mx-auto font-sans"> {/* Ajout de font-sans pour la police */}
      <div className="flex">
        <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-gray-400 sr-only">
          Search
        </label>
        
        {/* Dropdown button - Style adapté */}
        <button
          id="dropdown-button"
          type="button"
          onClick={toggleDropdown}
          className="shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-200 bg-gray-800 border border-purple-900 rounded-s-lg hover:bg-black-700 focus:ring-2 focus:outline-none focus:ring-black-500"
        >
          {selectedCategory}
          <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
          </svg>
        </button>

        {/* Dropdown menu - Style adapté */}
        {isDropdownOpen && (
          <div className="z-10 absolute mt-10 bg-gray-800 border border-purple-900 rounded-lg shadow-lg w-44">
            <ul className="py-2 text-sm text-gray-200">
              {categories.map((category) => (
                <li key={category.name}>
                  <button
                    type="button"
                    onClick={() => selectCategory(category.name)}
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-700 hover:text-white"
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Search input - Style adapté */}
        <div className="relative w-full">
          <input
            type="search"
            id="search-dropdown"
            className="block p-2.5 w-full z-20 text-sm text-white bg-gray-800 rounded-e-lg border-s-purple-900 border-s-2 border border-purple-900 focus:ring-2 focus:outline-none focus:ring-gray-500 placeholder-gray-400 font-medium"
            placeholder="Search products..."
            required
          />
          <button
            type="submit"
            className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-gray-700 rounded-e-lg border border-purple-600 hover:bg-gray-600 focus:ring-2 focus:outline-none focus:ring-gray-500"
          >
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>
      </div>
    </form>
  )
}

export default SearchBar