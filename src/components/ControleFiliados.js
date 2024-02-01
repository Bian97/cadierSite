import React, { useState, startTransition } from "react";
import { connect, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';


const ControleFiliados = () => {
  console.log("ControleFiliados component rendered");

  return (
    <div>
      {/* Your ControleFiliados component content */}
      <p>This is the ControleFiliados component.</p>
    </div>
  );
};

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(ControleFiliados);