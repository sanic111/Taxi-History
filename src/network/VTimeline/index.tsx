import { Timeline } from "@vnmfify/core";
import { View, Text } from "@vnxjs/components";
import classNames from "classnames";
import { appPrefixClassname } from "../../styles/prefix";
import "./index.scss";
import { FireOutlined, StarOutlined, GemOutlined, SmileOutlined } from "@vnmfify/icons";

interface VTimelineProps {
  className?: string;
  items: {
    title: string;
    content?: string;
    time?: string;
  }[];
}

export default function VTimeline(props: VTimelineProps) {

  return (
    <Timeline position="alternate">
      <Timeline.Item>Eat</Timeline.Item>
      <Timeline.Item>Code</Timeline.Item>
      <Timeline.Item>Sleep</Timeline.Item>
      <Timeline.Item>Repeat</Timeline.Item>
    </Timeline>
  )
}