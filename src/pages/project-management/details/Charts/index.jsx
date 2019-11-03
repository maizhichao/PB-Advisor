import numeral from 'numeral';
import Pie from './Pie';

const yuan = val => `¥ ${numeral(val).format('0,0')}`;

const Charts = {
  yuan,
  Pie,
};
export { Charts as default, yuan, Pie };
