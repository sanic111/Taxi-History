import { SDKLoadingRef } from "./components/loading";
import { SDKAlertRef } from "./components/alert";
import React from "react";
import { VNPSDKEmit } from "vnpay-sdk-core-mini-app";
import moment from "moment";
import strings from "./res/strings";
import countdown from "@vnmfify/core/countdown";

type VNPSDKEmitComponentType =
  | "HOME_SCREEN"
  | "COMFIRM_ORDER_SCREEN"
  | "FILL_USERINFO_SCREEN";
type VNPSDKEmitKeyType =
  | "EMIT_CHANGE_DATE"
  | "EMIT_CHANGE_LIST_HOME"
  | "UPDATE_LIST_VOUCHER"
  | "UPDATE_ITEM_VOUCHER"
  | "UNHOLD_TEE_N_CADDIE";

export const _global = {
  screen: {},
  event: {
    loading: React.createRef<SDKLoadingRef>(),
    alert: React.createRef<SDKAlertRef>(),
    emit: new VNPSDKEmit.default<VNPSDKEmitComponentType, VNPSDKEmitKeyType>(
      true
    ),
  },
  deviceInfo: {
    safeAreaTop: 0,
    safeAreaBottom: 0,
    screenWidth: 0,
    screenHeight: 0,
    sdk_version: "1.0.0",
  },
  appInfo: {
    language: "vi",
    currentTabUrl: "pages/home/HomeScreen",
    fullname: "",
    email: "",
    phone: "",
    styleCode: "",
    bankCode: "",
    token: "",
    rawData: undefined,
    dataEncrypted: "",
    hotline: "",
  },
  item: {},
};

export class SDK_GOLF_STORAGE_FIELDS {
  public static SDK_GOLF_RECENT_SEEN =
    "VTrmp5rk12PibedVngSEP59hGYsNWwDxt5Dp3x39";
}
