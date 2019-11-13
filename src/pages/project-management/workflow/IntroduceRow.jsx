import { Col, Icon, Row, Tooltip, Statistic, Card, Progress } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import React from 'react';
import { ChartCard } from './Charts';

const topColResponsiveProps = {
  xs: 24,
  sm: 21,
  md: 12,
  lg: 21,
  xl: 6,
  style: {
    marginBottom: 24,
  },
};

const IntroduceRow = ({ loading }) => (
  <Row gutter={24} type="flex">
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title="安全检验状况"
        action={
          <Tooltip title="安全检验状况">
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        loading={loading}
        contentHeight={110}
      >
        <span
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 28,
            color: 'green',
          }}
        >
          <Icon type="smile" style={{ marginRight: 10 }} />
          合格
        </span>
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        style={{
          border: '1px dashed red',
        }}
        loading={loading}
        bordered
        title="考勤"
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
        <Row type="flex" justify="space-around">
          <Col span={12}>
            <Card bordered={false}>
              <Statistic
                title="定员"
                bordered={false}
                value={16}
                precision={0}
                valueStyle={{ color: '#3DCD58' }}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card bordered={false}>
              <Statistic title="到岗" value={13} valueStyle={{ color: '#cf1322' }} />
            </Card>
          </Col>
        </Row>
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        loading={loading}
        bordered={false}
        title="质量"
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
        <Row type="flex" justify="space-around">
          <Col span={12}>
            <Card bordered={false} bodyStyle={{ padding: '24px 12px' }}>
              <Statistic
                title="检验及时率"
                bordered={false}
                value="86%"
                precision={0}
                valueStyle={{ color: '#3DCD58' }}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card bordered={false} bodyStyle={{ padding: '24px 12px' }}>
              <Statistic title="一次合格率" value="92%" valueStyle={{ color: '#3DCD58' }} />
            </Card>
          </Col>
        </Row>
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        loading={loading}
        bordered={false}
        title="效率"
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
        <Row type="flex" justify="space-around">
          <Col span={12}>
            <Card bordered={false}>
              <Statistic
                title="KE"
                bordered={false}
                value="80%"
                precision={0}
                valueStyle={{ color: '#3DCD58' }}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card bordered={false}>
              <Statistic title="OEE" value="50%" valueStyle={{ color: 'red' }} />
            </Card>
          </Col>
        </Row>
      </ChartCard>
    </Col>
  </Row>
);

export default IntroduceRow;
