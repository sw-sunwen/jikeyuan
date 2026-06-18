import {useEffect, useState} from "react";
import {getChannelApi} from "@/apis/article";

export function useChannel() {
  // 频道列表
  const [channelList, setChannelList] = useState([])
  useEffect(() => {
    const getChannelList = async () => {
      const result = await getChannelApi(); // 获取频道列表
      setChannelList(result.data.channels) // 设置频道列表状态
    }
    getChannelList()
  }, []);
  return {
    channelList
  }
}
