export interface ContractConfig {
  address: string
  abi: any[]
  chainId: number
}

export interface DeCleanupContract {
  address: string
  abi: any[]
  functions: {
    [key: string]: any
  }
}

export interface ContractState {
  isConnected: boolean
  isConnecting: boolean
  error: string | null
}
