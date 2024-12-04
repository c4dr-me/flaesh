import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma' 

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET

  if (!SIGNING_SECRET) {
    throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Create a new Svix instance with the secret
  const wh = new Webhook(SIGNING_SECRET)

  // Get headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, return an error
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    })
  }

  // Get the body
  const payload = await req.json()

  if (typeof payload !== 'object' || payload === null) {
    console.error('Invalid payload received:', payload)
    return new Response('Invalid payload', { status: 400 })
  }

  const body = JSON.stringify(payload)

  let evt: WebhookEvent

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error: Could not verify webhook:', err)
    return new Response('Error: Verification error', { status: 400 })
  }

  // Extract data and type from the event
  const { type, data } = evt
  console.log(`Received webhook: ${type}`, data)

  try {
    // Handle specific webhook events
    switch (type) {
      case 'user.created':
        await prisma.user.create({
          data: {
            // id: data.id,
            email: data.email_addresses?.[0]?.email_address || '',
            firstName: data.first_name || null,
            lastName: data.last_name || null,
            clerkId: data.id,
            createdAt: new Date(data.created_at),
          },
        })
        console.log('User created:', data.id)
        break

      case 'user.updated':
        await prisma.user.update({
          where: { clerkId: data.id },
          data: {
            email: data.email_addresses?.[0]?.email_address || '',
            firstName: data.first_name || null,
            lastName: data.last_name || null,
            clerkId: data.id,
            updatedAt: new Date(data.updated_at),
          },
        })
        console.log('User updated:', data.id)
        break

        case 'user.deleted':
          const user = await prisma.user.findUnique({
            where: { clerkId: data.id },
          })
          if (user) {
            await prisma.user.delete({
              where: { clerkId: data.id },
            })
            console.log('User deleted:', data.id)
          } else {
            console.warn('User not found for deletion:', data.id)
          }
          break

      default:
        console.warn('Unhandled webhook event:', type)
    }
  } catch (err) {
    console.error('Error processing webhook:', err)
    return new Response('Error: Database operation failed', {
      status: 500,
    })
  }

  return new Response('Webhook handled', { status: 200 })
}
