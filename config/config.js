import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import slash from 'slash2';
import webpackPlugin from './plugin.config';
const { pwa, primaryColor } = defaultSettings; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const plugins = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: false,
      },
      // dynamicImport: {
      //   loadingComponent: './components/PageLoading/index',
      //   webpackChunkName: true,
      //   level: 3,
      // },
      pwa: pwa
        ? {
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local',
            },
          }
        : false, // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
      // dll features https://webpack.js.org/plugins/dll-plugin/
      // dll: {
      //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
      //   exclude: ['@babel/runtime', 'netlify-lambda'],
      // },
      dynamicImport: {
        webpackChunkName: true,
      },
      dll: true,
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
]; // 针对 preview.pro.ant.design 的 GA 统计代码

export default {
  plugins,
  block: {
    // 国内用户可以使用码云
    // defaultGitUrl: 'https://gitee.com/ant-design/pro-blocks',
    defaultGitUrl: 'https://github.com/ant-design/pro-blocks',
  },
  hash: true,
  targets: {
    ie: 11,
  },
  devtool: false,
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/user',
          component: '../layouts/UserLayout',
          routes: [
            {
              path: '/user',
              redirect: '/user/login',
            },
            {
              path: '/user/login',
              icon: 'smile',
              name: 'login',
              component: './user/login',
            },
            {
              path: '/user/register-result',
              icon: 'smile',
              name: 'register-result',
              component: './user/register-result',
            },
            {
              path: '/user/register',
              icon: 'smile',
              name: 'register',
              component: './user/register',
            },
            {
              component: '404',
            },
          ],
        },
        {
          path: '/',
          component: '../layouts/BasicLayout',
          Routes: ['src/pages/Authorized'],
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/project',
              icon: 'project',
              name: 'project',
              routes: [
                {
                  path: '/project/overview',
                  icon: 'profile',
                  name: 'overview',
                  component: './project-management/overview',
                },
                {
                  path: '/project/details',
                  icon: 'schedule',
                  name: 'details',
                  component: './project-management/details',
                },
                {
                  path: '/project/workflow',
                  icon: 'sliders',
                  name: 'workflow',
                  component: './project-management/workflow',
                },
              ],
            },
            {
              path: '/data-management',
              icon: 'apartment',
              name: 'data-management',
              routes: [
                {
                  path: '/data-management/user',
                  icon: 'user',
                  name: 'user',
                  component: './project-management/overview',
                },
                {
                  path: '/data-management/role',
                  icon: 'solution',
                  name: 'role',
                  component: './project-management/overview',
                },
                {
                  path: '/data-management/entitlement',
                  icon: 'database',
                  name: 'entitlement',
                  component: './project-management/overview',
                },
              ],
            },
            // {
            //   path: '/other',
            //   icon: 'layout',
            //   name: 'other',
            //   routes: [
            //     {
            //       path: '/other/form',
            //       icon: 'form',
            //       name: 'form',
            //       routes: [
            //         {
            //           path: '/other/form/basic-form',
            //           icon: 'smile',
            //           name: 'basic-form',
            //           component: './form/basic-form',
            //         },
            //         {
            //           path: '/other/form/step-form',
            //           icon: 'smile',
            //           name: 'step-form',
            //           component: './form/step-form',
            //         },
            //         {
            //           path: '/other/form/advanced-form',
            //           icon: 'smile',
            //           name: 'advanced-form',
            //           component: './form/advanced-form',
            //         },
            //       ],
            //     },
            //     {
            //       path: '/other/list',
            //       icon: 'table',
            //       name: 'list',
            //       routes: [
            //         {
            //           path: '/other/list/search',
            //           name: 'search-list',
            //           component: './list/search',
            //           routes: [
            //             {
            //               path: '/other/list/search',
            //               redirect: '/other/list/search/articles',
            //             },
            //             {
            //               path: '/other/list/search/articles',
            //               icon: 'smile',
            //               name: 'articles',
            //               component: './list/search/articles',
            //             },
            //             {
            //               path: '/other/list/search/projects',
            //               icon: 'smile',
            //               name: 'projects',
            //               component: './list/search/projects',
            //             },
            //             {
            //               path: '/other/list/search/applications',
            //               icon: 'smile',
            //               name: 'applications',
            //               component: './list/search/applications',
            //             },
            //           ],
            //         },
            //         {
            //           path: '/other/list/table-list',
            //           icon: 'smile',
            //           name: 'table-list',
            //           component: './list/table-list',
            //         },
            //         {
            //           path: '/other/list/basic-list',
            //           icon: 'smile',
            //           name: 'basic-list',
            //           component: './list/basic-list',
            //         },
            //         {
            //           path: '/other/list/card-list',
            //           icon: 'smile',
            //           name: 'card-list',
            //           component: './list/card-list',
            //         },
            //       ],
            //     },
            //     {
            //       path: '/other/profile',
            //       name: 'profile',
            //       icon: 'profile',
            //       routes: [
            //         {
            //           path: '/other/profile/basic',
            //           icon: 'smile',
            //           name: 'basic',
            //           component: './profile/basic',
            //         },
            //         {
            //           path: 'other/profile/advanced',
            //           icon: 'smile',
            //           name: 'advanced',
            //           component: './profile/advanced',
            //         },
            //       ],
            //     },
            //     {
            //       path: '/other/result',
            //       icon: 'check-circle-o',
            //       name: 'result',
            //       routes: [
            //         {
            //           path: '/other/result/success',
            //           icon: 'smile',
            //           name: 'success',
            //           component: './result/success',
            //         },
            //         {
            //           path: '/other/result/fail',
            //           icon: 'smile',
            //           name: 'fail',
            //           component: './result/fail',
            //         },
            //       ],
            //     },
            //     {
            //       path: '/other/exception',
            //       icon: 'warning',
            //       name: 'exception',
            //       routes: [
            //         {
            //           path: '/other/exception/403',
            //           icon: 'smile',
            //           name: '403',
            //           component: './exception/403',
            //         },
            //       ],
            //     },
            //   ],
            // },
            {
              redirect: 'project/overview',
            },
          ],
        },
      ],
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // '@font-size-sm': '14px',
    // '@font-size-base': '14px',
    '@primary-color': primaryColor,
    // '@border-radius-base': '0',
    // '@border-radius-sm': '0',
    // '@text-color': 'fade(#000, 65%)',
    // '@text-color-secondary': 'fade(#000, 45%)',
    // '@background-color-base': 'hsv(0, 0, 96%)',
    // '@success-color': primaryColor,
    // '@error-color': '#d93026',
    // '@warning-color': '#ffc440',
    // '@info-color': '@primary-color',
    // '@danger-color': '@error-color',
    '@processing-color': '@primary-color',
    // '@border-color-base': '#dedede',
    // '@border-color-split': '#dedede',
    // '@outline-width': '0',
    // '@outline-color': '#737373',
    // '@input-height-lg': '36px',
    // '@input-height-base': '32px',
    // '@input-height-sm': '24px',
    // '@input-hover-border-color': '#737373',
    // '@form-item-margin-bottom': '16px',
    // '@btn-default-bg': '#fafafa',
    // '@btn-default-border': '#dedede',
    // '@btn-danger-color': '#fff',
    // '@btn-danger-bg': '@error-color',
    // '@btn-danger-border': '@error-color',
    // '@switch-color': '@success-color',
    // '@table-header-bg': '#fafafa',
    // '@table-row-hover-bg': '#fafafa',
    // '@table-padding-vertical': '8px',
    // '@badge-color': '@error-color',
    // '@breadcrumb-base-color': '@text-color',
    // '@breadcrumb-last-item-color': '@text-color-secondary',
    // '@slider-rail-background-color': '@background-color-base',
    // '@slider-rail-background-color-hover': '#e1e1e1',
    // '@slider-track-background-color': '@primary-color',
    // '@slider-track-background-color-hover': '@primary-color',
    // '@slider-handle-border-width': '1px',
    // '@slider-handle-color': '#dedede',
    // '@slider-handle-color-hover': '#dedede',
    // '@slider-handle-color-focus': '#dedede',
    // '@slider-handle-color-tooltip-open': '#ddd',
    // '@slider-handle-color-focus-shadow': 'transparent',
    // '@slider-handle-shadow': '1px 1px 4px 0 rgba(0,0,0,.13)',
    // '@alert-success-border-color': '#dff4e5',
    // '@alert-success-bg-color': '#dff4e5',
    // '@alert-info-border-color': '#e5f3ff',
    // '@alert-info-bg-color': '#e5f3ff',
    // '@alert-error-border-color': '#fcebea',
    // '@alert-error-bg-color': '#fcebea',
    // '@alert-warning-border-color': '#fff7db',
    // '@alert-warning-bg-color': '#fff7db',
    // '@radio-button-bg': 'transparent',
    // '@radio-button-checked-bg': 'transparent',
    // '@progress-radius': '0',
    // '@tabs-card-gutter': '-1px',
    // '@tabs-card-tab-active-border-top': '2px solid @primary-color',
  },
  define: {
    // Define env variables
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, _, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
  chainWebpack: webpackPlugin,
  devServer: {
    open: false,
  },
  /*
  proxy: {
    '/server/api/': {
      target: 'https://preview.pro.ant.design/',
      changeOrigin: true,
      pathRewrite: { '^/server': '' },
    },
  },
  */
};
