import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { basepath } from '../../connection';

export function GlobalFilter() {
  const [keyword, setKeyword] = useState('');

  const handleInputChange = (event) => {
    const keyword = event.target.value;
    console.log(keyword);
    setKeyword(keyword);
    sendKeywordToBackend(keyword);
  };

  const sendKeywordToBackend = async (keyword) => {
    try {
      const response = await fetch(`${basepath}/api/endpoint/?lazyEvent=${encodeURIComponent(JSON.stringify({ keyword }))}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keyword }),
      });
      if (response.ok) {
        console.log('Keyword sent to backend:', keyword);
      } else {
        console.error('Failed to send keyword to backend');
      }
    } catch (error) {
      console.error('Error sending keyword to backend:', error);
    }
  };

  return (
    <div className="flex justify-content-end">
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        {/* <InputText
          onChange={handleInputChange}
          placeholder="Keyword Search"
          value={keyword}
        /> */}
      </span>
    </div>
  );
}
