import { FixedView } from "@vnmfify/core";
import { View, Image, Text } from "@vnxjs/components";
import React, { useEffect, useState } from "react";
import images from "../../res/images";
import "./index.scss";
import { _global } from "../../global";
import _router from "../../router";

interface HeaderProps {
  leftItemAction?: () => void;
  title: string;
  topSubTitle?: string;
  bottomSubtitle?: string;
  rightItem?: React.ReactNode;
  type?: "color" | "white";
  cornerRadiusHeader?: string | undefined;
}

const BHeader: React.FC<HeaderProps> = ({
  leftItemAction,
  title,
  topSubTitle,
  bottomSubtitle,
  rightItem,
  type,
  cornerRadiusHeader,
}) => {
  const _onClickLeft = () => {
    leftItemAction ? leftItemAction() : _router._goBack();
  };

  return (
    <FixedView
      position="top"
      className="header-fixed-container"
      style={`height:${(type === "white" ? 56 : 80) +
        _global.deviceInfo.safeAreaTop}px;${type === "white" &&
        "background-color:white"};
        ${(cornerRadiusHeader ?? "").length > 0 &&
          `border-radius:${cornerRadiusHeader} ${cornerRadiusHeader} 0px 0px`}`}
    >
      <View
        className="header-container"
        style={`
          padding-top:${_global.deviceInfo.safeAreaTop}px;
          height: 56px;
          margin-right: ${
            !_global.deviceInfo.sdk_version.startsWith("1.0") ? "100px" : "0px"
          };
        `}
      >
        <View className="left-container">
          <Image
            src={type === "white" ? images.ic_back_black : images.ic_back}
            mode="aspectFit"
            className="header-back-image"
            onClick={_onClickLeft}
          />
          <View className="title-container">
            {topSubTitle !== undefined && (
              <Text
                className="subtitle-text"
                style={`${type === "white" && "color:black"}`}
              >
                {topSubTitle}
              </Text>
            )}
            <Text
              className="title-text"
              style={`${type === "white" && "color:black"}`}
            >
              {title}
            </Text>
            {bottomSubtitle !== undefined && (
              <Text
                className="subtitle-text"
                style={`${type === "white" && "color:black"}`}
              >
                {bottomSubtitle}
              </Text>
            )}
          </View>
        </View>
        {rightItem}
      </View>

      {type !== "white" && (
        <View
          className="view-border-radius-header"
          style="height:24px;border-radius:24px 24px 0 0;background-color:white;"
        />
      )}
    </FixedView>
  );
};

export default BHeader;
