import React, { Image, ScrollView, View } from "@vnxjs/components";
import classNames from "classnames";
import { ReactNode, useEffect } from "react";
import { appPrefixClassname } from "../../styles/prefix";
import "./page.scss";
import { SafeArea } from "@vnmfify/core";
import Target from "./target";
import images from "../../res/images";
import { _global } from "../../global";

interface PageProps {
  canBack?: boolean;
  ignoreTopSafeArea?: boolean;
  className?: string;
  title?: string;
  children: ReactNode;
  backgroundImage?: boolean;
}

export default function Page(props: PageProps) {
  const { className, children, ignoreTopSafeArea } = props;

  return (
    <Target type="h5">
      <View className={classNames(appPrefixClassname("page"), className)}>
        {/* <View className={appPrefixClassname("page__content")}> */}
        {ignoreTopSafeArea != true && (
          <View
            style={`width:100vw;height:${_global.deviceInfo.safeAreaTop}px`}
          />
        )}
        {children}
        <SafeArea position="bottom" />
        {/* </View> */}
      </View>
    </Target>
  );
}
