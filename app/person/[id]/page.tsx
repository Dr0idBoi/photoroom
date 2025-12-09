import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'

export default async function PersonPage({ params }: { params: { id: string } }) {
  // Try to find model by ID or slug
  const model = await prisma.model.findFirst({
    where: {
      OR: [
        { id: params.id },
        { slug: { contains: params.id } }
      ]
    }
  }).catch(() => null)

  if (model) {
    redirect(`/model/${model.slug}`)
  }

  // If not found, redirect to catalog
  redirect('/catalog')
}



