import React from 'react';
import CertificateForm from './component/CertificateForm';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Certificate Generator</h1>
      <CertificateForm />
    </div>
  );
};

export default App;
