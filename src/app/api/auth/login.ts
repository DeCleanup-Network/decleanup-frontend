'use client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import {
  createThirdwebClient,
  generatePayload,
  getUser,
  verifyPayload,
} from 'thirdweb'
import { inMemoryWallet } from 'thirdweb/wallets'
import { auth } from './[...nextauth]'
import { serialize } from 'cookie'

// Initialize ThirdWeb client
const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Get the NextAuth session (Google OAuth)
    const session = await getServerSession(req, res, auth)
    if (!session || !session.idToken) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    // Use the Google id_token as the identifier
    const idToken = session.idToken

    // Generate a ThirdWeb Auth payload
    const payload = await generatePayload({
      client,
      address: idToken, // Use id_token as the unique identifier
    })

    // Sign the payload with an in-memory wallet (for demo purposes)
    const wallet = inMemoryWallet()
    const signedPayload = await wallet.signPayload(payload)

    // Verify the signed payload
    const verified = await verifyPayload({
      client,
      payload: signedPayload,
    })

    if (!verified) {
      return res.status(401).json({ error: 'Verification failed' })
    }

    // Get the ThirdWeb user (includes wallet address)
    const thirdwebUser = await getUser({ client, address: idToken })

    // Store the ThirdWeb session in a cookie
    const sessionData = {
      address: thirdwebUser.address,
      idToken,
    }
    const encryptedSessionData = JSON.stringify(sessionData) // In production, encrypt this
    const cookie = serialize('thirdweb_session', encryptedSessionData, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    })

    res.setHeader('Set-Cookie', cookie)
    res
      .status(200)
      .json({ message: 'Login successful', address: thirdwebUser.address })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
