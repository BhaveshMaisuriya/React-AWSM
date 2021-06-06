import React from 'react';
import "./style.scss";
import LinearProgress from '@material-ui/core/LinearProgress';

export default function Loader() {
  return (
    <div className="loader_main">
      <LinearProgress color='success' />
    </div>
  );
}