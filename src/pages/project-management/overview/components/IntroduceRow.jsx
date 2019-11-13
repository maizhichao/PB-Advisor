import { Col, Icon, Row, Tooltip, Statistic, Card, Progress } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import React from 'react';
import { ChartCard } from './Charts';
import Trend from './Trend';
import styles from '../style.less';

const topColResponsiveProps = {
  xs: 24,
  sm: 16,
  md: 16,
  lg: 16,
  xl: 8,
  style: {
    marginBottom: 24,
  },
};

const IntroduceRow = ({ loading }) => (
  <Row gutter={24} type="flex">
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title="项目总数"
        action={
          <Tooltip title="未开始或正在执行中的项目总数">
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        loading={loading}
        total={() => 89}
        contentHeight={77.6}
      >
        <Row gutter={24} type="flex">
          <Col span={8}>
            <Statistic title="生产" value={56} valueStyle={{ color: '#3DCD58' }} />
          </Col>
          <Col span={8}>
            <Statistic title="待生产" value={8} />
          </Col>
          <Col span={8}>
            <Statistic title="异常" value={2} valueStyle={{ color: '#cf1322' }} />
          </Col>
        </Row>
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        loading={loading}
        bordered={false}
        title="月订单完成度"
        action={
          <Tooltip
            title={
              <FormattedMessage
                id="projectOverview.analysis.introduce"
                defaultMessage="Introduce"
              />
            }
          >
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        total="78%"
        footer={
          <div
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
          >
            <Trend
              flag="up"
              style={{
                marginRight: 16,
              }}
            >
              月同比
              <span className={styles.trendText}>12%</span>
            </Trend>
          </div>
        }
        contentHeight={46}
      >
        <Progress percent={78} status="active" strokeWidth={12} />
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        loading={loading}
        bordered={false}
        title="本月资源使用"
        action={
          <Tooltip
            title={
              <FormattedMessage
                id="projectOverview.analysis.introduce"
                defaultMessage="Introduce"
              />
            }
          >
            <Icon type="info-circle-o" />
          </Tooltip>
        }
      >
        <Row type="flex" justify="space-around" style={{ paddingTop: 10 }}>
          <Col span={12}>
            <Card bordered={false}>
              <Statistic
                title="人员"
                bordered={false}
                value={16}
                precision={0}
                valueStyle={{ color: '#3DCD58' }}
                suffix="/18人"
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card bordered={false}>
              <Statistic
                title="生产成本"
                value={37.28}
                precision={2}
                valueStyle={{ color: '#cf1322' }}
                suffix="万"
              />
            </Card>
          </Col>
        </Row>
      </ChartCard>
    </Col>
  </Row>
);

export default IntroduceRow;
