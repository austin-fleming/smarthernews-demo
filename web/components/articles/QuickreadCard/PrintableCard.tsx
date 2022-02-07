/* eslint react/no-multi-comp:"off", react/display-name:"off" */
import html2canvas from 'html2canvas';
import { Page, PageProps } from './Page';
import { PreviewCardWrapper } from './QuickreadCard.styled';

const saveAs = (blob: string, fileName: string) => {
  const elem = window.document.createElement('a');
  elem.href = blob;
  elem.download = fileName;
  elem.style.display = 'none';
  (document.body || document.documentElement).append(elem);
  if (typeof elem.click === 'function') {
    elem.click();
  } else {
    elem.target = '_blank';
    elem.dispatchEvent(
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window,
      }),
    );
  }
  URL.revokeObjectURL(elem.href);
  elem.remove();
};

const exportPng = async (targetId: string): Promise<boolean> => {
  const html = document.querySelector('html');
  const body = document.querySelector('html');

  if (!html || !body) {
    console.error('Failed to find html or body tag in screenshot for:', targetId);
    return false;
  }

  const htmlWidth = html.clientWidth;
  const bodyWidth = body.clientWidth;

  const data = document.querySelector(`#${targetId}`);

  if (!data) {
    console.error('Failed element for screenshot for:', targetId);
    return false;
  }

  const desiredWidth = data.scrollWidth - data.clientWidth;

  const normalizedHtmlWidth =
    desiredWidth > data.clientWidth ? htmlWidth + desiredWidth : htmlWidth;
  const normalizedBodyWidth =
    desiredWidth > data.clientWidth ? bodyWidth + desiredWidth : bodyWidth;

  html.style.width = `${normalizedHtmlWidth}px`;
  body.style.width = `${normalizedBodyWidth}px`;

  return html2canvas(data as HTMLElement, {
    allowTaint: true,
    scale: 2,
    useCORS: true,
  })
    .then((canvas) => canvas.toDataURL('image/png', 1))
    .then((image) => {
      saveAs(image, `${targetId}=${new Date()}`);
      // changed from null. Make sure OK.
      html.style.width = '0';
      body.style.width = '0';
    })
    .then(() => true);
};

export const PrintableCard = (props: PageProps) => {
  const { pageContent, stackIndex } = props;

  const cardId = `card-${pageContent?._id}-${stackIndex}`;

  return (
    <>
      <PreviewCardWrapper>
        <Page id={cardId} {...props} />
      </PreviewCardWrapper>
      {/* TODO: [future] have button status indicated for exportPng promise */}
      <button
        type='button'
        onClick={() => {
          exportPng(cardId);
        }}>
        Export Card
      </button>
    </>
  );
};
