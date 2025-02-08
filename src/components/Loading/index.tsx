import ReactDom from 'react-dom/client';
import Loading from './loading';

let count = 0;
export const showLoading = () => {
  if (count === 0) {
    const dom = document.createElement('div');
    dom.setAttribute('id', 'loading');
    document.body.appendChild(dom);
    ReactDom.createRoot(dom).render(<Loading></Loading>);
  }
  count++;
};

export const hideLoading = () => {
  if (count < 0) return;
  count--;
  const dom = document.getElementById('loading');
  if (dom && count === 0) {
    document.body.removeChild(dom);
  }
};
