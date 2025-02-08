import ReactDom from 'react-dom/client';
import './loading.scss';

let count = 0;
// export const showLoading = () => {
//   if (count === 0) {
//     const dom = document.createElement('div');
//     dom.setAttribute('id', 'loading');
//     document.body.appendChild(dom);
//     ReactDom.createRoot(dom).render(<Loading></Loading>);
//   }
//   count++;
// };

// export const hideLoading = () => {
//   if (count < 0) return;
//   count--;
//   const dom = document.getElementById('loading');
//   if (dom && count === 0) {
//     document.body.removeChild(dom);
//   }
// };

export const showLoading = () => {
  if (count === 0) {
    const loading = document.getElementById('loading') as HTMLDivElement;
    loading.style.display = 'flex';
  }
  count++;
};

export const hideLoading = () => {
  if (count < 0) return;
  count--;
  const loading = document.getElementById('loading') as HTMLDivElement;
  loading.style.display = 'none';
};
