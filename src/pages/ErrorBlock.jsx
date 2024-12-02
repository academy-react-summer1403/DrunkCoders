import { NotFound } from '@pages/NotFound'
import { useRouteError } from 'react-router-dom'

export function ErrorBlock() {
  const error = useRouteError()

  let content
  if (error.status === 404) {
    content = <NotFound notFound />
  } else {
    content = <NotFound />
  }

  return <>{content}</>
}
