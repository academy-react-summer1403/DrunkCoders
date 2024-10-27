export function IconLabel({ icon: Icon, label, className }) {
  return (
    <div
      className={`flex items-center justify-center gap-2 text-base font-normal ${className}`}
    >
      <Icon />
      <p>{label}</p>
    </div>
  )
}
