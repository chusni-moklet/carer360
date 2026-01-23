import { Suspense } from 'react'
import DaftarContent from './DaftarContent'
import Loading from './loading'

export default function DaftarPage() {
  return (
    <Suspense fallback={<Loading />}>
      <DaftarContent />
    </Suspense>
  )
}