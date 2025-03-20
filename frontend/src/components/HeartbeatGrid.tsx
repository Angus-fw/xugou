import { Box, Flex, Text } from '@radix-ui/themes';
import { MonitorStatusHistory } from '../api/monitors';

// 心跳网格组件 - 类似uptime-kuma的点阵网格
const HeartbeatGrid = ({ status, uptime, history = [] }: { status: string, uptime: number, history?: (MonitorStatusHistory | string)[] }) => {
  // 根据状态确定颜色
  const getColor = (itemStatus: string) => {
    switch (itemStatus) {
      case 'up':
        return 'var(--green-5)';
      case 'down':
        return 'var(--red-5)';
      case 'unknown':
        return 'var(--gray-5)';
      default:
        return 'var(--gray-5)';
    }
  };

  // 根据状态确定悬停颜色
  const getHoverColor = (itemStatus: string) => {
    switch (itemStatus) {
      case 'up':
        return 'var(--green-6)';
      case 'down':
        return 'var(--red-6)';
      case 'unknown':
        return 'var(--gray-6)';
      default:
        return 'var(--gray-6)';
    }
  };

  // 转换timestamp为更易读的格式
  const formatTimestamp = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleString();
    } catch (e) {
      return timestamp;
    }
  };

  // 最多显示72个时间点
  const maxPoints = 72;
  
  // 准备显示数据
  let displayHistory: { status: string, timestamp?: string }[] = [];
  
  // 处理不同类型的历史数据
  if (Array.isArray(history)) {
    displayHistory = history.map(item => {
      if (typeof item === 'string') {
        return { status: item };
      }
      return item;
    });
  }
  
  // 如果记录不足，填充空白点
  let emptyBoxes: any[] = [];
  if (displayHistory.length < 24) {
    // 至少显示24个点，不足的用空白点补充
    emptyBoxes = Array.from({ length: 24 - displayHistory.length }, (_, i) => ({
      status: 'empty',
    }));
  }

  // 计算每行显示的点数
  const pointsPerRow = 24; // 每行24个点
  const rows = Math.ceil((displayHistory.length + emptyBoxes.length) / pointsPerRow);
  
  // 每个点的大小
  const pointSize = 12;
  const gap = 2;

  return (
    <Box>
      {/* 多行网格点 */}
      <Flex direction="column" gap={gap + "px"}>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <Flex key={rowIndex} gap={gap + "px"}>
            {displayHistory.slice(rowIndex * pointsPerRow, (rowIndex + 1) * pointsPerRow).map((item, index) => (
              <Box
                key={`${rowIndex}-${index}`}
                style={{
                  width: `${pointSize}px`,
                  height: `${pointSize}px`,
                  backgroundColor: getColor(item.status),
                  borderRadius: '50%',
                  transition: 'all 0.2s ease-in-out',
                  cursor: 'pointer',
                }}
                title={`${item.timestamp ? formatTimestamp(item.timestamp) : '未知时间'}: ${item.status === 'up' ? '正常' : '故障'}`}
                onMouseEnter={(e) => {
                  const target = e.currentTarget;
                  target.style.backgroundColor = getHoverColor(item.status);
                  target.style.transform = 'scale(1.2)';
                  target.style.boxShadow = '0 0 4px rgba(0, 0, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  const target = e.currentTarget;
                  target.style.backgroundColor = getColor(item.status);
                  target.style.transform = 'scale(1)';
                  target.style.boxShadow = 'none';
                }}
              />
            ))}
            
            {/* 该行补充空白点 */}
            {rowIndex === rows - 1 && emptyBoxes.map((_, index) => (
              <Box
                key={`empty-${index}`}
                style={{
                  width: `${pointSize}px`,
                  height: `${pointSize}px`,
                  backgroundColor: 'var(--gray-3)',
                  borderRadius: '50%',
                }}
              />
            ))}
          </Flex>
        ))}
      </Flex>
      
      <Flex justify="between" mt="3">
        <Text size="1" style={{ color: 'var(--gray-9)' }}>正常运行: {uptime}%</Text>
        <Flex gap="2" align="center">
          <Box style={{ width: '8px', height: '8px', backgroundColor: 'var(--green-5)', borderRadius: '50%' }} />
          <Text size="1" style={{ color: 'var(--gray-9)' }}>正常</Text>
          <Box style={{ width: '8px', height: '8px', backgroundColor: 'var(--red-5)', borderRadius: '50%', marginLeft: '8px' }} />
          <Text size="1" style={{ color: 'var(--gray-9)' }}>故障</Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default HeartbeatGrid; 