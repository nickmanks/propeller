import baseConfig from '../webpack.config.babel';

export default async ({ config }) => {
  const base = baseConfig(null, { mode: 'development' });

  config.module = base.module;

  config.plugins = [
    base.plugins[1], // MiniCssExtractPlugin
    ...config.plugins
  ];

  config.node = {
    fs: 'empty'
  };

  config.resolve = base.resolve;

  return config;
};
