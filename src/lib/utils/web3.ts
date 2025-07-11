import { ethers } from 'ethers'

/**
 * Convert wei to ether
 */
export function weiToEther(wei: string | number): string {
  return ethers.formatEther(wei.toString())
}

/**
 * Convert ether to wei
 */
export function etherToWei(ether: string | number): string {
  return ethers.parseEther(ether.toString()).toString()
}

/**
 * Get network name by chain ID
 */
export function getNetworkName(chainId: number): string {
  const networks: { [key: number]: string } = {
    1: 'Ethereum Mainnet',
    137: 'Polygon',
    42161: 'Arbitrum One',
    5: 'Goerli Testnet',
    80001: 'Mumbai Testnet',
  }
  return networks[chainId] || 'Unknown Network'
}

/**
 * Check if address is a contract
 */
export async function isContract(
  address: string,
  provider: ethers.Provider,
): Promise<boolean> {
  try {
    const code = await provider.getCode(address)
    return code !== '0x'
  } catch {
    return false
  }
}

/**
 * Get transaction status
 */
export function getTransactionStatus(
  receipt: ethers.TransactionReceipt | null,
): string {
  if (!receipt) return 'Pending'
  return receipt.status === 1 ? 'Success' : 'Failed'
}
