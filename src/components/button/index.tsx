import { FixedView, SafeArea, Tabbar } from "@vnmfify/core";
import Target from "../target";
import Vnmf from "@vnxjs/vnmf";
import "./index.scss";
import images from "../../res/images";
import classNames from "classnames";
import { ReactNode } from "react";
import { appPrefixClassname } from "../../styles/prefix";
import { View, Text, Image, ITouchEvent } from "@vnxjs/components";

interface BButtonProps {
  className?: string;
  title?: string;
  image?: string;
  type?: "gradient" | "border";
  onClick?: () => void;
  style?: string;
}

export default function BButton(props: BButtonProps) {
  const { className, title, image, type, onClick } = props;
  return (
    <Target type="h5">
      <View
        className={`${appPrefixClassname(
          "button"
        )} ${className} ${appPrefixClassname("button")}-${type}`}
        onClick={(event: ITouchEvent) => {
          event.stopPropagation();
          onClick && onClick();
        }}
        style={props.style}
      >
        {image !== undefined ? (
          <Image src={image} className={"image-button"} mode="aspectFill" />
        ) : (
          <Text className="title-button">{title}</Text>
        )}
      </View>
    </Target>
  );
}
