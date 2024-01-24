import React, { useState, startTransition } from "react";
import { connect, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';


const Inicio = () => {
  console.log("Inicio component rendered");

  return (
    <div>
      {/* Your Inicio component content */}
      <p>This is the Inicio component.</p>
    </div>
  );
};

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(Inicio);