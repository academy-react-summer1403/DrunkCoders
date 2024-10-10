import { Select, SelectItem } from '@nextui-org/react'

export function SelectOption({ data, label }) {
  return (
    <div className="">
      <Select
        label={label}
        // className=""
        labelPlacement="outside"
        placeholder="انتخاب کنید"
        selectorIcon={<div></div>}
        classNames={{
          label: 'text-base',
          value: 'text-right ',
        }}
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <SelectItem key={index}>{index}</SelectItem>
        ))}
      </Select>
    </div>
  )
}
