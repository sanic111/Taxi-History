import { Text, View, Image } from "@vnxjs/components";
import React, { forwardRef, useState, useRef, useEffect } from "react";
import "./HorizontalList.scss";

interface Props {
  className?: string;
  classNameItem?: string;
  data: any[];
  renderItem: (item: any, index: number) => React.ReactNode;
}
export type HorizontalListRef = {};

const HorizontalList = (
  props: Props,
  ref: React.ForwardedRef<HorizontalListRef>
) => {
  React.useImperativeHandle(ref, (): HorizontalListRef => ({}));

  useEffect(() => {}, []);

  const _renderItem = (item: any, index: number) => {
    return (
      <li className={`base-item-list ${props.classNameItem}`}>
        {props.renderItem && props.renderItem(item, index)}
      </li>
    );
  };

  return (
    <ul className={`base-horizontal-list ${props.className}`}>
      {props.data.map((e, index) => _renderItem(e, index))}
    </ul>
  );
};

export default forwardRef(HorizontalList);
