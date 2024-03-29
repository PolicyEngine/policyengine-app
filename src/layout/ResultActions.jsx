// This component enables the user to download or share the results generated by
// PolicyEngine by showing the following sequence of buttons with appropriate
// icons:
// - Download the chart as a png file
// - Download the data as a csv file
// - Copy the link for the result
// - Share the result on Twitter
// - Share the result on Facebook
// - Share the result on LinkedIn

import style from "../style";

import { Button, Tooltip } from "antd";
import {
  TwitterOutlined,
  FacebookFilled,
  LinkedinFilled,
  LinkOutlined,
  FileImageOutlined,
  FileTextOutlined,
  PrinterFilled,
} from "@ant-design/icons";
import React from "react";

/**
 *
 * @param {object} props
 * @param {function} props.downloadPng callback for download png button
 * @param {function} props.downloadCsv callback for download csv button
 * @param {function} props.copyLink callback for copy link button
 * @param {string} props.twitterLink link for twitter button
 * @param {string} props.facebookLink link for facebook button
 * @param {string} props.linkedInLink link for linkedin button
 * @param {string} props.print callback for print button
 *
 * @returns
 */
export default function ResultActions(props) {
  const {
    downloadPng,
    downloadCsv,
    copyLink,
    twitterLink,
    facebookLink,
    linkedInLink,
    print,
  } = props;
  const iconStyle = { fontSize: 20 };
  const btnSize = "small";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: style.colors.WHITE,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 40,
        gap: 5,
      }}
    >
      {downloadPng && (
        <Tooltip title="Download the result as a png file">
          <Button
            type="text"
            size={btnSize}
            icon={<FileImageOutlined style={iconStyle} />}
            onClick={downloadPng}
          />
        </Tooltip>
      )}
      {downloadCsv && (
        <Tooltip title="Download the data as a csv file">
          <Button
            type="text"
            size={btnSize}
            icon={<FileTextOutlined style={iconStyle} />}
            onClick={downloadCsv}
          />
        </Tooltip>
      )}
      <Tooltip title="Copy the link for the result">
        <Button
          type="text"
          size={btnSize}
          icon={<LinkOutlined style={iconStyle} />}
          onClick={copyLink}
        />
      </Tooltip>
      <Tooltip title="Share the result on Twitter">
        <Button
          type="link"
          size={btnSize}
          icon={<TwitterOutlined style={iconStyle} />}
          href={twitterLink}
        />
      </Tooltip>
      <Tooltip title="Share the result on Facebook">
        <Button
          type="link"
          size={btnSize}
          icon={<FacebookFilled style={iconStyle} />}
          href={facebookLink}
        />
      </Tooltip>
      <Tooltip title="Share the result on LinkedIn">
        <Button
          type="link"
          size={btnSize}
          icon={<LinkedinFilled style={iconStyle} />}
          href={linkedInLink}
        />
      </Tooltip>
      {print && (
        <Tooltip title="Print the result">
          <Button
            type="text"
            size={btnSize}
            icon={<PrinterFilled style={iconStyle} />}
            onClick={print}
          />
        </Tooltip>
      )}
    </div>
  );
}
