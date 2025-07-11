import { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

/**
 * method to determine if request is authorized
 * meaning user has signed in with ethereum
 * session has token from siwe
 * https://login.xyz
 * https://eips.ethereum.org/EIPS/eip-4361
 **/
export async function authReq(req: NextRequest) {
  try {
    // step 0: extract client-provided address from headers
    const clientAddress = req.headers.get('x-client-address')
    if (!clientAddress) {
      console.warn('missing client address in headers')
      return {
        success: false,
        error: 'client address is required',
      }
    }
    console.log(`client address extracted: ${clientAddress}`)

    // step 1: retrieve session token from request
    const token = await getToken({ req })
    if (!token) {
      console.warn('no session token found in request')
      return {
        success: false,
        error: 'invalid or missing session token',
      }
    }
    console.log('session token successfully retrieved')

    // step 2: validate session address matches client address
    const sessionAddress = token.address as string | undefined
    if (!sessionAddress) {
      console.warn('no address found in session token')
      return {
        success: false,
        error: 'session token does not contain a valid address',
      }
    }
    console.log(`session address extracted: ${sessionAddress}`)

    if (sessionAddress.toLowerCase() !== clientAddress.toLowerCase()) {
      console.warn(
        'address mismatch: client address does not match session address',
      )
      return {
        success: false,
        error: 'unauthorized: address mismatch',
      }
    }
    console.log('client address matches session address')

    // step 3: return successful authentication
    return {
      success: true,
      address: sessionAddress,
    }
  } catch (error) {
    console.error('error during authentication', error)
    return {
      success: false,
      error: 'internal server error during authentication',
    }
  }
}
