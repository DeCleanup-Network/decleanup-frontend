// src/hooks/useSubmissionOperation.ts
import { useState, useCallback } from 'react'
import { useAccount } from 'wagmi'
import { useContracts } from './useContract'

export function useSubmissionOperations() {
  const { address } = useAccount()
  const contracts = useContracts()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createSubmission = useCallback(
    async (dataURI: string) => {
      if (!contracts) return null

      const writeContracts = contracts.getWriteContracts()
      if (!writeContracts) throw new Error('Wallet not connected')

      setIsLoading(true)
      setError(null)

      try {
        // Use viem's writeContract method
        const txHash = await writeContracts.submission.write.createSubmission([
          dataURI,
        ])
        return txHash
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : 'Submission creation failed'
        setError(errorMessage)
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    [contracts],
  )

  const getSubmissionDetails = useCallback(
    async (submissionId: number) => {
      if (!contracts?.Submission) return null

      try {
        const submission = await contracts.Submission.read.getSubmissionDetails(
          [submissionId],
        )
        return submission
      } catch (err) {
        console.error('Error getting submission details:', err)
        return null
      }
    },
    [contracts],
  )

  const getSubmissionsByUser = useCallback(
    async (userAddress?: string) => {
      if (!contracts?.Submission) return null

      const targetAddress = userAddress || address
      if (!targetAddress) return null

      try {
        const submissionIds =
          await contracts.Submission.read.getSubmissionsByUser([targetAddress])
        return submissionIds
      } catch (err) {
        console.error('Error getting user submissions:', err)
        return null
      }
    },
    [contracts, address],
  )

  const getSubmissionBatch = useCallback(
    async (startIndex: number, batchSize: number) => {
      if (!contracts?.Submission) return null

      try {
        const submissions = await contracts.Submission.read.getSubmissionBatch([
          startIndex,
          batchSize,
        ])
        return submissions
      } catch (err) {
        console.error('Error getting submission batch:', err)
        return null
      }
    },
    [contracts],
  )

  const getSubmissionCount = useCallback(async () => {
    if (!contracts?.Submission) return null

    try {
      const count = await contracts.Submission.read.submissionCount([])
      return count
    } catch (err) {
      console.error('Error getting submission count:', err)
      return null
    }
  }, [contracts])

  const getClaimableRewards = useCallback(
    async (userAddress?: string) => {
      if (!contracts?.Submission) return null

      const targetAddress = userAddress || address
      if (!targetAddress) return null

      try {
        const rewards = await contracts.Submission.read.getClaimableRewards([
          targetAddress,
        ])
        return rewards
      } catch (err) {
        console.error('Error getting claimable rewards:', err)
        return null
      }
    },
    [contracts, address],
  )

  const claimRewards = useCallback(async () => {
    if (!contracts) return null

    const writeContracts = contracts.getWriteContracts()
    if (!writeContracts) throw new Error('Wallet not connected')

    setIsLoading(true)
    setError(null)

    try {
      const txHash = await writeContracts.submission.write.claimRewards([])
      return txHash
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Claim failed'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [contracts])

  const approveSubmission = useCallback(
    async (submissionId: number) => {
      if (!contracts) return null

      const writeContracts = contracts.getWriteContracts()
      if (!writeContracts) throw new Error('Wallet not connected')

      setIsLoading(true)
      setError(null)

      try {
        const txHash = await writeContracts.submission.write.approveSubmission([
          submissionId,
        ])
        return txHash
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : 'Approval failed'
        setError(errorMessage)
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    [contracts],
  )

  const rejectSubmission = useCallback(
    async (submissionId: number) => {
      if (!contracts) return null

      const writeContracts = contracts.getWriteContracts()
      if (!writeContracts) throw new Error('Wallet not connected')

      setIsLoading(true)
      setError(null)

      try {
        const txHash = await writeContracts.submission.write.rejectSubmission([
          submissionId,
        ])
        return txHash
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : 'Rejection failed'
        setError(errorMessage)
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    [contracts],
  )

  return {
    createSubmission,
    getSubmissionDetails,
    getSubmissionsByUser,
    getSubmissionBatch,
    getSubmissionCount,
    getClaimableRewards,
    claimRewards,
    approveSubmission,
    rejectSubmission,
    isLoading,
    error,
  }
}
