import numeral from 'numeral';
import Pie from './Pie';
import ChartCard from './ChartCard';

const yuan = val => `¥ ${numeral(val).format('0,0')}`;

const Charts = {
  yuan,
  Pie,
  ChartCard,
};
export { Charts as default, ChartCard, yuan, Pie };
