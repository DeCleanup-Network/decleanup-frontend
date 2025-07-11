import { DCUContracts, getContractAbi } from './decleanup-contracts'
import { PublicClient, WalletClient, getContract } from 'viem'

// Get contract addresses and ABIs
const contracts = new DCUContracts('ARBITRUM_SEPOLIA')

export async function getDeCleanupReadContracts(publicClient: PublicClient) {
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
      client: publicClient,
    }),
    rewardLogic: getContract({
      address: contracts.RewardLogic.address,
      abi: rewardLogicAbi,
      client: publicClient,
    }),
    accounting: getContract({
      address: contracts.DCUAccounting.address,
      abi: accountingAbi,
      client: publicClient,
    }),
    storage: getContract({
      address: contracts.DCUStorage.address,
      abi: storageAbi,
      client: publicClient,
    }),
    rewardManager: getContract({
      address: contracts.DCURewardManager.address,
      abi: rewardManagerAbi,
      client: publicClient,
    }),
    dipNft: getContract({
      address: contracts.DipNft.address,
      abi: dipNftAbi,
      client: publicClient,
    }),
  }
}

export async function getDeCleanupWriteContracts(walletClient: WalletClient) {
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
}
