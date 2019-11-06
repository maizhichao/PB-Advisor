import numeral from 'numeral';
import Bar from './Bar';
import ChartCard from './ChartCard';
import Field from './Field';
import MiniArea from './MiniArea';
import MiniBar from './MiniBar';
import MiniProgress from './MiniProgress';
import Pie from './Pie';
import TagCloud from './TagCloud';
import TimelineChart from './TimelineChart';

const yuan = val => `¥ ${numeral(val).format('0,0')}`;

const Charts = {
  yuan,
  Bar,
  Pie,
  MiniBar,
  MiniArea,
  MiniProgress,
  ChartCard,
  Field,
  TagCloud,
  TimelineChart,
};
export {
  Charts as default,
  yuan,
  Bar,
  Pie,
  MiniBar,
  MiniArea,
  MiniProgress,
  ChartCard,
  Field,
  TagCloud,
  TimelineChart,
};
