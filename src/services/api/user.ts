import { API_BASE_URL } from '@/lib/constants'
import { User } from '@/types'

/**
 * Get user profile
 */
export async function getUserProfile(userId: string): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`)

  if (!response.ok) {
    throw new Error('Failed to fetch user profile')
  }

  return response.json()
}

/**
 * Update user profile
 */
export async function updateUserProfile(
  userId: string,
  data: Partial<User>,
): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to update user profile')
  }

  return response.json()
}

/**
 * Get user statistics
 */
export async function getUserStats(userId: string): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/users/${userId}/stats`)

  if (!response.ok) {
    throw new Error('Failed to fetch user statistics')
  }

  return response.json()
}
