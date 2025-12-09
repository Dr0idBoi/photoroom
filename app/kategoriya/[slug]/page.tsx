import { redirect } from 'next/navigation'

export default function KategoriyaPage({ params }: { params: { slug: string } }) {
  redirect(`/category-models/${params.slug}`)
}



