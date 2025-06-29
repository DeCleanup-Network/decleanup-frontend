import { DCUContracts } from '../lib/decleanup-contracts'

export function ContractInfo() {
  const contracts = new DCUContracts('ARBITRUM_SEPOLIA')

  return (
    <div className='space-y-2 text-sm'>
      <div>Network: {contracts.DCUToken.network}</div>
      <div>Chain ID: {contracts.DCUToken.chainId}</div>
      <div>DCU Token: {contracts.DCUToken.address}</div>
      <div>Reward Logic: {contracts.RewardLogic.address}</div>
      <div>Accounting: {contracts.DCUAccounting.address}</div>
    </div>
  )
}
