import { useMemo } from 'react'
import { useChainId, usePublicClient, useWalletClient } from 'wagmi'
import { getContract } from 'viem'
import { DCUContracts, Networks } from '@decleanup/contracts'

export function useContracts() {
  const chainId = useChainId()
  const publicClient = usePublicClient()
  const walletClient = useWalletClient()

  return useMemo(() => {
    const network =
      chainId === 421614 ? Networks.ARBITRUM_SEPOLIA : Networks.ARBITRUM

    if (!network) {
      console.warn(`Unsupported chain ID: ${chainId}`)
      return null
    }

    if (!publicClient) {
      console.warn('Public client not available')
      return null
    }

    const contractConfigs = new DCUContracts(network)

    console.log('useContract', { chainId, publicClient, walletClient })

    // Create actual contract instances for reading
    const readContracts = {
      DCUToken: getContract({
        address: contractConfigs.DCUToken.address as `0x${string}`,
        abi: contractConfigs.DCUToken.abi,
        client: publicClient,
      }),
      RewardLogic: getContract({
        address: contractConfigs.RewardLogic.address as `0x${string}`,
        abi: contractConfigs.RewardLogic.abi,
        client: publicClient,
      }),
      DCUAccounting: getContract({
        address: contractConfigs.DCUAccounting.address as `0x${string}`,
        abi: contractConfigs.DCUAccounting.abi,
        client: publicClient,
      }),
      DCUStorage: getContract({
        address: contractConfigs.DCUStorage.address as `0x${string}`,
        abi: contractConfigs.DCUStorage.abi,
        client: publicClient,
      }),
      DCURewardManager: getContract({
        address: contractConfigs.DCURewardManager.address as `0x${string}`,
        abi: contractConfigs.DCURewardManager.abi,
        client: publicClient,
      }),
      DipNft: getContract({
        address: contractConfigs.DipNft.address as `0x${string}`,
        abi: contractConfigs.DipNft.abi,
        client: publicClient,
      }),
      NFTCollection: getContract({
        address: contractConfigs.NFTCollection.address as `0x${string}`,
        abi: contractConfigs.NFTCollection.abi,
        client: publicClient,
      }),
      Submission: getContract({
        address: contractConfigs.Submission.address as `0x${string}`,
        abi: contractConfigs.Submission.abi,
        client: publicClient,
      }),
    }

    return {
      ...readContracts,

      getWriteContracts: () => {
        if (!walletClient?.data) return null

        // Create contract instances for writing
        return {
          token: getContract({
            address: contractConfigs.DCUToken.address as `0x${string}`,
            abi: contractConfigs.DCUToken.abi,
            client: walletClient.data,
          }),
          rewardManager: getContract({
            address: contractConfigs.DCURewardManager.address as `0x${string}`,
            abi: contractConfigs.DCURewardManager.abi,
            client: walletClient.data,
          }),
          dipNft: getContract({
            address: contractConfigs.DipNft.address as `0x${string}`,
            abi: contractConfigs.DipNft.abi,
            client: walletClient.data,
          }),
          submission: getContract({
            address: contractConfigs.Submission.address as `0x${string}`,
            abi: contractConfigs.Submission.abi,
            client: walletClient.data,
          }),
          accounting: getContract({
            address: contractConfigs.DCUAccounting.address as `0x${string}`,
            abi: contractConfigs.DCUAccounting.abi,
            client: walletClient.data,
          }),
          storage: getContract({
            address: contractConfigs.DCUStorage.address as `0x${string}`,
            abi: contractConfigs.DCUStorage.abi,
            client: walletClient.data,
          }),
          rewardLogic: getContract({
            address: contractConfigs.RewardLogic.address as `0x${string}`,
            abi: contractConfigs.RewardLogic.abi,
            client: walletClient.data,
          }),
          nftCollection: getContract({
            address: contractConfigs.NFTCollection.address as `0x${string}`,
            abi: contractConfigs.NFTCollection.abi,
            client: walletClient.data,
          }),
        }
      },
    }
  }, [chainId, publicClient, walletClient])
}
