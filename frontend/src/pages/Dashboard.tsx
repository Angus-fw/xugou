import { useState, useEffect } from 'react';
import { Box, Flex, Heading, Text, Grid, Button, Container, Theme } from '@radix-ui/themes';
import { CheckCircledIcon, CrossCircledIcon, ClockIcon, GlobeIcon, ExclamationTriangleIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';
import { getAllMonitors, Monitor } from '../api/monitors';
import { getAllAgents, Agent } from '../api/agents';
import StatusSummaryCard from '../components/StatusSummaryCard';
import MonitorCard from '../components/MonitorCard';
import AgentCard from '../components/AgentCard';
import '../styles/components.css';

const Dashboard = () => {
  const [monitors, setMonitors] = useState<Monitor[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 获取所有数据
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // 同时获取监控和客户端数据
        const [monitorsResponse, agentsResponse] = await Promise.all([
          getAllMonitors(),
          getAllAgents()
        ]);
        
        // 处理监控数据
        if (monitorsResponse.success && monitorsResponse.monitors) {
          setMonitors(monitorsResponse.monitors);
        } else {
          console.error('获取监控数据失败:', monitorsResponse.message);
        }
        
        // 处理客户端数据
        if (agentsResponse.success && agentsResponse.agents) {
          console.log('获取到客户端列表:', agentsResponse.agents);
          setAgents(agentsResponse.agents);
        } else {
          console.error('获取客户端数据失败:', agentsResponse.message);
        }
      } catch (err) {
        console.error('获取数据错误:', err);
        setError('获取数据失败');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    // 设置定时器，每分钟刷新一次数据
    const intervalId = setInterval(() => {
      console.log('Dashboard: 自动刷新数据...');
      fetchData();
    }, 60000); // 60000ms = 1分钟
    
    // 组件卸载时清除定时器
    return () => clearInterval(intervalId);
  }, []);

  // 加载中显示
  if (loading) {
    return (
      <Box className="dashboard-container">
        <Container size="3">
          <Flex justify="center" align="center" style={{ minHeight: '50vh' }}>
            <Text size="3">加载中...</Text>
          </Flex>
        </Container>
      </Box>
    );
  }

  // 错误显示
  if (error) {
    return (
      <Box className="dashboard-container">
        <Container size="3">
          <Flex justify="center" align="center" style={{ minHeight: '50vh' }}>
            <Flex direction="column" align="center" gap="3">
              <Text size="3" style={{ color: 'var(--red-9)' }}>{error}</Text>
              <Button variant="soft" onClick={() => window.location.reload()}>
                重试
              </Button>
            </Flex>
          </Flex>
        </Container>
      </Box>
    );
  }

  // 准备API监控状态摘要数据
  const apiMonitorItems = [
    {
      icon: <CheckCircledIcon width="16" height="16" />,
      label: '正常运行',
      value: monitors.filter(m => m.status === 'up').length,
      bgColor: 'var(--green-3)',
      iconColor: 'var(--green-9)'
    },
    {
      icon: <CrossCircledIcon width="16" height="16" />,
      label: '服务中断',
      value: monitors.filter(m => m.status === 'down').length,
      bgColor: 'var(--red-3)',
      iconColor: 'var(--red-9)'
    },
    {
      icon: <ClockIcon width="16" height="16" />,
      label: '总计监控',
      value: monitors.length,
      bgColor: 'var(--gray-3)',
      iconColor: 'var(--gray-9)'
    }
  ];

  // 准备客户端状态摘要数据
  const agentStatusItems = [
    {
      icon: <GlobeIcon width="16" height="16" />,
      label: '客户端活跃',
      value: agents.filter(a => a.status === 'active').length,
      bgColor: 'var(--green-3)',
      iconColor: 'var(--green-9)'
    },
    {
      icon: <ExclamationTriangleIcon width="16" height="16" />,
      label: '客户端离线',
      value: agents.filter(a => a.status === 'inactive').length,
      bgColor: 'var(--amber-3)',
      iconColor: 'var(--amber-9)'
    },
    {
      icon: <GlobeIcon width="16" height="16" />,
      label: '总计客户端',
      value: agents.length,
      bgColor: 'var(--gray-3)',
      iconColor: 'var(--gray-9)'
    }
  ];

  return (
    <Theme appearance="light" accentColor="blue">
      <Box className="dashboard-container">
        <Container size="3" py="5">
          <Box>
            {/* 状态摘要 */}
            <Box pb="6">
              <Heading size="6" mb="5">系统状态摘要</Heading>
              
              <Flex gap="4" justify="between" direction={{ initial: 'column', sm: 'row' }} style={{ width: '100%' }}>
                {/* API监控状态摘要 */}
                <Box style={{ flex: 1 }}>
                  <StatusSummaryCard title="API监控状态" items={apiMonitorItems} />
                </Box>
                
                {/* 客户端监控状态摘要 */}
                <Box style={{ flex: 1 }}>
                  <StatusSummaryCard title="客户端监控状态" items={agentStatusItems} />
                </Box>
              </Flex>
            </Box>
            
            {/* API监控状态 */}
            <Box py="5">
              <Flex justify="between" align="center" mb="4">
                <Heading size="5">API监控状态</Heading>
                <Button variant="soft" asChild>
                  <Link to="/monitors">查看所有API监控</Link>
                </Button>
              </Flex>
              <Grid columns={{ initial: '1', sm: '2', lg: '3' }} gap="4">
                {monitors.slice(0, 3).map(monitor => (
                  <MonitorCard key={monitor.id} monitor={monitor} />
                ))}
              </Grid>
            </Box>
            
            {/* 客户端状态 */}
            <Box py="5">
              <Flex justify="between" align="center" mb="4">
                <Heading size="5">客户端状态</Heading>
                <Button variant="soft" asChild>
                  <Link to="/agents">查看所有客户端</Link>
                </Button>
              </Flex>
              <Grid columns={{ initial: '1', sm: '2', lg: '3' }} gap="4">
                {agents.slice(0, 3).map((agent) => (
                  <AgentCard key={agent.id} agent={agent} />
                ))}
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
    </Theme>
  );
};

export default Dashboard; 