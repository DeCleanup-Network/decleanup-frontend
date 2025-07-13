// src/hooks/useRewardOperations.ts
import { useState, useCallback } from 'react'
import { useAccount } from 'wagmi'
import { parseUnits } from 'viem'
import { useContracts } from './useContract'

export function useRewardOperations() {
  const { address } = useAccount()
  const contracts = useContracts()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getPendingRewards = useCallback(async () => {
    if (!contracts?.DCURewardManager || !address) return null

    try {
      const rewards =
        await contracts.DCURewardManager.getPendingRewards(address)
      return rewards
    } catch (err) {
      console.error('Error getting pending rewards:', err)
      return null
    }
  }, [contracts, address])

  const claimRewards = useCallback(
    async (amount: string) => {
      if (!contracts) return null

      const writeContracts = contracts.getWriteContracts()
      if (!writeContracts) throw new Error('Wallet not connected')

      setIsLoading(true)
      setError(null)

      try {
        const parsedAmount = parseUnits(amount, 18)
        const tx = await writeContracts.rewardManager.claimRewards(parsedAmount)
        await tx.wait()
        return tx
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Claim failed'
        setError(errorMessage)
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    [contracts],
  )

  return {
    getPendingRewards,
    claimRewards,
    isLoading,
    error,
  }
}
