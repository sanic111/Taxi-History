import React from "react";
import {View, Text, Image} from "@vnxjs/components";
import classNames from "classnames";
import "./TripHistoryCard.scss";
import {BookingHistoryType} from "../../network/Type";

export interface TripHistoryCardProps {
    data: BookingHistoryType;
    statusLabel?: string;
    statusType?: "success" | "warning" | "cancel";
    onRepeat?: () => void;
    onInvoice?: () => void;
}

const statusMap = {
    success: {label: "Thành công", className: "status-success"},
    warning: {label: "Đặt xe hiện tại", className: "status-warning"},
    cancel: {label: "Đã huỷ", className: "status-cancel"},
};

const TripHistoryCard: React.FC<TripHistoryCardProps> = ({
    data,
    statusLabel,
    statusType = "success",
    onRepeat,
    onInvoice,
}) => {
    const status = statusMap[statusType] || statusMap.success;
    return (
        <View className="trip-history-card">
            <View className="trip-header">
                <Image src={data.logo} className="trip-logo" mode="aspectFit" />
                <View className="trip-amount-block">
                    <Text className="trip-amount">{data.amount?.toLocaleString()} đ</Text>
                    <View className={classNames("trip-status", status.className)}>{statusLabel || status.label}</View>
                </View>
                <Text className="trip-date">{data.reqDate}</Text>
            </View>
            <View className="trip-body">
                {/* Địa điểm xuất phát */}
                <View className="trip-point trip-point-from">
                    <Text className="trip-point-label">{data.payCode}</Text>
                </View>
                {/* Địa điểm đến (giả lập nhiều điểm nếu cần) */}
                <View className="trip-point trip-point-to">
                    <Text className="trip-point-label">{data.addonType}</Text>
                </View>
            </View>
            <View className="trip-footer">
                {onInvoice && (
                    <Text className="trip-invoice" onClick={onInvoice}>
                        Đã gửi yêu cầu xuất hóa đơn
                    </Text>
                )}
                {onRepeat && (
                    <Text className="trip-repeat" onClick={onRepeat}>
                        Đặt lại
                    </Text>
                )}
            </View>
        </View>
    );
};

export default TripHistoryCard;
