import { Search } from '@assets/index'
import { BaseInput, IconLabel } from '@components/index'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { sortFilterActions } from '@store/index'

export function SearchBox({ label, className }) {
  const [searchTerm, setSearchTerm] = useState('')
  const dispatch = useDispatch()

  function handleSearch() {
    dispatch(
      sortFilterActions.setSearchTerm(
        searchTerm.trim() === '' ? null : searchTerm.trim(),
      ),
    )
  }

  return (
    <BaseInput
      label={label && <IconLabel icon={Search} label="جست‌ جو دوره" />}
      placeholder="جست جو کنید ..."
      name="search"
      size="lg"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      type="text"
      endIcon={BlueSearchIcon}
      className={`mb-0 ${className}`}
      // classNames={{ input: 'text-sm' }}
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
