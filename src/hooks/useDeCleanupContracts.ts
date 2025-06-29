import { DCUContracts, getContractAbi } from '../lib/decleanup-contracts'
import { getContract } from 'viem'

import { useMemo } from 'react'
import { usePublicClient, useWalletClient } from 'wagmi'

export function useDeCleanupContracts() {
  const { data: walletClient } = useWalletClient()
  const publicClient = usePublicClient()

  return useMemo(async () => {
    if (!walletClient || !publicClient) return null

    const contracts = new DCUContracts('ARBITRUM_SEPOLIA')

    const [
      tokenAbi,
      rewardLogicAbi,
      accountingAbi,
      storageAbi,
      rewardManagerAbi,
      dipNftAbi,
    ] = await Promise.all([
      getContractAbi.DCUToken(),
      getContractAbi.RewardLogic(),
      getContractAbi.DCUAccounting(),
      getContractAbi.DCUStorage(),
      getContractAbi.DCURewardManager(),
      getContractAbi.DipNft(),
    ])

    return {
      token: getContract({
        address: contracts.DCUToken.address,
        abi: tokenAbi,
        client: walletClient,
      }),
      rewardLogic: getContract({
        address: contracts.RewardLogic.address,
        abi: rewardLogicAbi,
        client: walletClient,
      }),
      accounting: getContract({
        address: contracts.DCUAccounting.address,
        abi: accountingAbi,
        client: walletClient,
      }),
      storage: getContract({
        address: contracts.DCUStorage.address,
        abi: storageAbi,
        client: walletClient,
      }),
      rewardManager: getContract({
        address: contracts.DCURewardManager.address,
        abi: rewardManagerAbi,
        client: walletClient,
      }),
      dipNft: getContract({
        address: contracts.DipNft.address,
        abi: dipNftAbi,
        client: walletClient,
      }),
    }
  }, [walletClient, publicClient])
}
