import { Progress, Card, Icon, Steps, Table } from 'antd';
import { GridContent, PageHeaderWrapper, RouteContext } from '@ant-design/pro-layout';
import React, { Component } from 'react';
import { connect } from 'dva';
import IntroduceRow from './IntroduceRow';
import styles from './style.less';

const { Step } = Steps;

const columns = [
  {
    title: '项目',
    dataIndex: 'projectName',
    key: 'projectName',
  },
  {
    title: '数量',
    dataIndex: 'number',
    key: 'number',
  },
  {
    title: '进度',
    dataIndex: 'progress',
    key: 'progress',
    render: value => <Progress active percent={value} size="smal" />,
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  },
  {
    title: '备注',
    dataIndex: 'memo',
    key: 'memo',
  },
];

const workflowSteps = [
  {
    key: 0,
    title: '钣金',
    icon: 'radius-upright',
  },
  {
    key: 1,
    title: '框架',
    icon: 'gateway',
  },
  {
    key: 2,
    title: '铜排',
    icon: 'build',
  },
  {
    key: 3,
    title: '一次',
    icon: 'number',
  },
  {
    key: 4,
    title: '二次',
    icon: 'table',
  },
  {
    key: 5,
    title: '测试',
    icon: 'security-scan',
  },
  {
    key: 6,
    title: '包装',
    icon: 'code-sandbox',
  },
];

@connect(({ projectWorkflow, loading }) => ({
  projectWorkflow,
  loading: loading.effects['projectWorkflow/fetchAdvanced'],
}))
class Advanced extends Component {
  state = {
    currentStep: 0,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'projectWorkflow/fetchAdvanced',
    });
  }

  onStepChange = currentStep => {
    this.setState({ currentStep });
  };

  render() {
    const { projectWorkflow, loading } = this.props;
    const { advancedOperation1 } = projectWorkflow;

    return (
      <PageHeaderWrapper className={styles.pageHeader}>
        <div className={styles.main}>
          <GridContent>
            <Card
              style={{
                marginBottom: 10,
              }}
            >
              <RouteContext.Consumer>
                {({ isMobile }) => (
                  <Steps
                    size="small"
                    direction={isMobile ? 'vertical' : 'horizontal'}
                    type="navigation"
                    current={this.state.currentStep}
                    onChange={this.onStepChange}
                  >
                    {workflowSteps.map(step => (
                      <Step
                        key={step.key}
                        icon={<Icon type={step.icon} />}
                        status={this.state.currentStep === step.key ? 'process' : 'wait'}
                        title={step.title}
                      />
                    ))}
                  </Steps>
                )}
              </RouteContext.Consumer>
            </Card>
            <IntroduceRow loading={false} />
            <Card className={styles.tabsCard} bordered={false}>
              <Table
                pagination={false}
                loading={loading}
                dataSource={advancedOperation1}
                columns={columns}
              />
            </Card>
          </GridContent>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Advanced;
