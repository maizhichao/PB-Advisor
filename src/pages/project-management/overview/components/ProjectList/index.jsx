import {
  Avatar,
  Button,
  Card,
  Col,
  DatePicker,
  Dropdown,
  Form,
  Icon,
  Input,
  List,
  Menu,
  Modal,
  Progress,
  Radio,
  Row,
  Select,
  Result,
  Timeline,
  Tag,
  Calendar,
} from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';
import { findDOMNode } from 'react-dom';
import { RouteContext } from '@ant-design/pro-layout';
import moment from 'moment';
import styles from './style.less';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const SelectOption = Select.Option;
const { Search, TextArea } = Input;

const projectState = [
  {
    key: 1,
    state: '待生产',
    color: '#f50',
    count: 10,
  },
  {
    key: 2,
    state: '设计',
    color: 'magenta',
    count: 10,
  },
  {
    key: 3,
    state: '齐套',
    color: 'red',
    count: 20,
  },
  {
    key: 4,
    state: '钣金',
    color: 'volcano',
    tagColor: 'red',
    count: 9,
  },
  {
    key: 5,
    state: '框架',
    color: 'orange',
    count: 8,
  },
  {
    key: 6,
    state: '铜排',
    color: 'gold',
    count: 7,
  },
  {
    key: 7,
    state: '一次',
    color: 'green',
    count: 3,
  },
  {
    key: 8,
    state: '二次',
    color: 'cyan',
    count: 7,
  },
  {
    key: 9,
    state: '测试',
    color: 'blue',
    count: 15,
  },
  {
    key: 10,
    state: '包装',
    color: 'geekblue',
    tagColor: 'blue',
    count: 20,
  },
  {
    key: 11,
    state: '待交付',
    color: '#87d068',
    count: 30,
  },
];

@connect(({ projectOverview, loading }) => ({
  projectOverview,
  loading: loading.models.projectOverview,
}))
class BasicList extends Component {
  state = {
    visible: false,
    done: false,
    current: undefined,
  };

  formLayout = {
    labelCol: {
      span: 7,
    },
    wrapperCol: {
      span: 13,
    },
  };

