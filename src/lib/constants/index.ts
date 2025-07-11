// Application constants
export const APP_NAME = 'DeCleanup'
export const APP_VERSION = '1.0.0'

// API endpoints
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

// Web3 constants
export const SUPPORTED_CHAINS = {
  ETHEREUM: 1,
  POLYGON: 137,
  ARBITRUM: 42161,
} as const

export const CONTRACT_ADDRESSES = {
  DECLEANUP: process.env.NEXT_PUBLIC_DECLEANUP_CONTRACT_ADDRESS || '',
} as const

// UI constants
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

// Error messages
export const ERROR_MESSAGES = {
  WALLET_CONNECTION_FAILED: 'Failed to connect wallet',
  CONTRACT_INTERACTION_FAILED: 'Contract interaction failed',
  NETWORK_NOT_SUPPORTED: 'Network not supported',
  INSUFFICIENT_BALANCE: 'Insufficient balance',
} as const
