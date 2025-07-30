import { Popup, Tabs } from "@vnmfify/core";
import React, { forwardRef, useState, useRef, useEffect } from "react";
import "./BPopup.scss";
import { Image, Text, View } from "@vnxjs/components";
import strings from "../../res/strings";
import images from "../../res/images";

interface Props {
  children?: React.ReactNode;
  visible: boolean;
  onHide: () => void;
  styleHeader?: string;
  title?: string;
  rightIcon?: string;
  leftIcon?: string;

  onLeftClick?: () => void;
  onRightClick?: () => void;
}
export type BPopupRef = {};

const BPopup = (props: Props, ref: React.ForwardedRef<BPopupRef>) => {
  React.useImperativeHandle(ref, (): BPopupRef => ({}));

  return (
    <Popup
      open={props.visible}
      placement="bottom"
      onClose={props.onHide}
      className={"base-popup-container"}
    >
      <View className="view-header-base-popup" style={props.styleHeader}>
        <View className="row-header-base-popup">
          <Text className="title-base-popup">{props.title}</Text>
        </View>
        <Image
          src={props.rightIcon ?? images.ic_close}
          className="icon-right-header-base-popup"
          mode="aspectFill"
          onClick={props.onRightClick ?? props.onHide}
        />
        {props.leftIcon && (
          <Image
            src={props.leftIcon}
            className="icon-left-header-base-popup"
            mode="aspectFill"
            onClick={props.onLeftClick}
          />
        )}
      </View>
      {props.children}
    </Popup>
  );
};

export default forwardRef(BPopup);
