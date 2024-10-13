import { Select, SelectItem } from '@nextui-org/react'
import { useState } from 'react'

export function SelectOption({ data, label }) {
  const [value, setValue] = useState()

  // console.log(value)

  return (
    <div className="">
      <Select
        label={label}
        // className="max-w-xs"
        labelPlacement="outside"
        placeholder="انتخاب کنید"
        onChange={(e) => setValue(e.target.value)}
        selectedKeys={[value]}
        size="lg"
        selectorIcon={<div></div>}
        classNames={{
          label: 'text-base',
          value: 'text-right text-sm',
        }}
      >
        {animals.map((animal) => (
          <SelectItem key={animal.key}>{animal.label}</SelectItem>
        ))}
      </Select>
    </div>
  )
}

const animals = [
  { key: 'cat', label: 'Cat' },
  { key: 'dog', label: 'Dog' },
  { key: 'elephant', label: 'Elephant' },
  { key: 'lion', label: 'Lion' },
]
