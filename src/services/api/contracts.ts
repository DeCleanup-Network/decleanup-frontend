import { API_BASE_URL } from '@/lib/constants'

/**
 * Get contract metadata
 */
export async function getContractMetadata(
  contractAddress: string,
): Promise<any> {
  const response = await fetch(
    `${API_BASE_URL}/contracts/${contractAddress}/metadata`,
  )

  if (!response.ok) {
    throw new Error('Failed to fetch contract metadata')
  }

  return response.json()
}

/**
 * Get contract events
 */
export async function getContractEvents(
  contractAddress: string,
  fromBlock?: number,
): Promise<any[]> {
  const params = new URLSearchParams()
  if (fromBlock) {
    params.append('fromBlock', fromBlock.toString())
  }

  const response = await fetch(
    `${API_BASE_URL}/contracts/${contractAddress}/events?${params}`,
  )

  if (!response.ok) {
    throw new Error('Failed to fetch contract events')
  }

  return response.json()
}

/**
 * Get contract balance
 */
export async function getContractBalance(
  contractAddress: string,
): Promise<string> {
  const response = await fetch(
    `${API_BASE_URL}/contracts/${contractAddress}/balance`,
  )

  if (!response.ok) {
    throw new Error('Failed to fetch contract balance')
  }

  const data = await response.json()
  return data.balance
}
