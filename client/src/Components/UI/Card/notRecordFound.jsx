import React from 'react';

const NoRecordsFound = ({ message = "No records found" }) => {
  return (
    <div className="flex justify-center items-center min-h-[200px] w-full">
      <div className="card relative w-[342px] h-[184px] text-white flex flex-col justify-between p-5">
        <svg 
          fill="none" 
          viewBox="0 0 342 175" 
          height="175" 
          width="342" 
          xmlns="http://www.w3.org/2000/svg" 
          className="background absolute inset-0 z-[-1]"
        >
          <path 
            fill="url(#paint0_linear_103_640)" 
            d="M0 66.4396C0 31.6455 0 14.2484 11.326 5.24044C22.6519 -3.76754 39.6026 0.147978 73.5041 7.97901L307.903 62.1238C324.259 65.9018 332.436 67.7909 337.218 73.8031C342 79.8154 342 88.2086 342 104.995V131C342 151.742 342 162.113 335.556 168.556C329.113 175 318.742 175 298 175H44C23.2582 175 12.8873 175 6.44365 168.556C0 162.113 0 151.742 0 131V66.4396Z"
          ></path>
          <defs>
            <linearGradient 
              gradientUnits="userSpaceOnUse" 
              y2="128" 
              x2="354.142" 
              y1="128" 
              x1="0" 
              id="paint0_linear_103_640"
            >
              <stop stopColor="#5936B4"></stop>
              <stop stopColor="#362A84" offset="1"></stop>
            </linearGradient>
          </defs>
        </svg>

        <div className="cloud absolute right-0 top-[-12px]">
          <svg 
            fill="#000000" 
            preserveAspectRatio="xMidYMid meet" 
            className="h-[120px] iconify iconify--emojione" 
            role="img" 
            aria-hidden="true" 
            // xmlns:xlink="http://www.w3.org/1999/xlink" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 64 64"
          >
            <g id="SVGRepo_iconCarrier">
              <g fill="#75d6ff">
                <path d="M10.8 42.9c-.5 1.5-.1 3 1 3.4c1.1.4 2.4-.5 3-2c.6-1.8.7-4.1.2-6.9c-2.1 1.9-3.6 3.8-4.2 5.5"></path>
                <path d="M13.2 57.4c.6-1.8.7-4.1.2-6.9c-2.1 1.8-3.6 3.7-4.2 5.5c-.5 1.5-.1 3 1 3.4c1.1.4 2.5-.5 3-2"></path>
                <path d="M51.5 37.4c-2.1 1.8-3.6 3.7-4.2 5.5c-.5 1.5-.1 3 1 3.4c1.1.4 2.4-.5 3-2c.5-1.7.6-4.1.2-6.9"></path>
                <path d="M38.2 55.9c-.5 1.5-.1 3 1 3.4s2.4-.5 3-2c.6-1.8.7-4.1.2-6.9c-2 1.9-3.5 3.8-4.2 5.5"></path>
                <path d="M46.9 55.9c-.5 1.5-.1 3 1 3.4s2.4-.5 3-2c.6-1.8.7-4.1.2-6.9c-2.1 1.9-3.6 3.8-4.2 5.5"></path>
                <path d="M18.6 55.9c-.5 1.5-.1 3 1 3.4s2.4-.5 3-2c.6-1.8.7-4.1.2-6.9c-2.1 1.9-3.6 3.8-4.2 5.5"></path>
              </g>
              <path d="M24.5 31.9l-4.9 16.2h12.5L27.9 62l16.5-20.2H32.5l2.9-9.9z" fill="#ffce31"></path>
              <path fill="#ffffff" d="M18.2 32.5c-.8 0-1.6-.1-2.4-.4c-3.1-1-5.3-3.9-5.3-7.2c0-2.2 1-4.3 2.6-5.7c.4-.4.9-.7 1.4-1l.5-1.8c1.3-4.4 5.4-7.5 10-7.5c.5 0 .9 0 1.5.1c.4.1.8.1 1.2.3l.2-.4c1.9-3.3 5.4-5.4 9.2-5.4C43 3.5 47.7 8.2 47.7 14v1c.4.2.9.4 1.3.6c2.8 1.6 4.5 4.6 4.5 7.8c0 4.2-2.9 7.8-7 8.8c-.7.2-1.4.2-2 .2H18.2z"></path>
              <path fill="#b6c1d1" d="M37.1 5c5 0 9 4 9 8.9v.7c-2.1.2-4 1-5.4 2.3c1.1-.6 2.4-1 3.7-1c.5 0 1 .1 1.5.1c.8.2 1.6.5 2.3.9c2.3 1.3 3.8 3.7 3.8 6.5c0 3.6-2.5 6.5-5.8 7.3c-.7.2-1.2.3-1.8.3H18.2c-.7 0-1.3-.1-1.9-.3c-2.4-.8-4.2-3.1-4.2-5.8c0-1.8.8-3.5 2.1-4.6c.6-.5 1.3-.9 2-1.2c.6-.2 1.3-.3 2-.3c2 0 3.7.9 4.9 2.4h.1c-1.3-2.4-3.7-4.1-6.6-4.3c1.1-3.7 4.5-6.4 8.5-6.4c.4 0 .9 0 1.3.1c.8.1 1.6.3 2.3.7c2.7 1.2 4.7 3.7 5.1 6.8V18c0-3.4-1.8-6.5-4.5-8.3C30.8 6.9 33.8 5 37.1 5m0-3C33 2 29.2 4.1 27 7.6h-.3c-.6-.1-1.2-.1-1.7-.1c-5.3 0-10 3.5-11.4 8.6l-.3 1.2c-.4.2-.7.5-1.1.8c-2 1.7-3.1 4.2-3.1 6.9c0 4 2.5 7.4 6.3 8.7c.9.3 1.9.5 2.9.5h26.2c.8 0 1.6-.1 2.4-.3c4.8-1.1 8.2-5.3 8.2-10.3c0-3.8-2-7.3-5.3-9.1c-.2-.1-.3-.2-.5-.3v-.1C49.2 7.4 43.8 2 37.1 2z"></path>
            </g>
          </svg>
        </div>

        <p className="text-[48px] z-[2]">{message}</p>
        
        <div className="info flex justify-between">
          <div className="info-left">
            <p className="text-[rgba(235,235,245,0.60)]">No data available</p>
            <p>Please try again later</p>
          </div>
          <p className="info-right self-end">Search Result</p>
        </div>
      </div>
    </div>
  );
};

export default NoRecordsFound;