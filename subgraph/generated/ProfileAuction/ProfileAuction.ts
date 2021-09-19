// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class AdminChanged extends ethereum.Event {
  get params(): AdminChanged__Params {
    return new AdminChanged__Params(this);
  }
}

export class AdminChanged__Params {
  _event: AdminChanged;

  constructor(event: AdminChanged) {
    this._event = event;
  }

  get previousAdmin(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newAdmin(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class BeaconUpgraded extends ethereum.Event {
  get params(): BeaconUpgraded__Params {
    return new BeaconUpgraded__Params(this);
  }
}

export class BeaconUpgraded__Params {
  _event: BeaconUpgraded;

  constructor(event: BeaconUpgraded) {
    this._event = event;
  }

  get beacon(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class ChangedBidURI extends ethereum.Event {
  get params(): ChangedBidURI__Params {
    return new ChangedBidURI__Params(this);
  }
}

export class ChangedBidURI__Params {
  _event: ChangedBidURI;

  constructor(event: ChangedBidURI) {
    this._event = event;
  }

  get _user(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _old(): string {
    return this._event.parameters[1].value.toString();
  }

  get _new(): string {
    return this._event.parameters[2].value.toString();
  }

  get _merge(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class MintedProfile extends ethereum.Event {
  get params(): MintedProfile__Params {
    return new MintedProfile__Params(this);
  }
}

export class MintedProfile__Params {
  _event: MintedProfile;

  constructor(event: MintedProfile) {
    this._event = event;
  }

  get _user(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _val(): string {
    return this._event.parameters[1].value.toString();
  }

  get _amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get _blockNum(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class NewBid extends ethereum.Event {
  get params(): NewBid__Params {
    return new NewBid__Params(this);
  }
}

export class NewBid__Params {
  _event: NewBid;

  constructor(event: NewBid) {
    this._event = event;
  }

  get _user(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _val(): string {
    return this._event.parameters[1].value.toString();
  }

  get _amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class NewClaimableProfile extends ethereum.Event {
  get params(): NewClaimableProfile__Params {
    return new NewClaimableProfile__Params(this);
  }
}

export class NewClaimableProfile__Params {
  _event: NewClaimableProfile;

  constructor(event: NewClaimableProfile) {
    this._event = event;
  }

  get _user(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _val(): string {
    return this._event.parameters[1].value.toString();
  }

  get _amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get _blockNum(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class RedeemProfile extends ethereum.Event {
  get params(): RedeemProfile__Params {
    return new RedeemProfile__Params(this);
  }
}

export class RedeemProfile__Params {
  _event: RedeemProfile;

  constructor(event: RedeemProfile) {
    this._event = event;
  }

  get _user(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _val(): string {
    return this._event.parameters[1].value.toString();
  }

  get _block(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get _amount(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get _tokenId(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }
}

export class RemoveBid extends ethereum.Event {
  get params(): RemoveBid__Params {
    return new RemoveBid__Params(this);
  }
}

export class RemoveBid__Params {
  _event: RemoveBid;

  constructor(event: RemoveBid) {
    this._event = event;
  }

  get _user(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _val(): string {
    return this._event.parameters[1].value.toString();
  }

  get _amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class UpdateBid extends ethereum.Event {
  get params(): UpdateBid__Params {
    return new UpdateBid__Params(this);
  }
}

export class UpdateBid__Params {
  _event: UpdateBid;

  constructor(event: UpdateBid) {
    this._event = event;
  }

  get _user(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _val(): string {
    return this._event.parameters[1].value.toString();
  }

  get _addition(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get _final(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class Upgraded extends ethereum.Event {
  get params(): Upgraded__Params {
    return new Upgraded__Params(this);
  }
}

export class Upgraded__Params {
  _event: Upgraded;

  constructor(event: Upgraded) {
    this._event = event;
  }

  get implementation(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class ProfileAuction__getBidsResultValue0Struct extends ethereum.Tuple {
  get _nftTokens(): BigInt {
    return this[0].toBigInt();
  }

  get _blockMinted(): BigInt {
    return this[1].toBigInt();
  }

  get _profileURI(): string {
    return this[2].toString();
  }

  get _blockWait(): BigInt {
    return this[3].toBigInt();
  }
}

export class ProfileAuction extends ethereum.SmartContract {
  static bind(address: Address): ProfileAuction {
    return new ProfileAuction("ProfileAuction", address);
  }

  blockWait(): BigInt {
    let result = super.call("blockWait", "blockWait():(uint256)", []);

    return result[0].toBigInt();
  }

  try_blockWait(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("blockWait", "blockWait():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getBids(_user: Address): Array<ProfileAuction__getBidsResultValue0Struct> {
    let result = super.call(
      "getBids",
      "getBids(address):((uint256,uint256,string,uint256)[])",
      [ethereum.Value.fromAddress(_user)]
    );

    return result[0].toTupleArray<ProfileAuction__getBidsResultValue0Struct>();
  }

  try_getBids(
    _user: Address
  ): ethereum.CallResult<Array<ProfileAuction__getBidsResultValue0Struct>> {
    let result = super.tryCall(
      "getBids",
      "getBids(address):((uint256,uint256,string,uint256)[])",
      [ethereum.Value.fromAddress(_user)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      value[0].toTupleArray<ProfileAuction__getBidsResultValue0Struct>()
    );
  }

  nftProfileHelperAddress(): Address {
    let result = super.call(
      "nftProfileHelperAddress",
      "nftProfileHelperAddress():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_nftProfileHelperAddress(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "nftProfileHelperAddress",
      "nftProfileHelperAddress():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  profileFee(): BigInt {
    let result = super.call("profileFee", "profileFee():(uint256)", []);

    return result[0].toBigInt();
  }

  try_profileFee(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("profileFee", "profileFee():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  publicClaim(): BigInt {
    let result = super.call("publicClaim", "publicClaim():(uint256)", []);

    return result[0].toBigInt();
  }

  try_publicClaim(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("publicClaim", "publicClaim():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  staticFee(): BigInt {
    let result = super.call("staticFee", "staticFee():(uint256)", []);

    return result[0].toBigInt();
  }

  try_staticFee(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("staticFee", "staticFee():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class BuyProfileCall extends ethereum.Call {
  get inputs(): BuyProfileCall__Inputs {
    return new BuyProfileCall__Inputs(this);
  }

  get outputs(): BuyProfileCall__Outputs {
    return new BuyProfileCall__Outputs(this);
  }
}

export class BuyProfileCall__Inputs {
  _call: BuyProfileCall;

  constructor(call: BuyProfileCall) {
    this._call = call;
  }

  get _profileURI(): string {
    return this._call.inputValues[0].value.toString();
  }
}

export class BuyProfileCall__Outputs {
  _call: BuyProfileCall;

  constructor(call: BuyProfileCall) {
    this._call = call;
  }
}

export class BuyProfileWithPermitCall extends ethereum.Call {
  get inputs(): BuyProfileWithPermitCall__Inputs {
    return new BuyProfileWithPermitCall__Inputs(this);
  }

  get outputs(): BuyProfileWithPermitCall__Outputs {
    return new BuyProfileWithPermitCall__Outputs(this);
  }
}

export class BuyProfileWithPermitCall__Inputs {
  _call: BuyProfileWithPermitCall;

  constructor(call: BuyProfileWithPermitCall) {
    this._call = call;
  }

  get _profileURI(): string {
    return this._call.inputValues[0].value.toString();
  }

  get v(): i32 {
    return this._call.inputValues[1].value.toI32();
  }

  get r(): Bytes {
    return this._call.inputValues[2].value.toBytes();
  }

  get s(): Bytes {
    return this._call.inputValues[3].value.toBytes();
  }
}

export class BuyProfileWithPermitCall__Outputs {
  _call: BuyProfileWithPermitCall;

  constructor(call: BuyProfileWithPermitCall) {
    this._call = call;
  }
}

export class ChangeBidURICall extends ethereum.Call {
  get inputs(): ChangeBidURICall__Inputs {
    return new ChangeBidURICall__Inputs(this);
  }

  get outputs(): ChangeBidURICall__Outputs {
    return new ChangeBidURICall__Outputs(this);
  }
}

export class ChangeBidURICall__Inputs {
  _call: ChangeBidURICall;

  constructor(call: ChangeBidURICall) {
    this._call = call;
  }

  get _oldProfileURI(): string {
    return this._call.inputValues[0].value.toString();
  }

  get _newProfileURI(): string {
    return this._call.inputValues[1].value.toString();
  }
}

export class ChangeBidURICall__Outputs {
  _call: ChangeBidURICall;

  constructor(call: ChangeBidURICall) {
    this._call = call;
  }
}

export class ClaimProfileCall extends ethereum.Call {
  get inputs(): ClaimProfileCall__Inputs {
    return new ClaimProfileCall__Inputs(this);
  }

  get outputs(): ClaimProfileCall__Outputs {
    return new ClaimProfileCall__Outputs(this);
  }
}

export class ClaimProfileCall__Inputs {
  _call: ClaimProfileCall;

  constructor(call: ClaimProfileCall) {
    this._call = call;
  }

  get _profileURI(): string {
    return this._call.inputValues[0].value.toString();
  }
}

export class ClaimProfileCall__Outputs {
  _call: ClaimProfileCall;

  constructor(call: ClaimProfileCall) {
    this._call = call;
  }
}

export class InitializeCall extends ethereum.Call {
  get inputs(): InitializeCall__Inputs {
    return new InitializeCall__Inputs(this);
  }

  get outputs(): InitializeCall__Outputs {
    return new InitializeCall__Outputs(this);
  }
}

export class InitializeCall__Inputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }

  get _nftErc20Contract(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _minter(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _nftProfile(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get _governor(): Address {
    return this._call.inputValues[3].value.toAddress();
  }

  get _nftProfileHelperAddress(): Address {
    return this._call.inputValues[4].value.toAddress();
  }

  get _coldWallet(): Address {
    return this._call.inputValues[5].value.toAddress();
  }
}

export class InitializeCall__Outputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }
}

export class MintProfileForCall extends ethereum.Call {
  get inputs(): MintProfileForCall__Inputs {
    return new MintProfileForCall__Inputs(this);
  }

  get outputs(): MintProfileForCall__Outputs {
    return new MintProfileForCall__Outputs(this);
  }
}

export class MintProfileForCall__Inputs {
  _call: MintProfileForCall;

  constructor(call: MintProfileForCall) {
    this._call = call;
  }

  get _buyer(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _profileURI(): string {
    return this._call.inputValues[1].value.toString();
  }
}

export class MintProfileForCall__Outputs {
  _call: MintProfileForCall;

  constructor(call: MintProfileForCall) {
    this._call = call;
  }
}

export class RedeemProfileCall extends ethereum.Call {
  get inputs(): RedeemProfileCall__Inputs {
    return new RedeemProfileCall__Inputs(this);
  }

  get outputs(): RedeemProfileCall__Outputs {
    return new RedeemProfileCall__Outputs(this);
  }
}

export class RedeemProfileCall__Inputs {
  _call: RedeemProfileCall;

  constructor(call: RedeemProfileCall) {
    this._call = call;
  }

  get _tokenId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class RedeemProfileCall__Outputs {
  _call: RedeemProfileCall;

  constructor(call: RedeemProfileCall) {
    this._call = call;
  }
}

export class RemoveProfileBidCall extends ethereum.Call {
  get inputs(): RemoveProfileBidCall__Inputs {
    return new RemoveProfileBidCall__Inputs(this);
  }

  get outputs(): RemoveProfileBidCall__Outputs {
    return new RemoveProfileBidCall__Outputs(this);
  }
}

export class RemoveProfileBidCall__Inputs {
  _call: RemoveProfileBidCall;

  constructor(call: RemoveProfileBidCall) {
    this._call = call;
  }

  get _profileURI(): string {
    return this._call.inputValues[0].value.toString();
  }
}

export class RemoveProfileBidCall__Outputs {
  _call: RemoveProfileBidCall;

  constructor(call: RemoveProfileBidCall) {
    this._call = call;
  }
}

export class SetBlockWaitCall extends ethereum.Call {
  get inputs(): SetBlockWaitCall__Inputs {
    return new SetBlockWaitCall__Inputs(this);
  }

  get outputs(): SetBlockWaitCall__Outputs {
    return new SetBlockWaitCall__Outputs(this);
  }
}

export class SetBlockWaitCall__Inputs {
  _call: SetBlockWaitCall;

  constructor(call: SetBlockWaitCall) {
    this._call = call;
  }

  get _wait(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetBlockWaitCall__Outputs {
  _call: SetBlockWaitCall;

  constructor(call: SetBlockWaitCall) {
    this._call = call;
  }
}

export class SetOwnerCall extends ethereum.Call {
  get inputs(): SetOwnerCall__Inputs {
    return new SetOwnerCall__Inputs(this);
  }

  get outputs(): SetOwnerCall__Outputs {
    return new SetOwnerCall__Outputs(this);
  }
}

export class SetOwnerCall__Inputs {
  _call: SetOwnerCall;

  constructor(call: SetOwnerCall) {
    this._call = call;
  }

  get _new(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetOwnerCall__Outputs {
  _call: SetOwnerCall;

  constructor(call: SetOwnerCall) {
    this._call = call;
  }
}

export class SetProfileFeeCall extends ethereum.Call {
  get inputs(): SetProfileFeeCall__Inputs {
    return new SetProfileFeeCall__Inputs(this);
  }

  get outputs(): SetProfileFeeCall__Outputs {
    return new SetProfileFeeCall__Outputs(this);
  }
}

export class SetProfileFeeCall__Inputs {
  _call: SetProfileFeeCall;

  constructor(call: SetProfileFeeCall) {
    this._call = call;
  }

  get _fee(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetProfileFeeCall__Outputs {
  _call: SetProfileFeeCall;

  constructor(call: SetProfileFeeCall) {
    this._call = call;
  }
}

export class SetPublicClaimCall extends ethereum.Call {
  get inputs(): SetPublicClaimCall__Inputs {
    return new SetPublicClaimCall__Inputs(this);
  }

  get outputs(): SetPublicClaimCall__Outputs {
    return new SetPublicClaimCall__Outputs(this);
  }
}

export class SetPublicClaimCall__Inputs {
  _call: SetPublicClaimCall;

  constructor(call: SetPublicClaimCall) {
    this._call = call;
  }

  get _val(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetPublicClaimCall__Outputs {
  _call: SetPublicClaimCall;

  constructor(call: SetPublicClaimCall) {
    this._call = call;
  }
}

export class SetStaticFeeCall extends ethereum.Call {
  get inputs(): SetStaticFeeCall__Inputs {
    return new SetStaticFeeCall__Inputs(this);
  }

  get outputs(): SetStaticFeeCall__Outputs {
    return new SetStaticFeeCall__Outputs(this);
  }
}

export class SetStaticFeeCall__Inputs {
  _call: SetStaticFeeCall;

  constructor(call: SetStaticFeeCall) {
    this._call = call;
  }

  get _rate(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetStaticFeeCall__Outputs {
  _call: SetStaticFeeCall;

  constructor(call: SetStaticFeeCall) {
    this._call = call;
  }
}

export class SubmitProfileBidCall extends ethereum.Call {
  get inputs(): SubmitProfileBidCall__Inputs {
    return new SubmitProfileBidCall__Inputs(this);
  }

  get outputs(): SubmitProfileBidCall__Outputs {
    return new SubmitProfileBidCall__Outputs(this);
  }
}

export class SubmitProfileBidCall__Inputs {
  _call: SubmitProfileBidCall;

  constructor(call: SubmitProfileBidCall) {
    this._call = call;
  }

  get _nftTokens(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _profileURI(): string {
    return this._call.inputValues[1].value.toString();
  }
}

export class SubmitProfileBidCall__Outputs {
  _call: SubmitProfileBidCall;

  constructor(call: SubmitProfileBidCall) {
    this._call = call;
  }
}

export class SubmitProfileBidWithPermitCall extends ethereum.Call {
  get inputs(): SubmitProfileBidWithPermitCall__Inputs {
    return new SubmitProfileBidWithPermitCall__Inputs(this);
  }

  get outputs(): SubmitProfileBidWithPermitCall__Outputs {
    return new SubmitProfileBidWithPermitCall__Outputs(this);
  }
}

export class SubmitProfileBidWithPermitCall__Inputs {
  _call: SubmitProfileBidWithPermitCall;

  constructor(call: SubmitProfileBidWithPermitCall) {
    this._call = call;
  }

  get _nftTokens(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _profileURI(): string {
    return this._call.inputValues[1].value.toString();
  }

  get v(): i32 {
    return this._call.inputValues[2].value.toI32();
  }

  get r(): Bytes {
    return this._call.inputValues[3].value.toBytes();
  }

  get s(): Bytes {
    return this._call.inputValues[4].value.toBytes();
  }
}

export class SubmitProfileBidWithPermitCall__Outputs {
  _call: SubmitProfileBidWithPermitCall;

  constructor(call: SubmitProfileBidWithPermitCall) {
    this._call = call;
  }
}

export class UpgradeToCall extends ethereum.Call {
  get inputs(): UpgradeToCall__Inputs {
    return new UpgradeToCall__Inputs(this);
  }

  get outputs(): UpgradeToCall__Outputs {
    return new UpgradeToCall__Outputs(this);
  }
}

export class UpgradeToCall__Inputs {
  _call: UpgradeToCall;

  constructor(call: UpgradeToCall) {
    this._call = call;
  }

  get newImplementation(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class UpgradeToCall__Outputs {
  _call: UpgradeToCall;

  constructor(call: UpgradeToCall) {
    this._call = call;
  }
}

export class UpgradeToAndCallCall extends ethereum.Call {
  get inputs(): UpgradeToAndCallCall__Inputs {
    return new UpgradeToAndCallCall__Inputs(this);
  }

  get outputs(): UpgradeToAndCallCall__Outputs {
    return new UpgradeToAndCallCall__Outputs(this);
  }
}

export class UpgradeToAndCallCall__Inputs {
  _call: UpgradeToAndCallCall;

  constructor(call: UpgradeToAndCallCall) {
    this._call = call;
  }

  get newImplementation(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get data(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }
}

export class UpgradeToAndCallCall__Outputs {
  _call: UpgradeToAndCallCall;

  constructor(call: UpgradeToAndCallCall) {
    this._call = call;
  }
}
