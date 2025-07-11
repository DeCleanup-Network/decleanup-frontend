// DeCleanup Contracts Configuration
// This file provides a clean interface to the DeCleanup contracts
// without importing the problematic TypeScript files from the package

export const Networks = {
  ARBITRUM_SEPOLIA: 'arbitrum-sepolia',
  ARBITRUM: 'arbitrum',
} as const

// Contract addresses for Arbitrum Sepolia
const ARBITRUM_SEPOLIA_CONFIG = {
  chainId: 421614,
  DCUToken: '0xEaD63c05aAaF85f52391dA6e6B16DDE49464dc47' as `0x${string}`,
  RewardLogic: '0xA2F29E577728aD6bB0AF74b4B3Af8bd5Ba3095B4' as `0x${string}`,
  DCUAccounting: '0xf8D1949db87a26d5e783A6801c97107106f060Da' as `0x${string}`,
  DCUStorage: '0x12851591e04d263c1fC77737f7533145dB984537' as `0x${string}`,
  DCURewardManager:
    '0x876d3E39F21780E387a6391Eba370268E94b566E' as `0x${string}`,
  DipNft: '0x9d42D04d8DFc172f532d02faC5821eaC1E733A8d' as `0x${string}`,
}

export class DCUContracts {
  private config: typeof ARBITRUM_SEPOLIA_CONFIG

  constructor(network: keyof typeof Networks) {
    if (network === 'ARBITRUM_SEPOLIA') {
      this.config = ARBITRUM_SEPOLIA_CONFIG
    } else {
      throw new Error(`Network ${network} not supported yet`)
    }
  }

  get DCUToken() {
    return {
      address: this.config.DCUToken,
      network: 'arbitrum-sepolia' as const,
      chainId: this.config.chainId,
    }
  }

  get RewardLogic() {
    return {
      address: this.config.RewardLogic,
      network: 'arbitrum-sepolia' as const,
      chainId: this.config.chainId,
    }
  }

  get DCUAccounting() {
    return {
      address: this.config.DCUAccounting,
      network: 'arbitrum-sepolia' as const,
      chainId: this.config.chainId,
    }
  }

  get DCUStorage() {
    return {
      address: this.config.DCUStorage,
      network: 'arbitrum-sepolia' as const,
      chainId: this.config.chainId,
    }
  }

  get DCURewardManager() {
    return {
      address: this.config.DCURewardManager,
      network: 'arbitrum-sepolia' as const,
      chainId: this.config.chainId,
    }
  }

  get DipNft() {
    return {
      address: this.config.DipNft,
      network: 'arbitrum-sepolia' as const,
      chainId: this.config.chainId,
    }
  }
}

// Export ABI getters
export const getContractAbi = {
  DCUToken: () =>
    import(
      '@decleanup/contracts/arbitrum-sepolia/artifacts/DCUToken/abi.json'
    ).then(m => m.default),
  RewardLogic: () =>
    import(
      '@decleanup/contracts/arbitrum-sepolia/artifacts/RewardLogic/abi.json'
    ).then(m => m.default),
  DCUAccounting: () =>
    import(
      '@decleanup/contracts/arbitrum-sepolia/artifacts/DCUAccounting/abi.json'
    ).then(m => m.default),
  DCUStorage: () =>
    import(
      '@decleanup/contracts/arbitrum-sepolia/artifacts/DCUStorage/abi.json'
    ).then(m => m.default),
  DCURewardManager: () =>
    import(
      '@decleanup/contracts/arbitrum-sepolia/artifacts/DCURewardManager/abi.json'
    ).then(m => m.default),
  DipNft: () =>
    import(
      '@decleanup/contracts/arbitrum-sepolia/artifacts/DipNft/abi.json'
    ).then(m => m.default),
}
