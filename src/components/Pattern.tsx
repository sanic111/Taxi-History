import React, { forwardRef, useState, useRef } from "react";
import "./Pattern.scss";
import { View } from "@vnxjs/components";

interface Props {}
export type PatternRef = {};

const Pattern = (props: Props, ref: React.ForwardedRef<PatternRef>) => {
  React.useImperativeHandle(ref, (): PatternRef => ({}));

  return <></>;
};

export default forwardRef(Pattern);

type RefFuncRef = {};

const RefFunc = forwardRef((props: {}, ref: React.ForwardedRef<RefFuncRef>) => {
  React.useImperativeHandle(ref, (): RefFuncRef => ({}));

  return <View className=""></View>;
});