  addBtn = undefined;

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'projectOverview/fetchList',
      payload: {
        count: 10,
      },
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
      current: undefined,
    });
  };

  showEditModal = item => {
    this.setState({
      visible: true,
      current: item,
    });
  };

  handleDone = () => {
    setTimeout(() => this.addBtn && this.addBtn.blur(), 0);
    this.setState({
      done: false,
      visible: false,
    });
  };

  handleCancel = () => {
    setTimeout(() => this.addBtn && this.addBtn.blur(), 0);
    this.setState({
      visible: false,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const { current } = this.state;
    const id = current ? current.id : '';
    setTimeout(() => this.addBtn && this.addBtn.blur(), 0);
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      this.setState({
        done: true,
      });
      dispatch({
        type: 'projectOverview/submitList',
        payload: {
          id,
          ...fieldsValue,
        },
      });
    });
  };

  deleteItem = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'projectOverview/submitList',
      payload: {
        id,
      },
    });
  };

  render() {
    const {
      projectOverview: { list },
      loading,
    } = this.props;
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { visible, done, current = {} } = this.state;

    const editAndDelete = (key, currentItem) => {
      if (key === 'edit') this.showEditModal(currentItem);
      else if (key === 'delete') {
        Modal.confirm({
          title: '删除项目',
          content: '确定删除该项目吗？',
          okText: '确认',
          cancelText: '取消',
          onOk: () => this.deleteItem(currentItem.id),
        });
      }
    };

    const modalFooter = done
      ? {
          footer: null,
          onCancel: this.handleDone,
        }
      : {
          okText: '保存',
          onOk: this.handleSubmit,
          onCancel: this.handleCancel,
        };

    const extraContent = (
      <div className={styles.extraContent}>
        <RadioGroup defaultValue="all">
          <RadioButton value="all">全部</RadioButton>
          <RadioButton value="progress" style={{ color: 'red' }}>
            异常
          </RadioButton>
        </RadioGroup>
        <Search className={styles.extraContentSearch} placeholder="请输入" onSearch={() => ({})} />
      </div>
    );
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 8,
      total: 20,
    };

    const ListContent = ({ data: { owner, createdAt, percent, status } }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <span>项目经理</span>
          <p>{owner}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>开工时间</span>
          <p>{moment(createdAt).format('YYYY-MM-DD')}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>完工时间</span>
          <p>{moment(createdAt).format('YYYY-MM-DD')}</p>
        </div>
        <div className={styles.listContentItem}>
          <Progress
            percent={percent}
            status={status}
            strokeWidth={6}
            style={{
              width: 180,
            }}
          />
        </div>
      </div>
    );

    const MoreBtn = ({ item }) => (
      <Dropdown
        overlay={
          <Menu onClick={({ key }) => editAndDelete(key, item)}>
            <Menu.Item key="edit">编辑</Menu.Item>
            <Menu.Item key="delete">删除</Menu.Item>
          </Menu>
        }
      >
        <a>
          更多 <Icon type="down" />
        </a>
      </Dropdown>
    );

    const projectListContent = isMobile => (
      <>
        <Button
          type="dashed"
          style={{
            width: '100%',
            marginBottom: 8,
          }}
          icon="plus"
          onClick={this.showModal}
          ref={component => {
            // eslint-disable-next-line  react/no-find-dom-node
            this.addBtn = findDOMNode(component);
          }}
        >
          添加
        </Button>
        <List
          size="large"
          rowKey="id"
          loading={loading}
          pagination={paginationProps}
          dataSource={list}
          renderItem={item => (
            <List.Item
              actions={[
                <a
                  key="edit"
                  onClick={e => {
                    e.preventDefault();
                    this.showEditModal(item);
                  }}
                >
                  编辑
                </a>,
                <MoreBtn key="more" item={item} />,
              ]}
            >
              {isMobile ? (
                <Card hoverable>
                  <Card.Meta
                    avatar={
                      <Avatar shape="circle" size="default">
                        {item.logo}
                      </Avatar>
                    }
                    title={<a href={item.href}>{item.title}</a>}
                    description={
                      <>
                        {item.subDescription} <ListContent data={item} />
                      </>
                    }
                  />
                </Card>
              ) : (
                <>
                  <List.Item.Meta
                    avatar={
                      <Avatar shape="circle" size="default">
                        {item.logo}
                      </Avatar>
                    }
                    title={<a href={item.href}>{item.title}</a>}
                    description={item.subDescription}
                  />
                  <ListContent data={item} />
                </>
              )}
            </List.Item>
          )}
        />
      </>
    );

    const getModalContent = () => {
      if (done) {
        return (
          <Result
            status="success"
            title="操作成功"
            extra={
              <Button type="primary" onClick={this.handleDone}>
                确定
              </Button>
            }
            className={styles.formResult}
          />
        );
      }

      return (
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="项目名称" {...this.formLayout}>
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: '请输入项目名称',
                },
              ],
              initialValue: current.title,
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem label="开始时间" {...this.formLayout}>
            {getFieldDecorator('createdAt', {
              rules: [
                {
                  required: true,
                  message: '请选择开始时间',
                },
              ],
              initialValue: current.createdAt ? moment(current.createdAt) : null,
            })(
              <DatePicker
                showTime
                placeholder="请选择"
                format="YYYY-MM-DD HH:mm:ss"
                style={{
                  width: '100%',
                }}
              />,
            )}
          </FormItem>
          <FormItem label="项目经理" {...this.formLayout}>
            {getFieldDecorator('owner', {
              rules: [
                {
                  required: true,
                  message: '请选择项目经理',
                },
              ],
              initialValue: current.owner,
            })(
              <Select placeholder="请选择">
                <SelectOption value="钟磊">钟磊</SelectOption>
                <SelectOption value="宇翔">宇翔</SelectOption>
                <SelectOption value="王宇">王宇</SelectOption>
                <SelectOption value="志超">志超</SelectOption>
                <SelectOption value="志超">志超</SelectOption>
              </Select>,
            )}
          </FormItem>
          <FormItem {...this.formLayout} label="项目描述">
            {getFieldDecorator('subDescription', {
              rules: [
                {
                  message: '请输入至少五个字符的产品描述！',
                  min: 5,
                },
              ],
              initialValue: current.subDescription,
            })(<TextArea rows={4} placeholder="请输入至少五个字符" />)}
          </FormItem>
        </Form>
      );
    };

    return (
      <RouteContext.Consumer>
        {({ isMobile }) => (
          <div className={styles.standardList}>
            <Card
              className={styles.listCard}
              bordered={false}
              title="项目清单"
              bodyStyle={{
                padding: '0 32px 40px 32px',
              }}
              extra={extraContent}
            >
              <Row gutter={24}>
                {isMobile ? (
                  projectListContent(isMobile)
                ) : (
                  <>
                    <Col span={2} style={{ paddingRight: 5, marginTop: 5 }}>
                      <Timeline>
                        {projectState.map(item => (
                          <Timeline.Item key={item.key} color={item.tagColor || item.color}>
                            <Tag>
                              {item.state} <b>{item.count}</b>
                            </Tag>
                          </Timeline.Item>
                        ))}
                      </Timeline>
                    </Col>
                    <Col span={22}>{projectListContent(isMobile)}</Col>
                  </>
                )}
              </Row>
            </Card>

            <Modal
              title={done ? null : `项目${current ? '编辑' : '添加'}`}
              className={styles.standardListForm}
              width={640}
              bodyStyle={
                done
                  ? {
                      padding: '72px 12px',
                    }
                  : {
                      padding: '28px 12px 0px 12px',
                    }
              }
              destroyOnClose
              visible={visible}
              {...modalFooter}
            >
              {getModalContent()}
            </Modal>
          </div>
        )}
      </RouteContext.Consumer>
    );
  }
}

export default Form.create()(BasicList);
