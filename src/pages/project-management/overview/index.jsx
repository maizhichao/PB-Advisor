import React, { Component, Suspense } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { connect } from 'dva';
import PageLoading from './components/PageLoading';

const IntroduceRow = React.lazy(() => import('./components/IntroduceRow'));
const ProjectList = React.lazy(() => import('./components/ProjectList'));

@connect(({ projectOverview, loading }) => ({
  projectOverview,
  loading: loading.effects['projectOverview/fetch'],
}))
class Analysis extends Component {
  reqRef = 0;

  timeoutId = 0;

  componentDidMount() {
    const { dispatch } = this.props;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'projectOverview/fetch',
      });
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'projectOverview/clear',
    });
    cancelAnimationFrame(this.reqRef);
    clearTimeout(this.timeoutId);
  }

  render() {
    const { projectOverview, loading } = this.props;
    const { visitData } = projectOverview;

    return (
      <GridContent>
        <>
          <Suspense fallback={<PageLoading />}>
            <IntroduceRow loading={loading} visitData={visitData} />
          </Suspense>
          <Suspense fallback={null}>
            <ProjectList />
          </Suspense>
        </>
      </GridContent>
    );
  }
}

export default Analysis;
