import { Search } from '@assets/index'
import { BaseInput, IconLabel } from '@components/index'

export function SearchBox({ label, className }) {
  return (
    <BaseInput
      label={label && <IconLabel icon={Search} label="جست‌ جو دوره" />}
      placeholder="جست جو کنید ..."
      name="search"
      size="lg"
      type="text"
      endIcon={BlueSearchIcon}
      className={`mb-0 ${className}`}
      // classNames={{ input: 'text-sm' }}
    />
  )

  function BlueSearchIcon() {
    return (
      <div className="relative -left-[14px] flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-blue">
        <Search className="text-white" />
      </div>
    )
  }
}
