import { Search } from '@assets/index'
import { BaseInput, IconLabel } from '@components/index'
import { useState } from 'react'

export function SearchBox({ label, className, onSearch, prevSearchTerm }) {
  const [searchTerm, setSearchTerm] = useState(prevSearchTerm ?? '')
  function handleSearch() {
    onSearch(searchTerm)
  }

  return (
    <BaseInput
      label={label ?? null}
      placeholder="جست جو کنید ..."
      name="search"
      size="lg"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      type="text"
      endIcon={BlueSearchIcon}
      className={`mb-0 ${className}`}
      // defaultValue={prevSearchTerm ?? ''}
    />
  )

  function BlueSearchIcon() {
    return (
      <div
        className="relative -left-[14px] flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-blue hover:bg-blue-700"
        onClick={handleSearch}
      >
        <Search className="text-white" />
      </div>
    )
  }
}
