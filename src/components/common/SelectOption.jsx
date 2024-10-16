import { Select, SelectItem } from '@nextui-org/react'
import { useEffect, useState } from 'react'

export function SelectOption({
  data,
  label,
  identifier,
  onFilterChange,
  prevSelectedItem,
}) {
  const [value, setValue] = useState('')

  useEffect(() => {
    setValue(prevSelectedItem)
  }, [])

  function handleChange(e) {
    setValue(e.target.value)
    onFilterChange(identifier, e.target.value)
  }

  return (
    <div className="">
      <Select
        label={label}
        labelPlacement="outside"
        placeholder="انتخاب کنید"
        onChange={handleChange}
        selectedKeys={[value]}
        size="lg"
        selectorIcon={<div></div>}
        classNames={{
          label: 'text-base',
          value: 'text-right text-sm',
        }}
      >
        {data?.map(
          (item) =>
            item.name && <SelectItem key={item.id}>{item.name}</SelectItem>,
        )}
      </Select>
    </div>
  )
}
