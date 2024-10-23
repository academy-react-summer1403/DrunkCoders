import { Button } from '@components/index'
import { Cancel } from '@assets/index'

export function ModalCloseBtn({ onClose }) {
  return (
    <Button
      onClick={onClose}
      variant="bordered"
      startContent={<Cancel />}
      className="border border-[#FF5454] bg-transparent text-[#FF5454]"
    >
      بستن
    </Button>
  )
}
