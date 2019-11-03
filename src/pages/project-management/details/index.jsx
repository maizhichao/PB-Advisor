import {
  Badge,
  Button,
  Card,
  Statistic,
  Descriptions,
  Dropdown,
  Icon,
  Menu,
  Popover,
  Steps,
  Table,
  Tag,
} from 'antd';
import { GridContent, PageHeaderWrapper, RouteContext } from '@ant-design/pro-layout';
import React, { Component, Fragment } from 'react';
import classNames from 'classnames';
import { connect } from 'dva';
import styles from './style.less';

const { Step } = Steps;
const menu = (
  <Menu>
    <Menu.Item key="1">编辑</Menu.Item>
    <Menu.Item key="2">删除</Menu.Item>
  </Menu>
);
const mobileMenu = (
  <Menu>
    <Menu.Item key="1">操作一</Menu.Item>
    <Menu.Item key="2">操作二</Menu.Item>
    <Menu.Item key="3">选项一</Menu.Item>
    <Menu.Item key="4">选项二</Menu.Item>
    <Menu.Item key="">选项三</Menu.Item>
  </Menu>
);
const action = (
  <RouteContext.Consumer>
    {({ isMobile }) => {
      if (isMobile) {
        return (
          <Dropdown.Button
            type="primary"
            icon={<Icon type="down" />}
            overlay={mobileMenu}
            placement="bottomRight"
          >
            主操作
          </Dropdown.Button>
        );
      }

      return (
        <Fragment>
          <Dropdown overlay={menu} placement="bottomRight">
            <Button>
              <Icon type="ellipsis" />
            </Button>
          </Dropdown>
        </Fragment>
      );
    }}
  </RouteContext.Consumer>
);
const extra = (
  <div className={styles.moreInfo}>
    <Statistic title="总进度" value={23} valueStyle={{ color: 'red' }} suffix="%" />
    <Statistic title="交付状态" value="延期" valueStyle={{ color: 'brown' }} />
  </div>
);
const description = (
  <RouteContext.Consumer>
    {({ isMobile }) => (
      <Descriptions className={styles.headerList} size="small" column={isMobile ? 1 : 2}>
        <Descriptions.Item label="负责人">刘尊义</Descriptions.Item>
        <Descriptions.Item label="客户">普锐斯玛</Descriptions.Item>
        <Descriptions.Item label="创建时间">2019-09-15</Descriptions.Item>
        <Descriptions.Item label="项目编号">
          <a href="">WJ12421</a>
        </Descriptions.Item>
        <Descriptions.Item label="计划交付日期">2019-12-01</Descriptions.Item>
        <Descriptions.Item label="预计交付日期">2020-01-01 ~ 2020-01-07</Descriptions.Item>
      </Descriptions>
    )}
  </RouteContext.Consumer>
);
const creationDesc = (
  <div className={classNames(styles.textSecondary, styles.stepDescription)}>
    <Fragment>
      孙一格
      <Icon
        type="dingding-o"
        style={{
          marginLeft: 8,
        }}
      />
    </Fragment>
    <div>2019-10-12 12:32</div>
  </div>
);
const designDesc = (
  <div className={classNames(styles.textSecondary, styles.stepDescription)}>
    <Fragment>
      杨勇
      <Icon
        type="dingding-o"
        style={{
          marginLeft: 8,
        }}
      />
      <div>2019-10-15 12:32</div>
    </Fragment>
  </div>
);
const purchaseDesc = (
  <div className={styles.stepDescription}>
    <Fragment>
      王宇
      <Icon
        type="dingding-o"
        style={{
          color: '#00A0E9',
          marginLeft: 8,
        }}
      />
    </Fragment>
    <div>
      <a href="">通知元件到货</a>
    </div>
  </div>
);
const popoverContent = (
  <div
    style={{
      width: 260,
    }}
  >
    生产延迟
    <span
      className={styles.textSecondary}
      style={{
        float: 'right',
      }}
    >
      <Badge
        status="default"
        text={
          <span
            style={{
              color: 'red',
            }}
          >
            设备故障排查中
          </span>
        }
      />
    </span>
    <div
      className={styles.textSecondary}
      style={{
        marginTop: 4,
      }}
    >
      耗时：2小时25分钟
    </div>
  </div>
);
const produceDesc = (
  <Popover placement="topLeft" arrowPointAtCenter content={popoverContent}>
    <div className={styles.stepDescription}>
      <Fragment>
        书博
        <Icon
          type="dingding-o"
          style={{
            color: '#00A0E9',
            marginLeft: 8,
          }}
        />
      </Fragment>
      <div>
        <a href="">查看生产进度</a>
      </div>
    </div>
  </Popover>
);

const operationTabList = [
  {
    key: 'tab1',
    tab: '设计',
  },
  {
    key: 'tab2',
    tab: '采购',
  },
  {
    key: 'tab3',
    tab: <Badge dot>生产 </Badge>,
  },
  {
    key: 'tab4',
    tab: '完成',
  },
];
const columns = [
  {
    title: '工序',
    dataIndex: 'type',
    key: 'type',
    render: text => <Tag>{text}</Tag>,
  },
  {
    title: '在生产件数',
    dataIndex: 'number',
    key: 'number',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: text => {
      if (text === 'normal') {
        return <Badge status="success" text="正常" />;
      }

      return <Badge status="error" text="异常" />;
    },
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

@connect(({ projectDetails, loading }) => ({
  projectDetails,
  loading: loading.effects['projectDetails/fetchAdvanced'],
}))
class Advanced extends Component {
  state = {
    operationKey: 'tab3',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'projectDetails/fetchAdvanced',
    });
  }

  onOperationTabChange = key => {
    this.setState({
      operationKey: key,
    });
  };

  render() {
    const { operationKey } = this.state;
    const { projectDetails, loading } = this.props;
    const { advancedOperation1 } = projectDetails;
    const contentList = {
      tab1: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={advancedOperation1}
          columns={columns}
        />
      ),
      tab2: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={advancedOperation1}
          columns={columns}
        />
      ),
      tab3: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={advancedOperation1}
          columns={columns}
        />
      ),
      tab4: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={advancedOperation1}
          columns={columns}
        />
      ),
    };
    return (
      <PageHeaderWrapper
        title="名称：普锐斯玛盘柜一期生产"
        extra={action}
        className={styles.pageHeader}
        content={description}
        extraContent={extra}
      >
        <div className={styles.main}>
          <GridContent>
            <Card
              title="项目进度"
              style={{
                marginBottom: 24,
              }}
            >
              <RouteContext.Consumer>
                {({ isMobile }) => (
                  <Steps
                    direction={isMobile ? 'vertical' : 'horizontal'}
                    current={3}
                    status="error"
                  >
                    <Step title="创建项目" description={creationDesc} />
                    <Step title="设计" description={designDesc} />
                    <Step title="采购" description={purchaseDesc} />
                    <Step title="生产" description={produceDesc} />
                    <Step title="完成" />
                  </Steps>
                )}
              </RouteContext.Consumer>
            </Card>

            <Card
              className={styles.tabsCard}
              bordered={false}
              tabList={operationTabList}
              onTabChange={this.onOperationTabChange}
              defaultActiveTabKey={operationKey}
            >
              {contentList[operationKey]}
            </Card>
          </GridContent>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Advanced;
