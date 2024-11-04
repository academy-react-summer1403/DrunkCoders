export function TitleDescription({ children, title = 'وضعیت پرداختی' }) {
  return (
    <section>
      <h5 className="mb-3 text-base text-basic-gray dark:text-white/60">
        {title}
      </h5>
      <div>{children}</div>
    </section>
  )
}
