import React, { ReactElement } from 'react'
import Label from '../../../atoms/Input/Label'
import { useSiteMetadata } from '../../../../hooks/useSiteMetadata'
import FormHelp from '../../../atoms/Input/Help'
import {
  EthereumListsChain,
  getNetworkDataById,
  getNetworkType
} from '../../../../utils/web3'
import NetworksList from './NetworksList'
import useNetworkMetadata from '../../../../hooks/useNetworkMetadata'

export function filterNetworksByType(
  type: 'mainnet' | 'testnet',
  chainIds: number[],
  networksList: { node: EthereumListsChain }[]
): number[] {
  const finalNetworks = chainIds.filter((chainId: number) => {
    const networkData = getNetworkDataById(networksList, chainId)
    return type === getNetworkType(networkData)
  })
  return finalNetworks
}

export default function Networks(): ReactElement {
  const { networksList } = useNetworkMetadata()
  const { appConfig } = useSiteMetadata()

  const networksMain = filterNetworksByType(
    'mainnet',
    appConfig.chainIdsSupported,
    networksList
  )

  const networksTest = filterNetworksByType(
    'testnet',
    appConfig.chainIdsSupported,
    networksList
  )

  return (
    networksMain.concat(networksTest).length > 1 && (
      <li>
        <Label htmlFor="chains">Networks</Label>
        <FormHelp>Switch the data source for the interface.</FormHelp>

        {networksMain.length > 0 && (
          <NetworksList title="Main" networks={networksMain} />
        )}
        {networksTest.length > 0 && (
          <NetworksList title="Test" networks={networksTest} />
        )}
      </li>
    )
  )
}
