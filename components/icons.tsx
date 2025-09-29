import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

export const UploadIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l-3.75 3.75M12 9.75l3.75 3.75M3 17.25V21h18v-3.75" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);


export const CopyIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6" />
    </svg>
);

export const CheckIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

export const FileTextIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
);

export const TrashIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
);

export const ChatIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
    </svg>
);

export const XIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const SendIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
    </svg>
);


export const CustomLogo: React.FC<IconProps> = (props) => (
  <svg 
    viewBox="183.7 454 763 196.6" 
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    >
    <g fill="currentColor">
        <path d="M946.7 625.3c0 12.979-10.521 23.5-23.5 23.5s-23.5-10.521-23.5-23.5 10.521-23.5 23.5-23.5 23.5 10.521 23.5 23.5z"></path>
        <path d="M229.4 454h-45.7v194.8h138.1v-41.4h-92.4V454z"></path>
        <path d="M405.8 492.1c-41.9 0-67.9 30.3-67.9 79.1 0 65.6 39.1 79.4 71.9 79.4 28.7 0 43.7-9.3 58.8-24.3l2.1-2.1-26.9-26.2-2.1 2.1c-8.7 8.7-16 13.1-31.7 13.1-17.3 0-28.4-10.3-29.5-27.2h93.2v-19.6c0-45.2-26.7-74.3-67.9-74.3zm-22.2 50.5c4-8.8 11.9-13.7 22.2-13.7 10.3 0 18.2 4.9 22.2 13.7 1.8 4.2 2.6 7.4 3 11.8h-50.3c.3-4.4 1.2-7.6 2.9-11.8z"></path>
        <path d="M495.5 533.2h59.3l-63.1 83.3v32.3h119.6v-39.4h-63.9l63.9-83.3v-32.3H495.5v39.4z"></path>
        <path d="M691 492.1c-26.8 0-41.5 5.6-56 21.6l-1.9 2.1 28.1 27.4 2.1-2.4c6.8-7.8 12.2-11.3 26.4-11.3 20.6 0 24.8 8.2 24.8 20.5v4.5h-32.2c-39.7 0-53.9 23.9-53.9 46.2 0 14.1 4.7 26.8 13.2 35.6 9.4 9.4 22.6 14 40.2 14 14.5 0 24.3-2.9 33.6-10.6v9.1h42.3V547.7c-.2-36.4-23.2-55.6-66.7-55.6zM688.4 614c-8.4 0-18.5-2.5-18.5-14.2 0-12.1 11.2-13.9 17.9-13.9h26.5v5c0 8.8-1.3 13.8-4.5 16.7-5.7 5.5-11.2 6.4-21.4 6.4z"></path>
        <path d="M838.1 454H795v44.1h-15.7v34.3H795v70.8c0 22.7 14.3 45.6 46.2 45.6h23.3v-37.4H848c-6.8 0-9.9-3.2-9.9-10.5v-68.5h26.3v-34.3h-26.3V454z"></path>
    </g>
  </svg>
);
