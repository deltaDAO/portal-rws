import {
  Metadata,
  File,
  AdditionalInformation,
  ServiceMetadata
} from '@oceanprotocol/lib'
import { DataTokenOptions } from '../hooks/usePublish'
import { PriceOptions } from '../hooks/usePricing'

export interface ServiceSelfDescription {
  name?: string
  url?: string
  type?: string
  raw?: any
}
export interface AdditionalInformationMarket extends AdditionalInformation {
  links?: EditableMetadataLinks[]
  serviceSelfDescription?: Pick<ServiceSelfDescription, 'raw' | 'url'>
  termsAndConditions?: boolean
  consent: {
    noPersonalData: boolean
  }
  isInCompliance: boolean
}

export interface MetadataMarket extends Metadata {
  // While required for this market, Aquarius/Plecos will keep this as optional
  // allowing external pushes of assets without `additionalInformation`.
  // Making it optional here helps safeguarding against those assets.
  additionalInformation?: AdditionalInformationMarket
}

export interface PriceOptionsMarket extends PriceOptions {
  weightOnOcean: string
  // easier to keep this as number for Yup input validation
  swapFee: number
}

export interface MetadataPublishFormDataset {
  // ---- required fields ----
  name: string
  description: string
  files: string | File[]
  author: string
  timeout: string
  dataTokenOptions: DataTokenOptions
  access: 'Download' | 'Compute' | string
  termsAndConditions: boolean
  noPersonalData: boolean
  // ---- optional fields ----
  tags?: string
  links?: string | EditableMetadataLinks[]
  providerUri?: string
  serviceSelfDescription?: string | ServiceSelfDescription[]
}

export interface MetadataPublishFormAlgorithm {
  // ---- required fields ----
  name: string
  description: string
  files: string | File[]
  author: string
  dockerImage: string
  algorithmPrivacy: boolean
  timeout: string
  dataTokenOptions: DataTokenOptions
  termsAndConditions: boolean
  noPersonalData: boolean
  // ---- optional fields ----
  image: string
  containerTag: string
  entrypoint: string
  tags?: string
  providerUri?: string
  serviceSelfDescription?: string | ServiceSelfDescription[]
}

export interface MetadataEditForm {
  name: string
  description: string
  timeout: string
  price?: number
  links?: string | EditableMetadataLinks[]
  serviceSelfDescription?: ServiceSelfDescription[]
  author?: string
}

export interface ServiceMetadataMarket extends ServiceMetadata {
  attributes: MetadataMarket
}

export type IVerifiablePresentation = IPresentation & IHasProof

export interface IPresentation {
  '@context': ICredentialContextType | ICredentialContextType[]
  type: string[]
  verifiableCredential: IVerifiableCredential[]
  // eslint-disable-next-line camelcase
  presentation_submission?: PresentationSubmission
  holder?: string
}

export type IVerifiableCredential = ICredential & IHasProof

export interface ICredential {
  // If exp is present, the UNIX timestamp MUST be converted to an [XMLSCHEMA11-2] date-time, and MUST be used to set the value of the expirationDate property of credentialSubject of the new JSON object.
  expirationDate?: string
  // If iss is present, the value MUST be used to set the issuer property of the new credential JSON object or the holder property of the new presentation JSON object.
  issuer: string | IIssuer
  // If nbf is present, the UNIX timestamp MUST be converted to an [XMLSCHEMA11-2] date-time, and MUST be used to set the value of the issuanceDate property of the new JSON object.
  issuanceDate: string
  // If sub is present, the value MUST be used to set the value of the id property of credentialSubject of the new credential JSON object.
  credentialSubject: ICredentialSubject
  // If jti is present, the value MUST be used to set the value of the id property of the new JSON object.
  id: string
  '@context': ICredentialContextType[] | ICredentialContextType
  credentialStatus?: ICredentialStatus
  credentialSchema?: undefined | ICredentialSchemaType | ICredentialSchemaType[]
  description?: string
  name?: string
  type: string[]

  [x: string]: unknown
}

export interface ICredentialStatus {
  id: string
  type: string
}

export interface IIssuer {
  id: string

  [x: string]: unknown
}

export interface ICredentialSubject {
  id?: string

  [x: string]: unknown
}

export type ICredentialContextType = ICredentialContext | string

export interface ICredentialContext {
  name?: string
  did?: string
  [x: string]: unknown
}

export type ICredentialSchemaType = ICredentialSchema | string

export interface ICredentialSchema {
  id: string
  type?: string
}

export interface PresentationSubmission {
  /**
   * A UUID or some other unique ID to identify this Presentation Submission
   */
  id: string
  /**
   * A UUID or some other unique ID to identify this Presentation Definition
   */
  // eslint-disable-next-line camelcase
  definition_id: string
  /**
   * List of descriptors of how the claims are being mapped to presentation definition
   */
  // eslint-disable-next-line camelcase
  descriptor_map: Array<Descriptor>
}

export interface Descriptor {
  /**
   * ID to identify the descriptor from Presentation Definition Input Descriptor it coresponds to.
   */
  id: string
  /**
   * The path where the verifiable credential is located in the presentation submission json
   */
  path: string
  // eslint-disable-next-line camelcase
  path_nested?: Descriptor
  /**
   * The Proof or JWT algorith that the proof is in
   */
  format: string
}

export interface IHasProof {
  proof: IProof
}

export interface IProof {
  type: IProofType | string // The proof type
  created: string // The ISO8601 date-time string for creation
  proofPurpose: IProofPurpose | string // The specific intent for the proof
  verificationMethod: string // A set of parameters required to independently verify the proof
  challenge?: string // A challenge to protect against replay attacks
  domain?: string // A string restricting the (usage of a) proof to the domain and protects against replay attacks
  proofValue?: string // One of any number of valid representations of proof values
  jws?: string // JWS based proof
  nonce?: string // Similar to challenge. A nonce to protect against replay attacks, used in some ZKP proofs
  requiredRevealStatements?: string[] // The parts of the proof that must be revealed in a derived proof

  [x: string]: string | string[] | undefined
}

export enum IProofPurpose {
  verificationMethod = 'verificationMethod',
  assertionMethod = 'assertionMethod',
  authentication = 'authentication',
  keyAgreement = 'keyAgreement',
  contractAgreement = 'contactAgreement',
  capabilityInvocation = 'capabilityInvocation',
  capabilityDelegation = 'capabilityDelegation'
}

export enum IProofType {
  Ed25519Signature2018 = 'Ed25519Signature2018',
  Ed25519Signature2020 = 'Ed25519Signature2020',
  EcdsaSecp256k1Signature2019 = 'EcdsaSecp256k1Signature2019',
  EcdsaSecp256k1RecoverySignature2020 = 'EcdsaSecp256k1RecoverySignature2020',
  JsonWebSignature2020 = 'JsonWebSignature2020',
  RsaSignature2018 = 'RsaSignature2018',
  GpgSignature2020 = 'GpgSignature2020',
  JcsEd25519Signature2020 = 'JcsEd25519Signature2020',
  BbsBlsSignatureProof2020 = 'BbsBlsSignatureProof2020',
  BbsBlsBoundSignatureProof2020 = 'BbsBlsBoundSignatureProof2020'
}
