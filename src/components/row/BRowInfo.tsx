import React, { forwardRef, useState, useRef } from "react";
import "./BRowInfo.scss";
import { Text, View } from "@vnxjs/components";

interface Props {
  item: BRowInfoItemType;
}
export type BRowInfoRef = {};

export type BRowInfoItemType = {
  title: string;
  value: string;
  styleTitle?: string;
  styleValue?: string;
  onClickValue?: () => void;
};

const BRowInfo = (props: Props, ref: React.ForwardedRef<BRowInfoRef>) => {
  React.useImperativeHandle(ref, (): BRowInfoRef => ({}));
  const _onClickValue = () => {
    props.item.onClickValue && props.item.onClickValue();
  };

  return (
    <View className="brow-info-container">
      <Text className="brow-info-text-title" style={props.item.styleTitle}>
        {props.item.title}
      </Text>
      <Text
        className="brow-info-text-value"
        style={props.item.styleValue}
        onClick={_onClickValue}
      >
        {props.item.value}
      </Text>
    </View>
  );
};

export default forwardRef(BRowInfo);
