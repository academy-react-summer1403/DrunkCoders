export function IconLabel({ icon: Icon, label }) {
  return (
    <div className="flex items-center justify-center gap-2 text-base font-normal">
      <Icon />
      <p>{label}</p>
    </div>
  )
}