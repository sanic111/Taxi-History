import React from "react";
import { View } from "@vnxjs/components";
import classNames from "classnames";
import "./index.scss";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function sectionWrapper({ children, className }: SectionWrapperProps) {
  return (
    <View className={classNames("section-wrapper", className)}>
      {children}
    </View>
  );
}
